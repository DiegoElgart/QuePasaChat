import { selectChat } from "../Chat/chatAction";
export const RECENT_LOADING = "RECENT_LOADING";
export const RECENT_ERROR = "RECENT_ERROR";
export const ADD_RECENT_CHAT = "ADD_RECENT_CHAT";
export const NEW_CREATED_CHAT = "NEW_CREATED_CHAT";

export const recentLoading = payload => ({
	type: RECENT_LOADING,
	payload,
});
export const recentError = payload => ({ type: RECENT_ERROR, payload });

export const recentChatResult = payload => ({
	type: ADD_RECENT_CHAT,
	payload,
});
export const newCreatedChat = payload => ({ type: NEW_CREATED_CHAT, payload });

export const makeRecentChatApi = token => async dispatch => {
	recentLoading(true);
	const url = "http://localhost:4000/chat";
	try {
		let res = await fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		let data = await res.json();
		dispatch(recentChatResult(data));
	} catch (err) {
		dispatch(recentError(true));
		console.log(err.message);
	}
};

export const makeNewGroup = (group_data, token) => async dispatch => {
	recentLoading(true);
	const url = "http://localhost:4000/chat/group";
	try {
		let res = await fetch(url, {
			method: "POST",
			body: JSON.stringify(group_data),
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		let data = await res.json();
		dispatch(newCreatedChat(data));
	} catch (err) {
		dispatch(recentError(true));
		console.log(err.message);
	}
};

export const accessChat = (userId, token, recentChat) => async dispatch => {
	dispatch(recentLoading(true));
	const url = "http://localhost:4000/chat";
	try {
		let res = await fetch(url, {
			method: "post",
			body: JSON.stringify({ userId }),
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		let data = await res.json();
		if (!recentChat.find(el => el._id === data._id)) {
			dispatch(newCreatedChat(data));
			dispatch(
				selectChat({
					isGroupChat: data.isGroupChat,
					index: 0,
					user: data.users.find(user => user._id === userId),
					_id: data._id,
					chatName: data.chatName,
				})
			);
			return;
		}
		dispatch(recentLoading(false));
		dispatch(
			selectChat({
				isGroupChat: data.isGroupChat,
				index: 0,
				user: data.users.find(user => user._id === userId),
				_id: data._id,
				chatName: data.chatName,
			})
		);
	} catch (err) {
		dispatch(recentError(true));
		console.log(err.message);
	}
};
