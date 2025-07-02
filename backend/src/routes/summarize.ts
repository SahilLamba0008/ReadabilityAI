import express from "express";
import { parseDOMWithReadability } from "../utils/readability";
import { fetchDOMWithPuppeteer } from "../utils/puppeteer/fetchDOM";

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const domString = await fetchDOMWithPuppeteer(req.body.url);
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
});

export default router;
