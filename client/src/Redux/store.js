import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import chatSlice from "./Slices/chatSlice";

const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

export const store = configureStore({
	reducer: { auth: authReducer, chat: chatSlice },
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
});
