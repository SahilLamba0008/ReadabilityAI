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

			if (senderTabId) {
				try {
					const response = await browser.tabs.sendMessage(senderTabId, {
						...message,
						senderTabId,
						activeTabId,
					});

					console.log("Background received response:", response, senderTabId);

					sendResponse(response);
				} catch (error) {
					sendResponse({ error: "Failed to get response from content script" });
				}
			}
			return true;
		}
	);
});
