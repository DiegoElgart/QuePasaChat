import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectUserContacts } from "../Redux/Slices/authSlice";
import { blockUnblockContact } from "../Redux/Actions/userActions";

export default function Contacts() {
	const dispatch = useDispatch();
	const contacts = useSelector(selectUserContacts);
	console.log(contacts);
	const handleBlock = (e, contact) => {
		e.preventDefault();
		console.log(contact._id);
		dispatch(blockUnblockContact(contact._id));
	};

	return (
		<ListGroup variant='flush'>
			{contacts.map(contact => (
				<ListGroup.Item key={contact.contactId._id} className='d-flex justify-content-between'>
					{contact.contactId.username}
					<Button variant='outline-danger' size='sm' onClick={e => handleBlock(e, contact)}>
						Block
					</Button>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}
