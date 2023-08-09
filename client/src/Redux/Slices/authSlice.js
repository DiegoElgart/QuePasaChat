import { createSlice } from "@reduxjs/toolkit";
import { login, addUser, logout } from "../Actions/userActions";

const initialState = {
	user: {},
	status: "idle",
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(login.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.error = false;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state = initialState;
			})
			.addCase(addUser.fulfilled, (state, action) => {
				state.status = action.payload;
			})
			.addCase(addUser.rejected, (state, action) => {
				state.status = action.payload;
			});
	},
});

export const selectUser = state => state.auth.user;
export const selectUserError = state => state.auth.error;

export default authSlice.reducer;
