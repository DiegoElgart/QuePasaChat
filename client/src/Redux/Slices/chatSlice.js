import { createSlice } from "@reduxjs/toolkit";
import { createConversationAPI } from "../Actions/chatActions";

const initialState = {
	conversations: [],
	isGroup: false,
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
				const { recipients } = action.payload;
				state.conversations.push({ recipients, messages: [] });
			})
			.addCase(createConversationAPI.rejected, (state, action) => {
				state.error = action.payload;
			});
	},
});

export const selectChat = state => state.chat;

export default chatSlice.reducer;
