import { useState } from "react";
import styles from "../styles/Modal.module.css";
const ContactModal = ({ setIsOpen }) => {
	const [contactData, setContactData] = useState({ email: "", username: "" });

	const handleChange = e => {
		e.preventDefault();
		setContactData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			<div className={styles.darkBG}>
				<div className={styles.centered}>
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<h5 className={styles.heading}>Create New Contact</h5>
						</div>
						<button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
							x
						</button>
						<form className={styles.modalContent}>
							<label>Email</label>
							<input type='text' name='email' onChange={handleChange} />
							<label>Username</label>
							<input type='text' name='username' onChange={handleChange} />
							<button className={styles.cancelBtn}>Cancel</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactModal;
