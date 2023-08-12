import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserContacts } from "../Redux/Slices/authSlice";

const ConversationContext = React.createContext();
export function useConversations() {
	return useContext(ConversationContext);
}

export function ConversationProvider({ children }) {
	const contacts = useSelector(selectUserContacts);
	const [conversations, setConversations] = useState([]);

	function createConversation(recipients) {
		setConversations(prevConversations => {
			return [...prevConversations, { recipients, messages: [] }];
		});
	}

	const formatedConversations = conversations.map(conversation => {
		const recipients = conversation.recipients.map(recipient => {
			const contact = contacts.find(contact => {
				return contact._id === recipient;
			});
			const username = (contact && contact.username) || recipient;
			return { id: recipient, username };
		});
		return { ...conversation, recipients };
	});

	const value = {
		conversations: formatedConversations,
		createConversation,
	};

	return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}
