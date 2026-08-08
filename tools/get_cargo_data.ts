import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import fs from 'node:fs/promises';

type Parameters = { [id: string]: any };

const ROOT_URL = "https://relink.gbf.wiki/api.php";
const PAGE_LIMIT = 500;

puppeteer.use(StealthPlugin());
puppeteer.use(RecaptchaPlugin());

const browser = await puppeteer.launch({ headless: true });

async function call_api(action: string, parameters?: Parameters): Promise<any> {
    const url = new URL(ROOT_URL);
    url.searchParams.set("format", "json");
    url.searchParams.set("action", action);
    if (parameters) {
        for (const param of Object.keys(parameters)) {
            url.searchParams.set(param, parameters[param]);
        }
    }

    console.log(url.toString());

    const page = await browser.newPage();
    await page.goto(url.toString());
    await page.solveRecaptchas();

    const content = await page.locator('pre').map(pre => pre.textContent).wait();
    await page.close();

    return JSON.parse(content);
}

async function get_tables(): Promise<any> {
    const result = await call_api("cargotables");
    return result.cargotables;
}

async function get_table_data(table: string): Promise<any> {
    const fieldResult = await call_api("cargofields", { table });
    const fieldNames = Object.keys(fieldResult.cargofields);

    var data = [];
    var paginate = false;
    do {
        const result = await call_api("cargoquery", { tables: table, fields: fieldNames.join(","), limit: PAGE_LIMIT, offset: data.length });
        const page = result.cargoquery.map((t: any) => t.title);
        data.push(...page);
        paginate = page.length == PAGE_LIMIT;
    } while (paginate);

    return data;
}

const tables = await get_tables();
for (const table of tables) {
    const filePath = `./tools/assets/${table}.json`;
    const data = await get_table_data(table);
    await fs.writeFile(filePath, JSON.stringify(data), { flag: 'w+' });
}

await browser.close();