chrome.action.onClicked.addListener((tab) => {
	if (!tab.id) {
		console.error("Tab ID is not available.");
		return;
	}

	console.log(`Action clicked on tab with ID: ${tab.id}`);
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["content.js"],
	});
	console.log("Content script injected successfully.");
});
