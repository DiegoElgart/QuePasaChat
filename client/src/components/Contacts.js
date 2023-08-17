import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser, selectUserContacts } from "../Redux/Slices/authSlice";

export default function Contacts() {
	const { user } = useSelector(selectUser);
	const contacts = useSelector(selectUserContacts);


	return (
		<ListGroup variant='flush'>
			{contacts.map(contact => (
				<ListGroup.Item key={contact._id}>{contact.username}</ListGroup.Item>
			))}
		</ListGroup>
	);
}
