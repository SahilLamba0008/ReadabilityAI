import { ContentScriptContext } from "#imports";
import {
	disablePenTool,
	enablePenTool,
	clearPenToolStrokes,
	redoPenToolStroke,
	undoPenToolStroke,
	updatePenToolColor,
} from "@/components/PenTool";
import { ToolCommandMessage } from "@/lib/types";
import "~/assets/global.css";

export default defineContentScript({
	matches: ["https://medium.com/*/*", "https://leetcode.com/*/*/"],
	cssInjectionMode: "ui",

	async main(ctx) {
		await initializeSidePanel(ctx);
		console.log("Content script initialized for Medium and LeetCode");

		browser.runtime.onMessage.addListener((message: ToolCommandMessage) => {
			console.log("Content script received message:", message);

			if (message.tool === "pen") {
				switch (message.action) {
					case "enable":
						enablePenTool();
						break;
					case "disable":
						disablePenTool();
						break;
					case "undo":
						undoPenToolStroke();
						break;
					case "redo":
						redoPenToolStroke();
						break;
					case "clear":
						clearPenToolStrokes();
						break;
					case "updateColor":
						updatePenToolColor(message.payload.color);
						break;
				}
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
