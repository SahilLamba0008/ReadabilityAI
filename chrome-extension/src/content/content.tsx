function init() {
	console.log("Initializing content script...");

	const iframe = document.createElement("iframe");
	iframe.id = "info-modal-iframe";
	iframe.style.position = "fixed";
	iframe.style.top = "0px";
	iframe.style.right = "0px";
	iframe.style.zIndex = "999999";
	iframe.style.width = "400px";
	iframe.style.height = "100%";
	iframe.style.border = "none";
	iframe.style.borderRadius = "8px";
	iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
	iframe.src = chrome.runtime.getURL("index.html");

	document.body.appendChild(iframe);
	console.log("Info modal iframe injected successfully.");
}

init();
