
export const store = configureStore({
	reducer: { user: authReducer, search: searchReducer, chat: chatReducer, recentChat: recentChatReducer, notification: notificationReducer },
	middleware: [loggerMiddleware],
});
