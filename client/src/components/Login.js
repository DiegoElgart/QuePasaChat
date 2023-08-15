import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";

import { login } from "../Redux/Actions/userActions";
import { selectUser, selectUserError, selectUserStatus } from "../Redux/Slices/authSlice";
import Register from "./Register";

const Login = ({ onIdSubmit }) => {
	const user = useSelector(selectUser);
	const error = useSelector(selectUserError);
	const status = useSelector(selectUserStatus);
	const [loginData, setLoginData] = useState({ email: "", password: "" });
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const handleChange = e => {
		setLoginData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (user && error === false && status === "succeeded") {
			//const id = user.user._id;
			//onIdSubmit(id);
		} else if (error) {
			alert("Wrong Password or Email");
		}
	}, [user, error]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(login(loginData));
	};
	return (
		<Container className='align-items-center d-flex' style={{ height: "100vh" }}>
			{!isOpen && (
				<Form onSubmit={handleSubmit} className='w-100'>
					<Form.Group className='w-50'>
						<Form.Label>Enter Your Email</Form.Label>
						<Form.Control type='text' name='email' required onChange={handleChange} />
						<Form.Label>Enter Your Password</Form.Label>
						<Form.Control type='password' required name='password' onChange={handleChange} />
					</Form.Group>
					<Button type='submit' className='mr-2'>
						Login
					</Button>
					<Button onClick={() => setIsOpen(!isOpen)} variant='secondary'>
						Create A New Id
					</Button>
				</Form>
			)}
			{isOpen && <Register onIdSubmit={onIdSubmit} setIsOpen={setIsOpen} />}
		</Container>
	);
};

export default Login;
