import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import chatSlice from "./Slices/chatSlice";

export const store = configureStore({
	reducer: { auth: authReducer, chat: chatSlice },
});
