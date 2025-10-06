export default defineBackground(() => {
	console.log("Hello background!");

	browser.runtime.onMessage.addListener(
		async (message, sender, sendResponse) => {
			// Broadcast to all tabs if action is toggleSidepanel
			if (message.action === "toggleSidepanel") {
				const allTabs = await browser.tabs.query({});

				const promises = allTabs.map(async (tab) => {
					if (!tab.id) return;

					try {
						await browser.tabs.sendMessage(tab.id, {
							...message,
							senderTabId: sender.tab?.id,
						});
					} catch (error) {
						// Tab doesn't have content script - ignore
						console.log(`Tab ${tab.id} doesn't have content script`);
					}
				});

				await Promise.allSettled(promises);
				sendResponse({ success: true, broadcastedToTabs: allTabs.length });
				return true;
			}

			// Existing flow for all other messages
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
