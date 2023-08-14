import React, { useEffect, useState } from "react";
import { selectChat } from "../Redux/Slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const Conversations = () => {
	const dispatch = useDispatch();
	const { chats } = useSelector(selectChat);
	const [conversations, setConversations] = useState([]);
	useEffect(() => {
		if (chats) {
			setConversations(chats);
		}
	}, [chats]);
	return (
		<div>
			<h3>Conversations</h3>
		</div>
	);
};

export default Conversations;
