import { penColors } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

interface PenState {
	color: string;
	penStrokes: string[];
	redoStack: string[];
}

const initialState: PenState = {
	color: penColors[0],
	penStrokes: [],
	redoStack: [],
};

const penSlice = createSlice({
	name: "pen",
	initialState,
	reducers: {
		updatePenColor: (state, action) => {
			state.color = action.payload;
		},
		addPenStroke: (state, action) => {
			state.penStrokes.push(action.payload);
		},
		undoPenStroke: (state, action) => {
			if (state.penStrokes.length === 0) return;
			const undoneStroke = state.penStrokes.pop();
			if (undoneStroke) {
				state.redoStack.push(undoneStroke);
			}
		},
		redoPenStroke: (state, action) => {
			if (state.redoStack.length === 0) return;
			const redoneStroke = state.redoStack.pop();
			if (redoneStroke) {
				state.penStrokes.push(redoneStroke);
			}
		},
		clearPenStrokes: (state) => {
			state.penStrokes = [];
			state.redoStack = [];
		},
	},
});

export const {
	updatePenColor,
	addPenStroke,
	undoPenStroke,
	redoPenStroke,
	clearPenStrokes,
} = penSlice.actions;
export default penSlice.reducer;
