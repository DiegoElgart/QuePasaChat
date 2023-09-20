import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";
import { useSelector } from "react-redux";
import { selectUser, selectUserContacts } from "../Redux/Slices/authSlice";

export default function Conversations() {
	const { conversations, selectConversationIndex } = useConversations();
	const [user, setUser] = useState([]);
	const contacts = useSelector(selectUserContacts);
	const { user: userAPI } = useSelector(selectUser);

	useEffect(() => {
		setUser(userAPI);
	}, [userAPI]);
	///console.log(contacts);
	const isBlocked = id => {
		const contact = contacts.find(c => c.contactId._id === id);

		return contact && contact.isBlocked;
	};

	return (
		<ListGroup variant='flush'>
			{conversations.map((conversation, index) => {
				const allBlocked = conversation.recipients.filter(recipient => recipient.username !== user.username).map(recipient => isBlocked(recipient._id));

				return !allBlocked[0] ? (
					<ListGroup.Item key={conversation._id} action onClick={() => selectConversationIndex(index)} active={conversation.selected}>
						{conversation.recipients
							.filter(r => r.username !== user.username)
							.map(r => r.username)
							.join(", ")}
					</ListGroup.Item>
				) : null;
			})}
		</ListGroup>
	);
}
