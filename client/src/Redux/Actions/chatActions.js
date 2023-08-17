import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_URL = "http://localhost:4000/chat";

export const createConversationAPI = createAsyncThunk("chat/createConversation", async (recipients, id) => {
	const response = await axios.post(`${CHAT_URL}`, { recipients, id });
	return response.data;
});
