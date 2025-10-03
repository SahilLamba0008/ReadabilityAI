import { PenToolOptions, Stroke } from "@/lib/types";

export class PenToolCanvas {
	private canvas: HTMLCanvasElement | null = null;
	private ctx: CanvasRenderingContext2D | null = null;
	private drawing: boolean = false;

	private currentStroke: Stroke | null = null;
	private strokes: Stroke[] = [];
	private redoStack: Stroke[] = [];

	private options: PenToolOptions;
	private listener:
		| ((message: any, sender: any, sendResponse: any) => void)
		| null = null;

	constructor(options: PenToolOptions = {}) {
		this.options = {
			color: options.color ?? "red",
			lineWidth: options.lineWidth ?? 4,
			lineCap: options.lineCap ?? "round",
			zIndex: options.zIndex ?? 9998,
		};
	}

	public enable() {
		this.canvas = document.createElement("canvas");
		this.canvas.id = "penToolCanvas";

		this.canvas.style.position = "absolute";

		this.canvas.width = document.documentElement.scrollWidth;
		this.canvas.height = document.documentElement.scrollHeight;
		this.canvas.style.width = `${document.documentElement.scrollWidth}px`;
		this.canvas.style.height = `${document.documentElement.scrollHeight}px`;

		this.canvas.style.top = "0";
		this.canvas.style.right = "0";
		this.canvas.style.zIndex = this.options.zIndex!.toString();
		this.canvas.style.cursor = "crosshair";

		document.body.appendChild(this.canvas);

		this.addEventListeners();
		const ctx = this.canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get canvas context");
		}
		this.ctx = ctx;
		this.ctx.strokeStyle = this.options.color!;
		this.ctx.lineWidth = this.options.lineWidth!;
		this.ctx.lineCap = this.options.lineCap!;

		if (this.strokes.length > 0) {
			this.redraw();
		}
	}

	public disable() {
		// Note: We only clear the canvas not the strokes here to allow paint after re-enabling
		if (!this.canvas) return;
		const existingCanvas = document.querySelector("#penToolCanvas");
		if (existingCanvas) {
			console.log("⚠️ FOUND EXISTING CANVAS! Removing it first");
			existingCanvas.remove();
		}
		console.log("Disabling pen tool");
		this.removeEventListeners();
		this.canvas.style.cursor = "default";
		this.canvas.remove();
		this.canvas = null;
		this.ctx = null;
		this.drawing = false;
		this.listener = null;
	}

	private addEventListeners() {
		if (!this.canvas) return;
		this.canvas.addEventListener("mousedown", this.onMouseDown);
		this.canvas.addEventListener("mousemove", this.onMouseMove);
		this.canvas.addEventListener("mouseup", this.onMouseUp);
		this.canvas.addEventListener("mouseleave", this.onMouseLeave);
	}

	private removeEventListeners() {
		if (!this.canvas) return;
		this.canvas.removeEventListener("mousedown", this.onMouseDown);
		this.canvas.removeEventListener("mousemove", this.onMouseMove);
		this.canvas.removeEventListener("mouseup", this.onMouseUp);
		this.canvas.removeEventListener("mouseleave", this.onMouseLeave);
	}

	private onMouseDown = (e: MouseEvent) => {
		if (!this.ctx) return;
		console.log("Mouse down at", e.clientX, e.clientY + window.scrollY);
		this.drawing = true;

		this.currentStroke = {
			points: [{ x: e.clientX, y: e.clientY + window.scrollY }],
			color: this.options.color!,
		};
	};

	private onMouseMove = (e: MouseEvent) => {
		if (!this.ctx || !this.drawing || !this.currentStroke) return;

		const point = {
			x: e.clientX + window.scrollX,
			y: e.clientY + window.scrollY,
		};
		this.currentStroke.points.push(point);

		this.redraw();
	};

	private onMouseUp = (e: MouseEvent) => {
		if (this.currentStroke) {
			this.strokes.push(this.currentStroke);
			browser.runtime.sendMessage({
				tool: "pen",
				type: "add_stroke",
				payload: this.currentStroke,
			});
			this.currentStroke = null;
			this.redoStack = [];
		}

		this.drawing = false;
	};

	private onMouseLeave = () => {
		this.drawing = false;
	};

	public loadStrokes(strokes: Stroke[]) {
		this.strokes = strokes;
		this.redraw();
	}

	private redraw() {
		if (!this.ctx || !this.canvas) return;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (const stroke of this.strokes) {
			this.drawStroke(stroke);
		}

		if (this.currentStroke) {
			this.drawStroke(this.currentStroke);
		}
	}

	private drawStroke(stroke: Stroke) {
		if (!this.ctx || stroke.points.length === 0) return;

		this.ctx.strokeStyle = stroke.color;
		this.ctx.beginPath();
		this.ctx.moveTo(stroke.points[0].x, stroke.points[0].y);

		for (let i = 1; i < stroke.points.length; i++) {
			this.ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
		}

		this.ctx.stroke();
	}

	public undo() {
		if (this.strokes.length === 0) return;
		const stroke = this.strokes.pop()!;
		this.redoStack.push(stroke);
		this.redraw();
		browser.runtime.sendMessage({
			tool: "pen",
			type: "undo_last_stroke",
		});
	}

	public redo() {
		if (this.strokes.length === 0) return;
		const stroke = this.redoStack.pop()!;
		this.strokes.push(stroke);
		this.redraw();
		browser.runtime.sendMessage({
			tool: "pen",
			type: "redo_last_stroke",
		});
	}

	public clear() {
		this.strokes = [];
		this.redoStack = [];
		this.redraw();
		browser.runtime.sendMessage({
			tool: "pen",
			type: "clear_all_strokes",
		});
	}

	public setColor(color: string) {
		this.options.color = color;
		if (this.ctx) {
			this.ctx.strokeStyle = color;
		}
	}
}
