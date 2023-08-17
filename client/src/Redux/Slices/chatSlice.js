import { createSlice } from "@reduxjs/toolkit";
import { createConversationAPI, addMessageToConversationAPI, getAllConversationsAPI } from "../Actions/chatActions";

const initialState = {
	conversations: [],
	selectedConversationIndex: 0,
	error: null,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		createConversationAPI: (state, action) => {
			const { recipients, id } = action.payload;
			state.conversations.push({ id, recipients, messages: [] });
		},
	},
	extraReducers(builder) {
		builder
			.addCase(createConversationAPI.fulfilled, (state, action) => {
				state.conversations = [...state.conversations, action.payload];
			})
			.addCase(createConversationAPI.rejected, (state, action) => {
				state.error = action.payload;
			})
			.addCase(addMessageToConversationAPI.fulfilled, (state, action) => {})
			.addCase(getAllConversationsAPI.fulfilled, (state, action) => {
				state.chats = action.payload;
			})
			.addCase(getAllConversationsAPI.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectChat = state => state.chat;
export const selectConversation = state => state.chat;

export default chatSlice.reducer;
