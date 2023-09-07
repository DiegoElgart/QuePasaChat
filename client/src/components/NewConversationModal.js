import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectUserContacts } from "../Redux/Slices/authSlice";

export default function NewConversationModal({ closeModal }) {
	const [selectedContactIds, setSelectedContactIds] = useState([]);
	const { user } = useSelector(selectUser);
	const contacts = useSelector(selectUserContacts);
	const { dispatchCreateConversationAPI } = useConversations();
	function handleSubmit(e) {
		e.preventDefault();
		dispatchCreateConversationAPI(selectedContactIds);

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
					{contacts.map(contact => (
						<Form.Group controlId={contact.contactId._id} key={contact.contactId._id}>
							<Form.Check
								type='checkbox'
								value={selectedContactIds.includes(contact.contactId._id)}
								label={contact.contactId.username}
								onChange={() => handleCheckboxChange(contact.contactId._id)}
							/>
						</Form.Group>
					))}
					<Button type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
