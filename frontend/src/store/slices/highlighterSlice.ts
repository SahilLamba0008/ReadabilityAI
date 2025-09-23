import { highlighterColors } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import { Highlight } from "@/lib/types";

interface HighlighterState {
	highlightCount: number;
	color: string;
	highlights: Highlight[];
	redoStack: Highlight[];
}

const initialState: HighlighterState = {
	highlightCount: 1,
	color: highlighterColors[0],
	highlights: [],
	redoStack: [],
};

const highlighterSlice = createSlice({
	name: "highlighter",
	initialState,
	reducers: {
		updateHighlighterColor: (state, action) => {
			state.color = action.payload;
		},
		addHighlight: (state, action) => {
			const title = `Highlight no - ${state.highlightCount++}`;
			const updatedHighlight = { ...action.payload, title };
			state.highlights.push(updatedHighlight);
		},
		undoHighlight: (state, action) => {
			if (state.highlights.length === 0) return;
			const undoneHighlight = state.highlights.pop();
			if (undoneHighlight) {
				state.redoStack.push(undoneHighlight);
			}
		},
		redoHighlight: (state, action) => {
			if (state.redoStack.length === 0) return;
			const redoneHighlight = state.redoStack.pop();
			if (redoneHighlight) {
				state.highlights.push(redoneHighlight);
			}
		},
		clearHighlights: (state) => {
			state.highlights = [];
			state.redoStack = [];
		},
	},
});

export const {
	updateHighlighterColor,
	addHighlight,
	undoHighlight,
	redoHighlight,
	clearHighlights,
} = highlighterSlice.actions;
export default highlighterSlice.reducer;
