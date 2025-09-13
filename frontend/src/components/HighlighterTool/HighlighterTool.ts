import { Highlight } from "@/lib/types";

export class HighlighterToolService {
	private enabled = false;
	private color: string = "#FEF3C7"; // Default light yellow

	public highlights: Highlight[] = [];
	public redoStack: Highlight[] = [];

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

	private paintSelection = (highlight?: Highlight) => {
		const selection = window.getSelection();
		console.log("Painting provided highlight before collapse check", highlight);
		// if (selection?.isCollapsed) return; // In case of highlight params, selection would be undefined

		let range = null;
		let text = null;
		if (highlight) {
			// override with provided highlight if present
			console.log("range and text before :", range, text);
			range = highlight.range;
			text = highlight.text;
			this.color = highlight.color;
			console.log("range and text after :", range, text);
		} else {
			range = selection?.getRangeAt(0);
			text = selection?.toString();
		}
		if (!range || !text) return; // No selection and no highlight provided
		if (!text.trim()) return;

		const highlightId = highlight ? highlight.id : crypto.randomUUID();
		const spans: HTMLSpanElement[] = [];

		// Find all text nodes within the range
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

		if (highlight) console.log("walker created from highlight range:", walker);

		const textNodes: Text[] = [];
		while (walker.nextNode()) {
			textNodes.push(walker.currentNode as Text);
		}
		if (highlight) console.log("Text nodes found in range:", textNodes);
		// If selection is within a single text node
		if (textNodes.length === 0) {
			console.log("No text nodes found in range, highlighting entire range");
			const span = document.createElement("span");
			span.style.backgroundColor = this.color;
			span.setAttribute("data-highlight-id", highlightId);

			range.surroundContents(span);
			spans.push(span);
			if (highlight) console.log("Created span for single text node :", span);
		} else {
			// Highlight each intersecting text node
			textNodes.forEach((node) => {
				const nodeRange = document.createRange();
				nodeRange.selectNodeContents(node);

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
				if (highlight)
					console.log("Created span for multiple text node :", span);
			});
		}

		const newHighlight: Highlight = {
			id: highlightId,
			text,
			color: this.color,
			range,
			spans,
		};

		this.highlights.push(newHighlight);
		selection?.removeAllRanges();
	};

	private removeHighlight = (index: number) => {
		if (index < 0 || index >= this.highlights.length) return;

		const highlight = this.highlights[index];

		highlight.spans.forEach((span: HTMLSpanElement) => {
			const parent = span.parentNode;
			if (!parent) return;

			while (span.firstChild) {
				parent.insertBefore(span.firstChild, span);
			}
			parent.removeChild(span);

			// Normalize to merge text nodes back together
			parent.normalize();
		});
	};

	public undo() {
		if (this.highlights.length === 0) return;
		console.log("highlights before undo:", this.highlights);
		this.removeHighlight(this.highlights.length - 1);
		const undoneHighlight = this.highlights.pop()!;
		this.redoStack.push(undoneHighlight);
		console.log("highlights after undo:", this.highlights);
		// console.log("Redo stack after undo:", this.redoStack);
	}

	public redo() {
		if (this.redoStack.length === 0) {
			console.log("redo stack empty");
			return;
		}
		const highlight = this.redoStack.pop()!;
		this.paintSelection(highlight);
		console.log("Redo performed", highlight);
	}

	public clearAll() {
		while (this.highlights.length > 0) {
			this.removeHighlight(this.highlights.length - 1);
			this.highlights.pop();
		}
	}
}
