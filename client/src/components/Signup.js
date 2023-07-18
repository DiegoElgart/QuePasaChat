import React, { useState } from "react";
import { Container, Form, Button, ModalTitle } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState({ username: "", password: "" });

	const handleChange = e => {
		setLoginData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const result = await axios.post(`http://localhost:4000/auth/signup`, loginData);
			if (result.status === 200) {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container className='align-items-center d-flex' style={{ height: "100vh" }}>
			<Form className='w-25' onSubmit={handleSubmit}>
				<Form.Group>
					<ModalTitle>Sign Up</ModalTitle>
					<Form.Label>Enter your username</Form.Label>
					<Form.Control type='text' name='username' required onChange={handleChange} />
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' name='password' required onChange={handleChange} />
				</Form.Group>
				<Button type='submit' className='m-2'>
					Register !
				</Button>
				<Button variant='secondary' onClick={() => navigate(-1)}>
					Cancel
				</Button>
			</Form>
		</Container>
	);
};

export default Signup;
