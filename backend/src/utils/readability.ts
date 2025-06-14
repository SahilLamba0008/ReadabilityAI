import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

export const parseDOMContent = (htmlString: string) => {
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    const reader = new Readability(document);
    const article = reader.parse();

    return article;
};