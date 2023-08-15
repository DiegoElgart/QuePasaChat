import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, login, logout, register, addContactToUser } from "../Actions/userActions";

const initialState = {
	user: {},
	users: [],
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
			.addCase(logout.pending, (state, action) => {
				state.status = "idle";
				state.user = {};
				state.error = null;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.status = "idle";
				state.user = {};
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.user = action.payload.user;
				state.error = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.status = action.payload;
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				state.users = action.payload;
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(addContactToUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.error = false;
			})
			.addCase(addContactToUser.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectUser = state => state.auth.user;
export const selectUserStatus = state => state.auth.status;
export const selectUserContacts = state => state.auth.user.user.contacts;
export const selectUserError = state => state.auth.error;
export const selectAllUsers = state => state.auth.users;
export default authSlice.reducer;
