import "~/assets/global.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

export default defineContentScript({
	matches: ["https://medium.com/*/*", "https://leetcode.com/*/*/"],
	cssInjectionMode: "ui",

	async main(ctx) {
		const ui = await createIframeUi(ctx, {
			page: "/sidepanel.html",
			position: "inline",
			anchor: "body",
			onMount: (wrapper, iframe) => {
				// Add styles to the iframe like width
				iframe.width = "350px";
				iframe.height = "100%";
				iframe.style.border = "none";
				iframe.style.zIndex = "9999";
				iframe.style.position = "fixed";
				iframe.style.top = "0";
				iframe.style.right = "0";
				iframe.style.backgroundColor = "yellow";
				iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
			},
		});

		// Show UI to user
		ui.mount();
	},
});
