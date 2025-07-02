import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const parseDOMWithReadability = (htmlString: string) => {
	const dom = new JSDOM(htmlString);
	const document = dom.window.document;

	const reader = new Readability(document);
	const contentObj = reader.parse();
    
	return contentObj;
};
