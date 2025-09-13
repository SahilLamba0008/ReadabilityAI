import { highlighterColors } from "@/lib/utils";
import { createSlice, current } from "@reduxjs/toolkit";
import { Highlight } from "@/lib/types";

const dummyRange = document.createRange();
const dummySpan = document.createElement("span");

export const dummyHighlights: Highlight[] = [
	{
		id: "1",
		text: "This is the first highlighted text.",
		color: "#FFEB3B", // yellow
		range: dummyRange,
		spans: [dummySpan],
		page: "1",
		title: "Intro Page",
	},
	{
		id: "2",
		text: "Another highlighted section in blue.",
		color: "#2196F3", // blue
		range: dummyRange,
		spans: [dummySpan],
		page: "2",
		title: "Chapter 1",
	},
	{
		id: "3",
		text: "Final dummy highlight in green.",
		color: "#4CAF50", // green
		range: dummyRange,
		spans: [dummySpan],
		page: "3",
		title: "Conclusion",
	},
];
interface HighlighterState {
	color: string;
	highlights: Highlight[];
	redoStack: Highlight[];
}

const initialState: HighlighterState = {
	color: highlighterColors[0],
	highlights: dummyHighlights,
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
