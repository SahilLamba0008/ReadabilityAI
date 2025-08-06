import { ContentScriptContext } from "#imports";
import { disablePenTool, enablePenTool } from "@/components/PenTool";
import "~/assets/global.css";

export default defineContentScript({
	matches: ["https://medium.com/*/*", "https://leetcode.com/*/*/"],
	cssInjectionMode: "ui",

	async main(ctx) {
		await initializeSidePanel(ctx);
		console.log("Content script initialized for Medium and LeetCode");

		browser.runtime.onMessage.addListener((message) => {
			if (message.type === "penToolEnabled") {
				enablePenTool(message, ctx); // Inject canvas or iframe
			} else if (message.type === "penToolDisabled") {
				disablePenTool(message, ctx); // Cleanup
			}
		});
	},
});

async function initializeSidePanel(ctx: ContentScriptContext) {
	const ui = await createIframeUi(ctx, {
		page: "/sidepanel.html",
		position: "inline",
		anchor: "body",
		onMount: (wrapper, iframe) => {
			iframe.width = "320px";
			iframe.height = "100%";
			iframe.style.border = "none";
			iframe.style.zIndex = "9999";
			iframe.style.position = "fixed";
			iframe.style.top = "0";
			iframe.style.right = "0";
			iframe.style.backgroundColor = "white";
			iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
		},
	});

	ui.mount();
}
