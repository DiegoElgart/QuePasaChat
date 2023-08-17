import { createSlice } from "@reduxjs/toolkit";
import { createConversationAPI, addMessageToConversationAPI } from "../Actions/chatActions";

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
			}).addCase(addMessageToConversationAPI.fulfilled,(state,action)=>{
				
			})
	},
});

export const selectChat = state => state.chat;
export const selectConversation = state => state.chat.conversations;

export default chatSlice.reducer;
