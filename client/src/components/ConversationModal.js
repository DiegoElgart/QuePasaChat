import React, { useState } from "react";
import styles from "../styles/Modal.module.css";
import { useConversations } from "../context/ConversationProvider";
import { useDispatch } from "react-redux";
import { createChat } from "../Redux/Actions/chatActions";
const ConversationModal = ({ setIsOpen, user }) => {
	const [selecetContactsIds, setSelectedContactsIds] = useState([]);
	const dispatch = useDispatch();
	// const { createConversation } = useConversations();

	const handleCheckboxChange = contactId => {
		setSelectedContactsIds(prevSelecetedContactsIds => {
			if (prevSelecetedContactsIds.includes(contactId)) {
				return prevSelecetedContactsIds.filter(prevId => {
					return contactId !== prevId;
				});
			} else {
				return [...prevSelecetedContactsIds, contactId];
			}
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// createConversation(selecetContactsIds);
		//console.log(selecetContactsIds, user._id);
		dispatch(createChat(selecetContactsIds, user._id));
		setIsOpen(false);
	};

	return (
		<>
			<div className={styles.darkBG}>
				<div className={styles.centered}>
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<h5 className={styles.heading}>Add New Contact</h5>
						</div>

						<form className={styles.modalContent} onSubmit={handleSubmit}>
							<ul>
								{user.contacts.map(contact => (
									<li style={{ listStyle: "none", fontSize: "large" }} key={contact._id}>
										<label>{contact.username}</label>
										<input type='checkbox' value={contact._id} onClick={() => handleCheckboxChange(contact._id)} />
									</li>
								))}
							</ul>
							<button type='submit' value='Create new conversation' className='primaryBtn'>
								Create
							</button>
							<button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
								Cancel
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ConversationModal;
