import { Highlight, StoreHighlight } from "@/lib/types";
import { addHighlight } from "@/store/slices/highlighterSlice";
import { store } from "@/store/store";

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
		// if (selection?.isCollapsed) return; // In case of highlight params, selection would be undefined

		let range = null;
		let text = null;
		if (highlight) {
			// override with provided highlight if present
			range = highlight.range;
			text = highlight.text;
			this.color = highlight.color;
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

		const textNodes: Text[] = [];
		while (walker.nextNode()) {
			textNodes.push(walker.currentNode as Text);
		}
		// If selection is within a single text node
		if (textNodes.length === 0) {
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

		const newStoreHiglight: StoreHighlight = {
			id: highlightId,
			text,
			color: this.color,
			title: "Stored Highlight from class",
		};
		store.dispatch(addHighlight(newStoreHiglight));
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
		this.removeHighlight(this.highlights.length - 1);
		const undoneHighlight = this.highlights.pop()!;
		this.redoStack.push(undoneHighlight);
	}

	public redo() {
		if (this.redoStack.length === 0) {
			return;
		}
		const highlight = this.redoStack.pop()!;
		this.paintSelection(highlight);
	}

	public clearAll() {
		while (this.highlights.length > 0) {
			this.removeHighlight(this.highlights.length - 1);
			this.highlights.pop();
		}
	}
}
