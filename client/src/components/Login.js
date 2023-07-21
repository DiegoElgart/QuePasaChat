import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = ({ onUsernameSubmit }) => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ username: "", password: "" });
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
			onUsernameSubmit(result.data.username);
			if (result.status === 200) {
				navigate("/home");
			}
		} catch (error) {
			//alert("Wrong username or password");
			setAlert(!alert);
			//console.log(error);
		}
	};
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
