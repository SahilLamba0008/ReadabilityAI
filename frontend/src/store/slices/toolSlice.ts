import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ToolType = "pen" | "highlighter" | null;

interface ToolState {
	activeTool: ToolType;
}

const initialState: ToolState = {
	activeTool: null,
};

const toolSlice = createSlice({
	name: "tool",
	initialState,
	reducers: {
		setActiveTool: (state, action: PayloadAction<ToolType>) => {
			state.activeTool = action.payload;
		},
	},
});

export const { setActiveTool } = toolSlice.actions;
export default toolSlice.reducer;
