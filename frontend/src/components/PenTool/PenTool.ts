export interface PenToolOptions {
	color?: string;
	lineWidth?: number;
	lineCap?: CanvasLineCap;
	zIndex?: number;
}

export interface Stroke {
	points: { x: number; y: number }[];
	color: string;
}

export class PenToolCanvas {
	private canvas: HTMLCanvasElement | null = null;
	private ctx: CanvasRenderingContext2D | null = null;
	private drawing: boolean = false;

	private currentStroke: Stroke | null = null;
	private strokes: Stroke[] = [];
	private undoRedoStack: Stroke[] = [];

	private options: PenToolOptions;

	constructor(options: PenToolOptions = {}) {
		this.options = {
			color: options.color ?? "red",
			lineWidth: options.lineWidth ?? 4,
			lineCap: options.lineCap ?? "round",
			zIndex: options.zIndex ?? 9998,
		};
	}

	public enable() {
		if (this.canvas !== null) {
			this.addEventListeners();
			this.canvas.style.cursor = "crosshair";
			return;
		}
		this.canvas = document.createElement("canvas");
		this.canvas.id = "penToolCanvas";

		this.canvas.style.position = "absolute";
		this.canvas.style.width = "100%";
		this.canvas.style.height = `${document.documentElement.scrollHeight}px`;

		this.canvas.width = window.innerWidth;
		this.canvas.height = document.documentElement.scrollHeight;

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
	}

	public disable() {
		// Note: We do not clear the canvas or strokes here to allow undo/redo after re-enabling
		console.log("Disabling pen tool");
		this.removeEventListeners();
		if (this.canvas) {
			this.canvas.style.cursor = "default";
		}
		this.drawing = false;
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

		const point = { x: e.clientX, y: e.clientY + window.scrollY };
		this.currentStroke.points.push(point);

		this.redraw();
	};

	private onMouseUp = (e: MouseEvent) => {
		if (this.currentStroke) {
			this.strokes.push(this.currentStroke);
			this.currentStroke = null;
			this.undoRedoStack = [];
		}

		this.drawing = false;
	};

	private onMouseLeave = () => {
		this.drawing = false;
	};

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
		this.undoRedoStack.push(stroke);
		this.redraw();
	}

	public redo() {
		if (this.undoRedoStack.length === 0) return;
		const stroke = this.undoRedoStack.pop()!;
		this.strokes.push(stroke);
		this.redraw();
	}

	public clear() {
		this.strokes = [];
		this.undoRedoStack = [];
		this.redraw();
	}

	public setColor(color: string) {
		this.options.color = color;
		if (this.ctx) {
			this.ctx.strokeStyle = color;
		}
	}
}
