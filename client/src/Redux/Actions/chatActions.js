import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_URL = "http://localhost:4000/chat";

export const createConversationAPI = createAsyncThunk("chat/createConversation", async recipients => {
	const currId = localStorage.getItem("QuePasaChat-id");
	const response = await axios.post(`${CHAT_URL}`, { recipients, currId });
	return response.data;
});

export const addMessageToConversationAPI = createAsyncThunk("chat/addMessageToConversationAPI", async ({ recipients, text, sender }) => {});

export const getAllConversationsAPI = createAsyncThunk("chat/getAllConversationsAPI", async () => {
	const response = await axios.get(CHAT_URL);
	return response.data;
});
