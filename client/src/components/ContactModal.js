import { useEffect, useState } from "react";
import styles from "../styles/Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers, selectUser } from "../Redux/Slices/authSlice";
import { useContacts } from "../context/ContactsProvider";
const ContactModal = ({ setIsOpen }) => {
	const dispatch = useDispatch();
	const [contactId, setContactId] = useState("");
	const [usersList, setUsersList] = useState([]);
	const users = useSelector(selectAllUsers);
	const { user } = useSelector(selectUser);
	const { createContact } = useContacts();
	useEffect(() => {
		const filteredUsers = users.filter(fUser => fUser._id !== user._id);
		setUsersList(filteredUsers);
	}, [users, user]);

	const handleSelect = e => {
		e.preventDefault();
		setContactId(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const request = { id: user._id, contactId: contactId };
		//dispatch(updateUser(request));
		createContact(request);
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
							<br />
							<label>By Email</label>
							<select onChange={handleSelect}>
								<option>---------------</option>
								{usersList.map(user => (
									<option key={user._id} value={user._id}>
										{user.email}
									</option>
								))}
							</select>
							<br />
							<br />

							<button className={styles.deleteBtn}>Add Contact</button>

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

export default ContactModal;
