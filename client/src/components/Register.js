import "../App.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserError } from "../Redux/Slices/authSlice";
import { register } from "../Redux/Actions/userActions";

const Register = () => {
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
	};
	return (
		<div className='formContainer'>
			<form className='login' onSubmit={handleSubmit}>
				<label>Username</label>
				<input type='text' name='username' onChange={handleChange} />
				<br />
				<label>Email</label>
				<input type='text' name='email' onChange={handleChange} />
				<br />
				<label>Password</label>
				<input type='password' name='password' onChange={handleChange} />
				<br />
				<input type='submit' value='Sign Up' />
				<br />
				<a href='/'>Login</a>
			</form>
		</div>
	);
};

export default Register;
