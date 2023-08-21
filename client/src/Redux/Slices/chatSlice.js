import { createSlice } from "@reduxjs/toolkit";
import { createConversationAPI, addMessageToConversationAPI, getAllUserConversationsAPI } from "../Actions/chatActions";

const initialState = {
	conversations: [],
	selectConversationIndex: 0,
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
			.addCase(addMessageToConversationAPI.fulfilled, (state, action) => {
				const { _id, messages } = action.payload;

				//console.log(action.payload);

				const existingConversationIndex = state.conversations.findIndex(conversation => conversation._id === _id);
				if (existingConversationIndex !== -1) {
					state.conversations[existingConversationIndex].messages.push(messages);

					// Update the existing conversation with the new message
				} else {
					// Create a new conversation
					createConversationAPI(action.payload);
				}
			})

			.addCase(getAllUserConversationsAPI.fulfilled, (state, action) => {
				state.conversations = action.payload;
			})
			.addCase(getAllUserConversationsAPI.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectChat = state => state.chat;
export const selectConversation = state => state.chat;

export default chatSlice.reducer;
