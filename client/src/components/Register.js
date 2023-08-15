import "../App.css";
import styles from "../styles/Modal.module.css";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserError } from "../Redux/Slices/authSlice";
import { register } from "../Redux/Actions/userActions";

const Register = ({ setIsOpen }) => {
	const user = useSelector(selectUser);
	const error = useSelector(selectUserError);
	const [registerData, setregisterData] = useState({ username: "", email: "", password: "" });

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = e => {
		setregisterData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (user && error === false) {
			navigate("/home");
		} else if (error) {
			alert("email already registered!");
		}
	}, [user, error]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(register(registerData));
		setIsOpen(false);
	};
	return (
		<>
			<div className={styles.darkBG}>
				<div className={styles.centered}>
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<h5 className={styles.heading}>Register</h5>
						</div>
						<form className={styles.modalContent} onSubmit={handleSubmit}>
							<label>Username</label>
							<input type='text' name='username' onChange={handleChange} />
							<br />
							<label>Email</label>
							<input type='text' name='email' onChange={handleChange} />
							<br />
							<label>Password</label>
							<input type='password' name='password' onChange={handleChange} />
							<br />
							<button className={styles.deleteBtn} type='submit'>
								Sign Up
							</button>
							<button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
								Cancel
							</button>
							<br />
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
