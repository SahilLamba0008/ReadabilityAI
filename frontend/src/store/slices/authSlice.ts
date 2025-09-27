import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthState {
	user: User | null;
	authenticated: boolean;
}

const initalState: AuthState = {
	user: null,
	authenticated: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initalState,
	reducers: {
		setUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.authenticated = action.payload !== null;
		},
		clearUser: (state) => {
			state.user = null;
			state.authenticated = false;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
