import React, { useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createChat } from "../Redux/Actions/chatActions";
import { selectChat } from "../Redux/Slices/chatSlice";
import { selectUser, selectUserContacts } from "../Redux/Slices/authSlice";
const ConversationModal = ({ setIsOpen, user }) => {
	const [selecetContactsIds, setSelectedContactsIds] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log(user.contacts);
	}, [user]);
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
		const userId = user._id;
		dispatch(createChat([selecetContactsIds]));
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

						<form className={styles.modalContent}>
							<ul>
								{user.contacts.map(contact => (
									<li style={{ listStyle: "none", fontSize: "large" }} key={contact._id}>
										<label>{contact.username}</label>
										<input type='checkbox' value={contact._id} onClick={() => handleCheckboxChange(contact._id)} />
									</li>
								))}
							</ul>
							<button type='submit' value='Create new conversation' className='primaryBtn' onClick={handleSubmit}>
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
