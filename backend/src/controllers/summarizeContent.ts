import { Request, Response } from "express";
import { fetchDOMWithPuppeteer } from "../utils/puppeteer/fetchDOM";
import { parseDOMWithReadability } from "../utils/readability";
import { llmSummarize } from "../llm/aiClient";

export const summarizeContent = async (req: Request, res: Response) => {
	try {
		const { url } = req.body;

		if (!url || typeof url !== "string") {
			return res.status(400).json({ error: "Invalid or missing URL" });
		}

		const domString = await fetchDOMWithPuppeteer(url);
		const parseDom = parseDOMWithReadability(domString);

		const responseAISummarize = await llmSummarize(parseDom?.textContent ?? "");

		res.status(201).json({
			data: req.body,
			parsedContent: parseDom,
			summarizedContent: responseAISummarize,
		});
	} catch (err) {
		console.error("Failed to fetch DOM:", err);
		res.status(500).json({ error: "Failed to fetch DOM" });
	}
};
