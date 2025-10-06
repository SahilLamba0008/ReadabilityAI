import { Highlight, StoreHighlight } from "@/lib/types";
import { getUserId } from "@/lib/utils";

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
		document.addEventListener("mouseup", this.handleHighlightSelectionEvent);
	}

	public disable() {
		if (!this.enabled) return;
		this.enabled = false;
		document.removeEventListener("mouseup", this.handleHighlightSelectionEvent);
	}

	public setColor(color: string) {
		this.color = color;
	}

	private handleHighlightSelectionEvent = (_event: MouseEvent) => {
		this.highlightSelection();
	};

	private highlightSelection = async (highlight?: Highlight) => {
		const selection = window.getSelection();
		if (selection?.isCollapsed) return; // In case of highlight params, selection would be undefined

		let range = null;
		let text = null;
		let color = null;

		if (highlight) {
			range = highlight.range;
			text = highlight.text;
			color = highlight.color;
		} else {
			range = selection?.getRangeAt(0);
			text = selection?.toString();
			color = this.color;
		}

		if (!range || !text) return; // No selection and no highlight provided
		if (!text.trim()) return;

		const highlightId = highlight ? highlight.id : crypto.randomUUID();

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
			const highlight = document.createElement("highlight");
			highlight.style.backgroundColor = this.color;
			highlight.setAttribute("data-highlight-id", highlightId);

			range.surroundContents(highlight);
			if (highlight)
				console.log("Created highlight for single text node :", highlight);
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

				const highlight = document.createElement("highlight");
				highlight.style.backgroundColor = color;
				highlight.setAttribute("data-highlight-id", highlightId);

				nodeRange.surroundContents(highlight);
			});
		}
		const userId = (await getUserId()) ?? "";
		const pageUrl = window.location.href;
		const newHighlight: Highlight = {
			id: highlightId,
			text,
			color,
			range,
			pageUrl: pageUrl,
			userId: userId,
		};
		this.highlights.push(newHighlight);

		const storeHighlight: StoreHighlight = {
			id: highlightId,
			color,
			text,
			pageUrl: pageUrl,
			userId: userId,
		};

		browser.runtime.sendMessage({
			tool: "highlighter",
			type: "add_highlight",
			payload: storeHighlight,
		});

		selection?.removeAllRanges();
	};

	private removeHighlight = (highlightId: string) => {
		const highlights = document.querySelectorAll<HTMLElement>(
			`highlight[data-highlight-id="${highlightId}"]`
		);

		if (highlights.length === 0) {
			console.warn(`No highlights found for highlightId: ${highlightId}`);
			return;
		}

		highlights.forEach((highlight) => {
			const parent = highlight.parentNode;
			if (!parent) return;

			while (highlight.firstChild) {
				parent.insertBefore(highlight.firstChild, highlight);
			}
			parent.removeChild(highlight);
			parent.normalize();
		});
	};

	public undo() {
		if (this.highlights.length === 0) return;
		const lastHighlightId = this.highlights[this.highlights.length - 1].id;
		this.removeHighlight(lastHighlightId);
		const undoneHighlight = this.highlights.pop()!;
		this.redoStack.push(undoneHighlight);
	}

	public redo() {
		if (this.redoStack.length === 0) {
			return;
		}
		const highlight = this.redoStack.pop()!;
		this.highlightSelection(highlight);
		this.highlights.push(highlight);
	}

	public clearAll() {
		while (this.highlights.length > 0) {
			const lastHighlightId = this.highlights[this.highlights.length - 1].id;
			this.removeHighlight(lastHighlightId);
			this.highlights.pop();
		}
		this.redoStack = [];
		this.highlights = [];
	}
}
