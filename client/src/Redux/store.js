import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Auth/authReducer";
import { chatReducer } from "./Chat/chatReducer";
import { recentChatReducer } from "./RecentChat/recentChatReducer";
import { searchReducer } from "./Search/searchReducer";
import { notificationReducer } from "./Notification/notificationReducer";

const loggerMiddleware = store => next => action => {
	if (typeof action === "function") {
		return action(store.dispatch);
	}
	next(action);
};
export const store = configureStore({
	reducer: { user: authReducer, search: searchReducer, chat: chatReducer, recentChat: recentChatReducer, notification: notificationReducer },
	middleware: [loggerMiddleware],
});
