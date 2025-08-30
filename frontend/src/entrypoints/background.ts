export default defineBackground(() => {
	console.log("Hello background!");
	browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (
			message.type === "penToolEnabled" ||
			message.type === "penToolDisabled" ||
			message.type === "undo" ||
			message.type === "redo" ||
			message.type === "clearPenTool" ||
			message.type === "updatePenColor"
		) {
			browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
				if (tabs[0]?.id) {
					browser.tabs.sendMessage(tabs[0].id, message);
				}
			});
		}
	});
});
