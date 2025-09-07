import { createSlice } from "@reduxjs/toolkit";

interface SidePanelState {
	isOpen: boolean;
}

const initialState: SidePanelState = {
	isOpen: true,
};

const sidePanelSlice = createSlice({
	name: "sidePanel",
	initialState,
	reducers: {
		togglePanel(state) {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { togglePanel } = sidePanelSlice.actions;
export default sidePanelSlice.reducer;
