import { createSlice } from "@reduxjs/toolkit";
import { createChat } from "../Actions/chatActions";

const initialState = {
	chats: {},
	isGroup: false,
	error: null,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		createChat: (state, action) => {
			state.chats = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(createChat.fulfilled, (state, action) => {
				state.chats = action.payload;
			})
			.addCase(createChat.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectChat = state => state.chat;

export default chatSlice.reducer;
