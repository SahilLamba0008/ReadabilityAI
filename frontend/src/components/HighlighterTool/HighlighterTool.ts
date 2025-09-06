type Highlight = {
	id: string;
	text: string;
	color: string;
	startContainer: Node;
	startOffset: number;
	endContainer: Node;
	endOffset: number;
	spans: HTMLSpanElement[]; // References to the created span elements
};

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
		document.addEventListener("mouseup", this.handlePaintSelectionEvent);
		console.log("Highlighter enabled");
	}

	public disable() {
		if (!this.enabled) return;
		this.enabled = false;
		document.removeEventListener("mouseup", this.handlePaintSelectionEvent);
		console.log("Highlighter disabled");
	}

	public setColor(color: string) {
		this.color = color;
	}

	private handlePaintSelectionEvent = (_event: MouseEvent) => {
		this.paintSelection();
	};

	private paintSelection = () => {
		const selection = window.getSelection();
		if (!selection || selection.isCollapsed) return;

		const range = selection.getRangeAt(0);
		const text = selection.toString();
		if (!text.trim()) return;

		const highlightId = crypto.randomUUID();
		const spans: HTMLSpanElement[] = [];

		// Walk through text nodes inside the range
		const walker = document.createTreeWalker(
			range.commonAncestorContainer,
			NodeFilter.SHOW_TEXT,
			{
				acceptNode: (node) =>
					range.intersectsNode(node)
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_REJECT,
			}
		);

		const textNodes: Text[] = [];
		while (walker.nextNode()) {
			textNodes.push(walker.currentNode as Text);
		}

		// If nothing found (rare case), fallback: just highlight the range itself
		if (textNodes.length === 0) {
			const span = document.createElement("span");
			span.style.backgroundColor = this.color;
			span.setAttribute("data-highlight-id", highlightId);

			range.surroundContents(span);
			spans.push(span);
		} else {
			// Highlight each intersecting text node
			textNodes.forEach((node) => {
				const nodeRange = document.createRange();
				nodeRange.selectNodeContents(node);

				// Adjust range to the intersection
				if (nodeRange.compareBoundaryPoints(Range.START_TO_START, range) < 0) {
					nodeRange.setStart(range.startContainer, range.startOffset);
				}
				if (nodeRange.compareBoundaryPoints(Range.END_TO_END, range) > 0) {
					nodeRange.setEnd(range.endContainer, range.endOffset);
				}

				const span = document.createElement("span");
				span.style.backgroundColor = this.color;
				span.setAttribute("data-highlight-id", highlightId);

				nodeRange.surroundContents(span);
				spans.push(span);
			});
		}

		// Store highlight
		this.highlights.push({
			id: highlightId,
			text,
			color: this.color,
			startContainer: range.startContainer,
			startOffset: range.startOffset,
			endContainer: range.endContainer,
			endOffset: range.endOffset,
			spans,
		});

		console.log("New highlight:", this.highlights[this.highlights.length - 1]);

		selection.removeAllRanges();
	};

	private removeHighlight = (index: number) => {
		if (index < 0 || index >= this.highlights.length) return;

		const highlight = this.highlights[index];

		highlight.spans.forEach((span: HTMLSpanElement) => {
			const parent = span.parentNode;
			if (!parent) return;

			// Replace the span with its text content
			while (span.firstChild) {
				parent.insertBefore(span.firstChild, span);
			}
			parent.removeChild(span);

			// Normalize to merge text nodes back together
			parent.normalize();
		});

		// Remove from array
		this.highlights.splice(index, 1);
	};

	public undo() {
		if (this.highlights.length === 0) return;
		this.removeHighlight(this.highlights.length - 1);
		const undoneHighlight = this.highlights.pop()!;
		this.redoStack.push(undoneHighlight);
		console.log("Undo performed");
	}

	public redo() {}

	public clearAll() {
		while (this.highlights.length > 0) {
			this.removeHighlight(this.highlights.length - 1);
		}
	}
}
