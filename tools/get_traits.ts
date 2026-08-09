import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import fs from 'node:fs/promises';

const URL = "https://relink.gbf.wiki/Traits";
const FILE_PATH = "./public/_data/traits.json";

puppeteer.use(StealthPlugin());
puppeteer.use(RecaptchaPlugin());

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.goto(URL);
await page.solveRecaptchas();

function genTraitId(name: string): string {
    return name.toLowerCase().replaceAll(' ', '_');
}

const traitRows = await page.$$eval('.wikitable tbody tr', trait => {
    return trait.map(t => [...t.children].map(c => c.textContent.trim()));
});

const traits = traitRows.map(row => {
    return {
        id: genTraitId(row[0]),
        name: row[0],
        // description: row[1],
    }
});

await fs.writeFile(FILE_PATH, JSON.stringify(traits), { flag: 'w+' });

await browser.close();