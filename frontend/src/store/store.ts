import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import toolReducer from "./slices/toolSlice";
import sidePanelReducer from "./slices/sidePanelSlice";
import browserStorage from "./browserStorage"; // custom storage

const rootReducer = combineReducers({
	tool: toolReducer,
	sidePanel: sidePanelReducer,
});

const persistConfig = {
	key: "root",
	storage: browserStorage, // replace localStorage -> extension storage ( eg.chrome.storage )
	whitelist: ["sidePanel", "tool"],
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
