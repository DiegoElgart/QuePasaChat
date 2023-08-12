import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const CHAT_URL = "http://localhost:4000/chat";

export const createChat = createAsyncThunk("chat/createChat", async (recipients, user) => {
	const response = await axios.get(`${CHAT_URL}`);
	console.log(response.data);
	return response.data;
});
