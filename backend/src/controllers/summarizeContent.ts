import { Request, Response } from "express";
import { fetchDOMWithPuppeteer } from "../utils/puppeteer/fetchDOM";
import { parseDOMWithReadability } from "../utils/readability";

export const summarizeContent = async (req: Request, res: Response) => {
	try {
		const { url } = req.body;

		if (!url || typeof url !== "string") {
			return res.status(400).json({ error: "Invalid or missing URL" });
		}

		const domString = await fetchDOMWithPuppeteer(url);
		const parseDom = parseDOMWithReadability(domString);

		/* 
        Request to summarize the prased data :
            - attach a prompt for better reponse
            -
        */

		res.status(201).json({ data: req.body, content: parseDom });
	} catch (err) {
		console.error("Failed to fetch DOM:", err);
		res.status(500).json({ error: "Failed to fetch DOM" });
	}
};
