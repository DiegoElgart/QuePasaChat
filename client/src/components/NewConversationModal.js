import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useConversations } from "../context/ConversationProvider";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/authSlice";

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([]);
	const { user } = useSelector(selectUser);
	const { createConversation } = useConversations();

	function handleSubmit(e) {
		e.preventDefault();

		createConversation(selectedContactIds);
		closeModal();
	}

	function handleCheckboxChange(contactId) {
		setSelectedContactIds(prevSelectedContactIds => {
			if (prevSelectedContactIds.includes(contactId)) {
				return prevSelectedContactIds.filter(prevId => {
					return contactId !== prevId;
				});
			} else {
				return [...prevSelectedContactIds, contactId];
			}
		});
	}

	return (
		<>
			<Modal.Header closeButton>Create Conversation</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{user.contacts.map(contact => (
						<Form.Group controlId={contact._id} key={contact._id}>
							<Form.Check type='checkbox' value={selectedContactIds.includes(contact._id)} label={contact.username} onChange={() => handleCheckboxChange(contact._id)} />
						</Form.Group>
					))}
					<Button type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
