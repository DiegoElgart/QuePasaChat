import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../Redux/Slices/authSlice";
import { addContactToUser } from "../Redux/Actions/userActions";

export default function NewContactModal({ closeModal }) {
	const [id, setId] = useState("");
	const [username, setUsername] = useState("");
	const users = useSelector(selectAllUsers);
	const currUser = localStorage.getItem("QuePasaChat-id");
	const dispatch = useDispatch();
	function handleSubmit(e) {
		e.preventDefault();

		dispatch(addContactToUser(id));
		closeModal();
	}
	const handleSelect = e => {
		e.preventDefault();
		const newContactId = e.target.value;
		const newContactObject = users.find(user => user._id === newContactId);
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
						{users.map(user =>
							user._id !== currUser ? (
								<option key={user._id} value={user._id}>
									{user.username}
								</option>
							) : null
						)}
					</Form.Select>
					<Button type='submit'>Create</Button>
				</Form>
			</Modal.Body>
		</>
	);
}
