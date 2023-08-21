import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_URL = "http://localhost:4000/chat";

export const createConversationAPI = createAsyncThunk("chat/createConversation", async recipients => {
	const currId = localStorage.getItem("QuePasaChat-id");
	const response = await axios.post(`${CHAT_URL}`, { recipients, currId });
	return response.data;
});

export const addMessageToConversationAPI = createAsyncThunk("chat/addMessageToConversationAPI", async ({ recipients, text, sender, conversationId }) => {
	const response = await axios.post(`${CHAT_URL}/${conversationId}`, { recipients, sender, text });
	//console.log(recipients, text, sender, conversationId);
	return response.data;
});

export const getAllUserConversationsAPI = createAsyncThunk("chat/getAllUserConversationsAPI", async userId => {
	const response = await axios.get(`${CHAT_URL}/user/${userId}`);
	return response.data;
});
