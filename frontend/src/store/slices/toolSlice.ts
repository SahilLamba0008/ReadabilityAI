import { ToolType } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
