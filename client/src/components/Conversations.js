import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";

export default function Conversations() {
	const { selectConversationIndex, conversations } = useConversations();
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
