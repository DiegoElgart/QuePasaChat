import "../App.css";
import styles from "../styles/Modal.module.css";
import { Container, Form, Button, Alert } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserError } from "../Redux/Slices/authSlice";
import { register } from "../Redux/Actions/userActions";

const Register = ({ setIsOpen, onIdSubmit }) => {
	const user = useSelector(selectUser);
	const error = useSelector(selectUserError);
	const [registerData, setregisterData] = useState({ username: "", email: "", password: "" });

	const dispatch = useDispatch();

	const handleChange = e => {
		setregisterData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (user && error === false) {
		} else if (error) {
			alert("email already registered!");
		}
	}, [user, error]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(register(registerData));
		alert("Congratulations!");
		setIsOpen(false);
	};
	return (
		<Container className='align-items-center justify-content-center d-flex'>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Username</Form.Label>
					<Form.Control type='text' name='username' onChange={handleChange} />

					<Form.Label>Email</Form.Label>
					<Form.Control type='text' name='email' onChange={handleChange} />

					<Form.Label>Password</Form.Label>
					<Form.Control type='password' name='password' onChange={handleChange} />
				</Form.Group>
				<Button className={styles.deleteBtn} type='submit'>
					Sign Up
				</Button>
				<Button className={styles.cancelBtn} onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
			</Form>
		</Container>
	);
};

export default Register;
