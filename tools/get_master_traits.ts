import { readFileSync, writeFileSync } from 'fs';
import * as cheerio from 'cheerio';
import { Character } from '../src/app/_models/character-model';
import { MasterStyle, MasterTrait } from '../src/app/_models/master-trait-model';

const URL = 'https://www.rpgsite.net/guide/20796-granblue-fantasy-relink-endless-ragnarok-all-characters-master-traits';
const CHARACTERS_FILE = './public/_data/characters.json';
const OUTPUT_PATH = './public/_data/mastery-traits.scraped.json';

const ALIASES: Record<string, string[]> = {
    'gran / djeeta': ['Gran / Djeeta'],
    'gran/djeeta': ['Gran / Djeeta'],
    'seofon (siete)': ['Seofon'],
    'tweyen (song)': ['Tweyen'],
};

class CharacterMap {
    private byName = new Map<string, string[]>();

    constructor(characters: Character[]) {
        for (const c of characters) {
            this.byName.set(this.normalize(c.name), [c.id]);
        }
    }

    private normalize(name: string): string {
        return name.trim().toLowerCase();
    }

    public resolve(sectionTitle: string): string[] | undefined {
        const cleaned = sectionTitle
            .replace(/master traits/i, '')
            .trim();
        const key = this.normalize(cleaned);

        if (ALIASES[key]) {
            return ALIASES[key]
                .map((n) => this.byName.get(this.normalize(n))?.[0])
                .filter((id): id is string => !!id);
        }

        return this.byName.get(key);
    }
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 60);
}

function splitNameAndDescription(raw: string): { name: string; description: string } {
    const text = raw.replace(/\s+/g, ' ').trim();
    const colonIndex = text.indexOf(':');

    if (colonIndex > 0 && colonIndex < 40) {
        return {
            name: text.slice(0, colonIndex).trim(),
            description: text,
        };
    }

    const words = text.split(' ').slice(0, 5).join(' ');
    return {
        name: words.replace(/[.,;]+$/, ''),
        description: text,
    };
}

const STYLE_HEADING_RE = /^(Insight|Essence|Crux)\s*:\s*(.+)$/i;
const RANK_LABEL_RE = /^Style Rank\s+(EX|\d+)\b/i;
const SECTION_TITLE_RE = /^(.*?)\s*Master Traits\s*$/i;

interface ParsedTrait {
    style: MasterStyle;
    rank: number;
    text: string;
}

/**
 * Läuft in Dokumentreihenfolge durch den Artikelinhalt und baut daraus eine
 * flache Liste von (Charaktertitel, Style, Rank, Trait-Text) auf.
 */
function parseArticle($: cheerio.CheerioAPI, articleRoot: cheerio.Cheerio<any>): Map<string, ParsedTrait[]> {
    const result = new Map<string, ParsedTrait[]>();

    let currentCharacterTitle: string | null = null;
    let currentStyle: MasterStyle | null = null;
    let currentRank: number | null = null;
    let insideRankPool = false;

    const nodes = articleRoot.find('h2, h3, h4, p, li').toArray();

    for (const node of nodes) {
        const $node = $(node);
        const tag = ($node.prop('tagName') as string | undefined)?.toLowerCase();
        const text = $node.text().replace(/\s+/g, ' ').trim();
        if (!text) continue;

        if (tag === 'h2') {
            const match = text.match(SECTION_TITLE_RE);
            if (match) {
                currentCharacterTitle = match[1].trim();
                currentStyle = null;
                currentRank = null;
                insideRankPool = false;
                if (!result.has(currentCharacterTitle)) {
                    result.set(currentCharacterTitle, []);
                }
            }
            continue;
        }

        if (tag === 'h3') {
            const match = text.match(STYLE_HEADING_RE);
            if (match) {
                currentStyle = match[1] as MasterStyle;
                currentRank = null;
                insideRankPool = false;
            }
            continue;
        }

        // "Style Rank N - Choose at least X ..." / "Style Rank EX" kann als
        // eigener <p> oder als erster Listenpunkt eines <ul> auftauchen.
        if (tag === 'p' || tag === 'li') {
            const rankMatch = text.match(RANK_LABEL_RE);
            if (rankMatch) {
                currentRank = rankMatch[1].toUpperCase() === 'EX' ? 4 : Number(rankMatch[1]);
                insideRankPool = true;
                continue;
            }

            // Ein "Rank Perk"-Absatz beendet den aktuell aktiven Pool-Kontext,
            // bis der nächste "Style Rank"-Marker kommt.
            if (/^Rank Perk\b/i.test(text)) {
                insideRankPool = false;
                continue;
            }
        }

        if (tag === 'li' && insideRankPool && currentCharacterTitle && currentStyle && currentRank) {
            // Verschachtelte "Choose at least N" Marker-Zeilen selbst nicht als Trait aufnehmen.
            if (RANK_LABEL_RE.test(text) || /^Rank Perk\b/i.test(text)) continue;

            const list = result.get(currentCharacterTitle) ?? [];
            list.push({ style: currentStyle, rank: currentRank, text });
            result.set(currentCharacterTitle, list);
        }
    }

    return result;
}

async function main() {
    console.log(`Loading charakter list from ${CHARACTERS_FILE} ...`);
    const characters: Character[] = JSON.parse(
        readFileSync(CHARACTERS_FILE, 'utf-8'),
    );
    const charMap = new CharacterMap(characters);

    console.log(`Loading page: ${URL}`);
    const response = await fetch(URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; GbfrBuilderScraper/1.0)' },
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status} beim Laden von ${URL}`);
    }
    const html = await response.text();

    const $ = cheerio.load(html);
    // Passt den Root-Selektor ggf. an, falls RPG Site das Markup ändert.
    const articleRoot = $('article').first().length ? $('article').first() : $('body');

    const parsed = parseArticle($, articleRoot);

    const traits: MasterTrait[] = [];
    const usedIds = new Set<string>();
    let unmatchedSections = 0;

    for (const [sectionTitle, entries] of parsed.entries()) {
        if (entries.length === 0) continue;

        const charaIDs = charMap.resolve(sectionTitle);
        if (!charaIDs || charaIDs.length === 0) {
            console.warn(`⚠ No charaID found for section "${sectionTitle}" - skipping.`);
            unmatchedSections++;
            continue;
        }

        for (const charaID of charaIDs) {
            var eCount = 0;
            for (const entry of entries) {
                //const { name, description } = splitNameAndDescription(entry.text);
                const description = entry.text;
                const baseId = `${slugify(sectionTitle)}_${entry.style.toLowerCase()}_${entry.rank}_${eCount++}`;

                let id = baseId;
                let suffix = 1;
                while (usedIds.has(`${id}_${charaID}`)) {
                    id = `${baseId}_${suffix++}`;
                }
                usedIds.add(`${id}_${charaID}`);

                traits.push({
                    id: `${id}_${charaID}`,
                    charaID,
                    style: entry.style,
                    rank: entry.rank,
                    description,
                });
            }
        }
    }

    writeFileSync(OUTPUT_PATH, JSON.stringify(traits, null, 4), 'utf-8');

    console.log(`\nFinished: ${traits.length} master traits written to ${OUTPUT_PATH}`);
    if (unmatchedSections > 0) {
        console.log(
            `${unmatchedSections} Section(s) could not be matched to a character - add them to the character mapping.`,
        );
    }
}

main().catch((err) => {
    console.error('Scraper error:', err);
    process.exit(1);
});
