import React from "react";
import { useContacts } from "../contexts/ContactsProvider";
import { ListGroup } from "react-bootstrap";

const Contacts = () => {
	const { contacts } = useContacts();
	console.log(contacts);
	return (
		<ListGroup variant='flush'>
			{contacts.map((contact, index) => (
				<ListGroup.Item key={index}>{contact.username}</ListGroup.Item>
			))}
		</ListGroup>
	);
};

export default Contacts;
