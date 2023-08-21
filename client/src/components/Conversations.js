import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";
import { useSelector } from "react-redux";
import { selectConversation } from "../Redux/Slices/chatSlice";

export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations();
	console.log(conversations);
	// const [conversations, setConversations] = useState([]);
	// const { conversations: conversationsAPI } = useSelector(selectConversation);

	// useEffect(() => {
	// 	setConversations(conversationsAPI);
	// }, [conversationsAPI]);

	return (
		<ListGroup variant='flush'>
			{conversations.map((conversation, index) => (
				<ListGroup.Item key={conversation._id} action onClick={() => selectConversationIndex(index)} active={conversation.selected}>
					{conversation.recipients.map(r => r.username).join(", ")}
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
