import { getBrowserInstance } from "./instance";
import { Page } from "puppeteer";

export async function fetchDOMWithPuppeteer(url: string): Promise<string> {
	let page: Page | null = null;

	try {
		const browser = await getBrowserInstance();
		page = await browser.newPage();

		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/117.0.0.0 Safari/537.36"
		);

		await page.goto(url, {
			waitUntil: "networkidle0",
		});

		const html = await page.content();
		return html;
	} catch (err) {
		console.error(`Failed to fetch DOM for: ${url}`);
		throw new Error(`fetchDOMWithPuppeteer failed: ${(err as Error).message}`);
	} finally {
		if (page) {
			await page.close();
		}
	}
}
