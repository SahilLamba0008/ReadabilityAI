import { highlighterColors } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import { Highlight } from "@/lib/types";

interface HighlighterState {
	color: string;
	highlights: Highlight[];
	redoStack: Highlight[];
}

const initialState: HighlighterState = {
	color: highlighterColors[0],
	highlights: [],
	redoStack: [],
};

const highlighterSlice = createSlice({
	name: "highlighter",
	initialState,
	reducers: {
		updateColor: (state, action) => {
			console.log("Updating highlighter Slice color to :", action.payload);
			state.color = action.payload;
		},
		addHighlight: (state, action) => {
			state.highlights.push(action.payload);
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
	updateColor,
	addHighlight,
	undoHighlight,
	redoHighlight,
	clearHighlights,
} = highlighterSlice.actions;
export default highlighterSlice.reducer;
