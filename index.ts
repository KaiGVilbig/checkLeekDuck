import puppeteer, { Browser } from "puppeteer"
import db from "./dbOps"
import DuckInt from "./duckInferface"
import cron from "node-cron"

const basedDuck = "https://leekduck.com"
const duck = basedDuck + "/events"

// Read MongoDB URL from environment variable, fallback if needed
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/leekduck"

const get = async (): Promise<DuckInt[]> => {
  console.log("Starting scrape...")

  const browser: Browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(duck)

  const duckData: DuckInt[] = await page.evaluate((basedDuck) => {
    const ducks = Array.from(document.querySelectorAll(".event-item-link:not(.hide-event)"))

    const leek: DuckInt[] = ducks.map((d: any) => ({
      _id: "",
      category: d.querySelector("div p")?.innerText || "",
      img: d.querySelector("img")?.getAttribute("src") || "",
      name: d.querySelector("div.event-text h2")?.innerText || "",
      date: d.querySelector("div.event-text p")?.innerText || "",
      infoLink: basedDuck + (d.getAttribute("href") || ""),
    }))

    const filtered: DuckInt[] = leek.filter((d: DuckInt) => {
      return d.category !== "GO Battle League" && !d.name.includes("Unannounced")
    })

    return filtered
  }, basedDuck)

  await browser.close()
  return duckData
}

const send = async (ducks: DuckInt[]) => {
  console.log(`Sending ${ducks.length} events to MongoDB at ${MONGO_URL}`)
  await db(ducks)
}

const main = async () => {
  try {
    const ducks = await get()
    await send(ducks)
    console.log("Scrape completed successfully.")
  } catch (err) {
    console.error("Scrape failed:", err)
  }
}

// Run immediately when container starts
main()

// Schedule daily job at 7:00 AM server time
cron.schedule(
  "0 7 * * *",
  () => {
    console.log("Starting scheduled scrape...")
    main()
  },
  {
    timezone: "Etc/Local", // uses container/server local time
  }
)
