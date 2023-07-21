import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";

export default function NewContactModal({ closeModal }) {
	const idRef = useRef();
	const userameRef = useRef();
	const { createContact } = useContacts();

	function handleSubmit(e) {
		e.preventDefault();

		createContact(idRef.current.value, userameRef.current.value);
		closeModal();
	}

	return (
		<>
			<Modal.Header closeButton>Create Contact</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Id</Form.Label>
						<Form.Control type='text' ref={idRef} required />
					</Form.Group>
					<Form.Group>
						<Form.Label>Username</Form.Label>
						<Form.Control type='text' ref={userameRef} required />
					</Form.Group>
					<Button className='mt-4' type='submit'>
						Create
					</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
