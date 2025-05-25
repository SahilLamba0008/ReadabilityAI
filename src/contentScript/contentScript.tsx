console.log("content script loaded");
const documentClone = document.cloneNode(true) as Document;
console.log("cs loaded :", documentClone.documentElement.outerHTML);
