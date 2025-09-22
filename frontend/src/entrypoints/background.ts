export default defineBackground(() => {
	console.log("Hello background!");
	browser.runtime.onMessage.addListener(
		async (message, sender, sendResponse) => {
			const tabs = await browser.tabs.query({
				active: true,
				currentWindow: true,
			});
			const activeTabId = tabs[0]?.id;
			const senderTabId = sender.tab?.id;

			if (sender.tab?.id) {
				browser.tabs.sendMessage(sender.tab.id, {
					...message,
					senderTabId,
					activeTabId,
				});
			}
		}
	);
});
