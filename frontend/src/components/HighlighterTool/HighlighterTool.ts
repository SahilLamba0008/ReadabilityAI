export interface Highlight {
	id: string;
	text: string;
	color: string;
	page: string;
	title?: string;
	range?: Range;
	span?: HTMLSpanElement; // keep ref to remove later
}

export class HighlighterToolService {
	private enabled = false;
	private color: string = "#FEF3C7"; // Default light yellow

	private highlights: Highlight[] = [];
	private redoStack: Highlight[] = [];

	constructor(initialColor?: string) {
		if (initialColor) this.color = initialColor;
	}

	public enable() {
		if (this.enabled) return;
		this.enabled = true;
		document.addEventListener("mouseup", this.handleSelection);
		console.log("Highlighter enabled");
	}

	public disable() {
		if (!this.enabled) return;
		this.enabled = false;
		document.removeEventListener("mouseup", this.handleSelection);
		console.log("Highlighter disabled");
	}

	public setColor(color: string) {
		this.color = color;
	}

	private handleSelection = () => {
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed) return;

		const range = selection.getRangeAt(0);
		const span = document.createElement("span");
		span.style.backgroundColor = this.color;
		span.style.borderRadius = "2px";
		span.setAttribute("data-highlight-id", crypto.randomUUID());

		try {
			range.surroundContents(span);
		} catch (err) {
			console.warn("Invalid selection, could not highlight:", err);
			return;
		}

		const text = selection.toString();

		const highlight: Highlight = {
			id: span.getAttribute("data-highlight-id")!,
			text,
			color: this.color,
			page: window.location.href,
			range: range.cloneRange(), // keep a copy
			span,
		};

		this.highlights.push(highlight);

		console.log("New highlight:", highlight);

		selection.removeAllRanges();
	};

	// Undo last highlight
	public undo() {
		const last = this.highlights.pop();
		if (!last || !last.span) return;

		const parent = last.span.parentNode;
		if (parent) {
			while (last.span.firstChild) {
				parent.insertBefore(last.span.firstChild, last.span);
			}
			parent.removeChild(last.span);
		}

		this.redoStack.push(last);
		console.log("Undo:", last);
	}

	// Redo last undone highlight
	public redo() {
		const redoHighlight = this.redoStack.pop();
		if (!redoHighlight) return;

		// ⚠️ Better to rebuild range from saved offsets
		const span = document.createElement("span");
		span.style.backgroundColor = redoHighlight.color;
		span.style.borderRadius = "2px";
		span.setAttribute("data-highlight-id", redoHighlight.id);
		span.textContent = redoHighlight.text;

		// Insert at correct position (this part depends on how you’re saving offsets)
		redoHighlight.range?.deleteContents();
		redoHighlight.range?.insertNode(span);

		redoHighlight.span = span;
		this.highlights.push(redoHighlight);

		console.log("Redo:", redoHighlight);
	}

	// Clear all highlights
	public clearAll() {
		this.highlights.forEach((h) => {
			if (!h.span) return;
			const parent = h.span.parentNode;
			if (parent) {
				while (h.span.firstChild) {
					parent.insertBefore(h.span.firstChild, h.span);
				}
				parent.removeChild(h.span);
			}
		});

		this.highlights = [];
		this.redoStack = [];
		console.log("All highlights cleared");
	}
}
