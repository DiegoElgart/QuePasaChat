import React from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/authSlice";

export default function Contacts() {
	const { user } = useSelector(selectUser);

	return (
		<ListGroup variant='flush'>
			{user.contacts.map(contact => (
				<ListGroup.Item key={contact._id}>{contact.username}</ListGroup.Item>
			))}
		</ListGroup>
	);
}
