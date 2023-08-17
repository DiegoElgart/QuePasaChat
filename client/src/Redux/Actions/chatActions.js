import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_URL = "http://localhost:4000/chat";

export const createConversationAPI = createAsyncThunk("chat/createConversation", async recipients => {
	const response = await axios.post(`${CHAT_URL}`, { recipients });
	return response.data;
});

export const addMessageToConversationAPI = createAsyncThunk("chat/addMessageToConversationAPI", async ({ recipients, text, sender }) => {
	
});
