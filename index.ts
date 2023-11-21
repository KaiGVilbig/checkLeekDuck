const puppeteer = require('puppeteer')
import { Browser } from 'puppeteer'
import db from './dbOps'
import DuckInt from './duckInferface'
const cron = require('node-cron')

const basedDuck = 'https://leekduck.com'
const duck = basedDuck + '/events'

const main = async () => {
    const browser: Browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(duck)

    const duckData: Array<DuckInt> = await page.evaluate((basedDuck) => {
        const ducks = Array.from(document.querySelectorAll('.event-item-link:not(.hide-event)'))

        const leek: Array<DuckInt> = ducks.map((d: any) => {
            const formatted: DuckInt = {
                _id: "",
                category: d.querySelector('div p').innerText,
                img: basedDuck + d.querySelector('img').getAttribute('src'),
                name: d.querySelector('div.event-text h2').innerText,
                date: d.querySelector('div.event-text p').innerText,
                infoLink: basedDuck + d.getAttribute('href')
            }
            return formatted;
        })

        return leek
    }, basedDuck)

    await browser.close()

    let formatted: Array<DuckInt> = duckData;
    await db(formatted);
}

/**
 * Scheduled job to execute once every day at 7:00am local time, whatever timezone the system is online
 * To change the timezone to a specific timezone, at the bottom of the cron funciton where the }) is located, 
 * replace the }) with }, { timezone: 'Your/Timezone' })
 */
cron.schedule('0 7 * * *', () => {
    main()
})