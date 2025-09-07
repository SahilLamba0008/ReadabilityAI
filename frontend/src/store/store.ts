import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import toolReducer from "./slices/toolSlice";
import sidePanelReducer from "./slices/sidePanelSlice";
import highlighterReducer from "./slices/highlighterSlice";
import browserStorage from "./browserStorage";

const rootReducer = combineReducers({
	tool: toolReducer,
	sidePanel: sidePanelReducer,
	highlighter: highlighterReducer,
});

const persistConfig = {
	key: "root",
	storage: browserStorage, // replace localStorage -> extension storage ( eg.chrome.storage )
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistorStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
