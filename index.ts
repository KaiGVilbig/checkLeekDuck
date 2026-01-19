// src/index.ts
import puppeteer, { Browser } from 'puppeteer';
import dbOps from './dbOps';
import DuckInt from './duckInferface';
import * as cron from 'node-cron';

const BASE_URL = 'https://leekduck.com';
const EVENTS_URL = BASE_URL + '/events';

const getDuckData = async (): Promise<DuckInt[]> => {
    const browser: Browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(EVENTS_URL);

    const ducks: DuckInt[] = await page.evaluate((base: string) => {
        const elements = Array.from(document.querySelectorAll('.event-item-link:not(.hide-event)'));
        return elements.map(d => ({
            category: (d.querySelector('div p') as HTMLElement).innerText,
            img: (d.querySelector('img')?.getAttribute('src')) ?? '',
            name: (d.querySelector('div.event-text h2') as HTMLElement).innerText,
            date: (d.querySelector('div.event-text p') as HTMLElement).innerText,
            infoLink: base + d.getAttribute('href')
        })) as DuckInt[];
    }, BASE_URL);

    await browser.close();
    return ducks;
};

const run = async () => {
    const ducks = await getDuckData();
    await dbOps(ducks);
};

// Run once immediately
run();

// Schedule daily at 7:00am local time
cron.schedule('0 7 * * *', () => {
    run();
});

