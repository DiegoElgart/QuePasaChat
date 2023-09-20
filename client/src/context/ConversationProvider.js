import React, { useContext, useState, useEffect } from "react";
import { selectUser, selectUserContacts } from "../Redux/Slices/authSlice";

import { useSocket } from "./SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToConversationAPI, createConversationAPI, getAllUserConversationsAPI, removeRecipientFromChat } from "../Redux/Actions/chatActions";
import { selectConversation } from "../Redux/Slices/chatSlice";

const ConversationsContext = React.createContext();

export function useConversations() {
	return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }) {
	const { user } = useSelector(selectUser);
	const { conversations: conversationsAPI } = useSelector(selectConversation);
	const dispatch = useDispatch();
	const id = localStorage.getItem("QuePasaChat-id");
	const contacts = useSelector(selectUserContacts);
	const [conversations, setConversations] = useState([]);
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
	const socket = useSocket();

	useEffect(() => {
		setConversations(conversationsAPI);
	}, [conversationsAPI]);

	async function dispatchCreateConversationAPI(selectedContactIds) {
		const contactsForRecipients = contacts.filter(contact => selectedContactIds.includes(contact.contactId._id.toString()));
		console.log(contactsForRecipients);
		const filteredContacts = contactsForRecipients.map(contact => ({
			_id: contact.contactId._id,
			username: contact.contactId.username,
		}));
		filteredContacts.push(user);
		await dispatch(createConversationAPI(filteredContacts));
	}

	async function dispatchRemoveRecipienteFromChat(chatId) {
		await dispatch(removeRecipientFromChat(chatId));
		const currChat = conversations.find(conv => conv._id === chatId);
		const newRecipients = currChat.recipients.filter(recip => recip._id !== user._id);

		socket.emit("left-conversation", newRecipients);
	}
	useEffect(() => {
		if (socket == null) return;
		socket.on("receive-message", data => {
			const checkIfBlock = contacts.find(contact => contact.contactId._id === data.sender);
			if (!checkIfBlock.isBlocked) {
				dispatch(getAllUserConversationsAPI(user._id));
			}
		});

		return () => socket.off("receive-message");
	}, [socket, dispatch]);

	useEffect(() => {
		if (socket == null) return;

		socket.on("has-left-conversation", () => {
			dispatch(getAllUserConversationsAPI(user._id));
		});

		return () => socket.off("has-left-conversation");
	}, [socket, dispatch]);

	function sendMessage(recipients, text, conversationId) {
		socket.emit("send-message", { recipients, text, conversationId });
		dispatch(addMessageToConversationAPI({ recipients, text, sender: id, conversationId }));
	}

	const formattedConversations = conversations.map((conversation, index) => {
		const messages = conversation.messages.map(message => {
			const contact = contacts.find(contact => {
				return contact.contactId._id === message.sender;
			});

			const username = (contact && contact.contactId.username) || message.sender;
			const fromMe = id === message.sender;
			return { ...message, senderUsername: username, fromMe };
		});
		const selected = index === selectedConversationIndex;

		return { ...conversation, messages, selected };
	});

	const value = {
		conversations: formattedConversations,
		selectedConversation: formattedConversations[selectedConversationIndex],
		sendMessage,
		selectConversationIndex: setSelectedConversationIndex,
		dispatchCreateConversationAPI,
		dispatchRemoveRecipienteFromChat,
	};

	return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
}
