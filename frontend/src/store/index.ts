import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./slices/toolSlice";

export const store = configureStore({
	reducer: {
		tool: toolReducer,
		// pen: penReducer,
		// highlighter: highlighterReducer,
		// user: userReducer,
		// sidePanel: sidePanelReducer,
		// filters: filtersReducer,
		// summarize: summarizeReducer,
	},
});
