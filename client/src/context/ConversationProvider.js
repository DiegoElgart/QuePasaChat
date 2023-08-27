import React, { useContext, useState, useEffect, useCallback } from "react";
import { selectUser } from "../Redux/Slices/authSlice";

import { useSocket } from "./SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToConversationAPI, createConversationAPI, getAllUserConversationsAPI } from "../Redux/Actions/chatActions";
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
	const [contacts, setContacts] = useState([]);
	const [conversations, setConversations] = useState([]);
	const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
	const socket = useSocket();

	useEffect(() => {
		setContacts(user.contacts);
	}, [user]);

	useEffect(() => {
		setConversations(conversationsAPI);
	}, [conversationsAPI, socket]);

	// function createConversation(recipients) {
	// 	setConversations(prevConversations => {
	// 		return [...prevConversations, { recipients, messages: [] }];
	// 	});
	// }

	async function dispatchCreateConversationAPI(conversations) {
		await dispatch(createConversationAPI(conversations));
	}

	const addMessageToConversation = useCallback(
		({ recipients, text, sender }) => {
			setConversations(prevConversations => {
				let madeChange = false;
				const newMessage = { sender, text };
				const newConversations = prevConversations.map(conversation => {
					if (arrayEquality(conversation.recipients, recipients)) {
						madeChange = true;
						return {
							...conversation,
							messages: [...conversation.messages, newMessage],
						};
					}

					return conversation;
				});

				if (madeChange) {
					return newConversations;
				} else {
					return [...prevConversations, { recipients, messages: [newMessage] }];
				}
			});
		},
		[setConversations]
	);

	useEffect(() => {
		if (socket == null) return;
		socket.on("receive-message", data => {
			dispatch(addMessageToConversationAPI({ recipients: data.recipients, text: data.text, sender: data.sender, conversationId: data._id }));
		});

		return () => socket.off("receive-message");
	}, [socket, dispatch]);

	function sendMessage(recipients, text, conversationId) {
		socket.emit("send-message", { recipients, text, conversationId });
		//addMessageToConversation({ recipients, text, sender: id });
		//console.log(recipients);
		dispatch(addMessageToConversationAPI({ recipients, text, sender: id, conversationId }));
	}

	const formattedConversations = conversations.map((conversation, index) => {
		const recipients = conversation.recipients.map(recipient => {
			// const contact = contacts.find(contact => {
			// 	return contact._id === recipient;
			// });
			const username = recipient.username || recipient;
			return { _id: recipient, username };
		});

		//console.log(conversation.messages);
		const messages = conversation.messages.map(message => {
			const contact = contacts.find(contact => {
				return contact._id === message.sender;
			});
			const username = (contact && contact.username) || message.sender;
			//console.log(username);
			const fromMe = id === message.sender;
			//console.log(fromMe);
			return { ...message, senderUsername: username, fromMe };
		});
		const selected = index === selectedConversationIndex;
		return { ...conversation, messages, recipients, selected };
	});

	const value = {
		conversations: formattedConversations,
		selectedConversation: formattedConversations[selectedConversationIndex],
		sendMessage,
		selectConversationIndex: setSelectedConversationIndex,
		dispatchCreateConversationAPI,
	};

	return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
}

function arrayEquality(a, b) {
	if (a.length !== b.length) return false;

	a.sort();
	b.sort();

	return a.every((element, index) => {
		return element === b[index];
	});
}
