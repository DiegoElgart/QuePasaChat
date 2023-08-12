import { createSlice } from "@reduxjs/toolkit";
import { createChat } from "../Actions/chatActions";

const initialState = {
	chat: {},
	isGroup: false,
	error: null,
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		createChat: (state, action) => {
			state.chat = action.payload;
		},
	},
});

export default chatSlice.reducer;
