import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
			const id = user.user._id;
			onIdSubmit(id);
		} else if (error) {
			alert("Wrong Password or Email");
		}
	}, [user, error]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(login(loginData));
	};
	return (
		<div className='formContainer'>
			{!isOpen && (
				<form className='login' onSubmit={handleSubmit}>
					<label>Email</label>
					<input type='text' name='email' onChange={handleChange} required />
					<br />
					<label>Password</label>
					<input type='password' name='password' onChange={handleChange} required />
					<br />
					<button type='submit'>Login</button>
					<br />
					<button onClick={() => setIsOpen(!isOpen)}>New? Sign Up here!</button>
				</form>
			)}
			{isOpen && <Register setIsOpen={setIsOpen} />}
		</div>
	);
};

export default Login;
