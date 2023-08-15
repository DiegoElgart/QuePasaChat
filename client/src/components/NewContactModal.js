import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../context/ContactsProvider";
import { useSelector } from "react-redux";
import { selectAllUsers, selectUserContacts } from "../Redux/Slices/authSlice";

export default function NewContactModal({ closeModal }) {
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const contacts = useSelector(selectAllUsers);
	const { createContact } = useContacts();
	function handleSubmit(e) {
		e.preventDefault();

		createContact(id, username);
		closeModal();
	}
	const handleSelect = e => {
		e.preventDefault();
		const newContactId = e.target.value;
		const newContactObject = contacts.find(c => c._id === newContactId);
		const newContactUsername = Object.values(newContactObject)[1];
		setId(newContactId);
		setUsername(newContactUsername);
	};
	return (
		<>
			<Modal.Header closeButton>Create Contact</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit} className='p-3'>
					<Form.Select onChange={handleSelect} className='m-3'>
						<option>--------------</option>
						{contacts.map(contact => (
							<option key={contact._id} value={contact._id}>
								{contact.username}
							</option>
						))}
					</Form.Select>
					<Button type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
