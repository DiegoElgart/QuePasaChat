import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export const Login = ({ onUsernameSubmit, onIdSubmit }) => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ username: "", password: "", id: "" });
	const [alert, setAlert] = useState(false);

	const handleChange = e => {
		setLoginData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const result = await axios.post(`http://localhost:4000/auth/login`, loginData);
			localStorage.setItem("accessToken", result.data.accessToken);
			onIdSubmit(result.data.id);
			onUsernameSubmit(result.data.username);
			if (result.status === 200) {
				navigate("/home");
			}
		} catch (error) {
			setAlert(!alert);
		}
	};
	useLocalStorage("username", loginData.username);
	useLocalStorage("id", loginData.id);
	return (
		<Container className='align-items-center d-flex' style={{ height: "100vh" }}>
			<Form className='w-25' onSubmit={handleSubmit}>
				{alert ? <Alert variant='danger'>Wrong username or password</Alert> : null}
				<Form.Group>
					<Form.Label>Enter your username</Form.Label>
					<Form.Control type='text' name='username' required onChange={handleChange} />
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' name='password' required onChange={handleChange} />
				</Form.Group>
				<Button type='submit' className='m-2'>
					Login
				</Button>
				<Button variant='secondary' onClick={() => navigate("/signup")}>
					Sign Up
				</Button>
			</Form>
		</Container>
	);
};

export default Login;
