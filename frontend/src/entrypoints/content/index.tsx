import { ContentScriptContext } from "#imports";
import {
	ClearHighlighterToolStrokes,
	disableHighlighterTool,
	enableHighlighterTool,
	RedoHighlighterToolStroke,
	UndoHighlighterToolStroke,
	UpdateHighlighterToolColor,
} from "@/components/HighlighterTool";
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

let sidePanelIframe: HTMLIFrameElement | null = null;

export default defineContentScript({
	matches: ["https://medium.com/*/*", "https://leetcode.com/*/*/"],
	cssInjectionMode: "ui",

	async main(ctx) {
		await initializeSidePanel(ctx);
		browser.runtime.onMessage.addListener(
			(
				message:
					| ToolCommandMessage
					| {
							action: string;
							tool?: string;
							payload?: { isOpen: boolean };
					  }
			) => {
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
				if (message.tool === "highlighter") {
					switch (message.action) {
						case "enable":
							enableHighlighterTool();
							break;
						case "disable":
							disableHighlighterTool();
							break;
						case "updateColor":
							UpdateHighlighterToolColor(message.payload.color);
							break;
						case "undo":
							UndoHighlighterToolStroke();
							break;
						case "redo":
							RedoHighlighterToolStroke();
							break;
						case "clear":
							ClearHighlighterToolStrokes();
							break;
					}
				}

				if (message.action === "toggleSidepanel" && sidePanelIframe) {
					sidePanelIframe.style.right =
						message.payload?.isOpen === false ? "-315px" : "0px";
				}
			}
		);
	},
});

async function initializeSidePanel(ctx: ContentScriptContext) {
	const ui = await createIframeUi(ctx, {
		page: "/sidepanel.html",
		position: "inline",
		anchor: "body",
		onMount: (wrapper, iframe) => {
			iframe.id = "readability-extension";
			iframe.width = "330px";
			iframe.height = "100%";
			iframe.style.border = "none";
			iframe.style.zIndex = "9999";
			iframe.style.position = "fixed";
			iframe.style.top = "0";
			iframe.style.right = "0";
			iframe.style.backgroundColor = "white";
			iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
			iframe.style.transition =
				"right 0.3s ease-in-out, box-shadow 0.3s ease-in-out";

			sidePanelIframe = iframe;
		},
	});

	ui.mount();
}
