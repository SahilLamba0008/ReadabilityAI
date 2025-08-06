import { ContentScriptContext } from "wxt/utils/content-script-context";

export { default } from "./Pen";

const penCanvasId = "penToolCanvas";
async function enablePenTool(message: any, ctx: ContentScriptContext) {
	console.log("Pen tool enabled", message);
	const canvas = document.createElement("canvas");
	canvas.id = penCanvasId;
	canvas.style.position = "absolute";
	canvas.style.width = "100%";
	canvas.style.height = `${document.documentElement.scrollHeight}px`;
	canvas.style.backgroundColor = "yellow";
	canvas.style.top = "0";
	canvas.style.right = "0";
	canvas.style.zIndex = "9998"; // Below the side panel
	canvas.style.cursor = "crosshair";
	document.body.appendChild(canvas);
	const ctxCanvas = canvas.getContext("2d");
	if (!ctxCanvas) {
		console.error("Failed to get canvas context");
		return;
	}
	ctxCanvas.moveTo(0, 0);
	ctxCanvas.lineTo(200, 100);
	ctxCanvas.stroke();
}
async function disablePenTool(message: any, ctx: ContentScriptContext) {
	const canvas = document.getElementById(penCanvasId);
	if (canvas) {
		canvas.remove();
	}
	console.log("Pen tool disabled", message);
}

export { enablePenTool, disablePenTool };
