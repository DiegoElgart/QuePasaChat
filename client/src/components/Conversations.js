import React, { useEffect, useState } from "react";
import { CloseButton, ListGroup, Overlay } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";
import { useSelector } from "react-redux";
import { selectConversation } from "../Redux/Slices/chatSlice";
import { selectUser } from "../Redux/Slices/authSlice";

export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations();
	//console.log(conversations);
	const [user, setUser] = useState([]);
	const { user: userAPI } = useSelector(selectUser);

	useEffect(() => {
		setUser(userAPI);
	}, [userAPI]);

	return (
		<ListGroup variant='flush'>
			{conversations.map((conversation, index) => (
				<ListGroup.Item key={conversation._id} action onClick={() => selectConversationIndex(index)} active={conversation.selected}>
					{conversation.recipients
						.filter(r => r.username !== user.username)
						.map(r => r.username)
						.join(", ")}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
