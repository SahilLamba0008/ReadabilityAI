import puppeteer, { Browser } from "puppeteer";

let browser: Browser | null = null;

/* need to implement a singleton browser instance. */
export async function getBrowserInstance(): Promise<Browser> {
	try {
		browser = await puppeteer.launch({
			headless: process.env.HEADLESS === "true",
		});

		return browser;
	} catch (error) {
		console.error("Failed to launch browser:", error);
		browser = null;
		throw error;
	}
}

export async function closeBrowserInstance(): Promise<void> {
	if (browser) {
		try {
			await browser.close();
			console.log("Puppeteer browser closed successfully");
		} catch (error) {
			console.error("Error closing browser:", error);
		} finally {
			browser = null;
		}
	}
}

// Optional: Graceful shutdown handler
export function setupGracefulShutdown(): void {
	const cleanup = async () => {
		console.log("Shutting down gracefully...");
		await closeBrowserInstance();
		process.exit(0);
	};

	process.on("SIGINT", cleanup);
	process.on("SIGTERM", cleanup);
	process.on("uncaughtException", async (error) => {
		console.error("Uncaught Exception:", error);
		await closeBrowserInstance();
		process.exit(1);
	});
}
