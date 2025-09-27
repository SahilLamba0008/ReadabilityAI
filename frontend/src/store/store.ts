import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import toolReducer from "./slices/toolSlice";
import sidePanelReducer from "./slices/sidepanelSlice";
import highlighterReducer from "./slices/highlighterSlice";
import penReducer from "./slices/penSlice";
import authReducer from "./slices/authSlice";
import sessionStorage from "redux-persist/es/storage/session";

const rootReducer = combineReducers({
	tool: toolReducer,
	sidePanel: sidePanelReducer,
	highlighter: highlighterReducer,
	pen: penReducer,
	auth: authReducer,
});

const persistConfig = {
	key: "root",
	storage: sessionStorage,
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
