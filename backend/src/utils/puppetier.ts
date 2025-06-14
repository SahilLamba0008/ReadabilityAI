import puppeteer, { Browser, Page } from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

/**
 * Fetches the fully rendered DOM from a given URL using Puppeteer.
 * @param url - The target URL to scrape.
 * @returns The full HTML content of the page.
 */
export async function fetchDOM(url: string): Promise<string> {
  let browser: Browser | null = null;

  try {
    browser = await puppeteer.launch();
    const page: Page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36" /* helps mimic a real browser setting */
    );
    await page.goto(url, { waitUntil: "networkidle0" });

    const bodyHandle = await page.$("body");
    await page.evaluate((body) => body?.innerHTML, bodyHandle);

    const content: string = await page.content();
    return content;
  } finally {
    if (browser) await browser.close();
  }
}
