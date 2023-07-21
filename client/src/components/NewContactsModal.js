import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

const NewContactsModal = ({ closeModal }) => {
	const [username, setUsername] = useState();
	const { createContact } = useContacts();
	const handleSubmit = e => {
		e.preventDefault();
		createContact(username);
		closeModal();
	};
	const handleChange = e => {
		e.preventDefault();
		setUsername(e.target.value);
	};

	return (
		<>
			<Modal.Header closeButton>Create Contact</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control type='text' name='username' required onChange={handleChange} />
					</Form.Group>
					<Button type='submit' className='mt-4'>
						Search Contact
					</Button>
				</Form>
			</Modal.Body>
		</>
	);
};

export default NewContactsModal;
