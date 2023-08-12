import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserError, selectUserStatus } from "../Redux/Slices/authSlice";

const Login = () => {
	const user = useSelector(selectUser);
	const error = useSelector(selectUserError);
	const status = useSelector(selectUserStatus);
	const [loginData, setLoginData] = useState({ email: "", password: "" });

	const dispatch = useDispatch();
	const naviage = useNavigate();

	const handleChange = e => {
		setLoginData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		if (user && error === false && status === "succeeded") {
			naviage("/home");
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
			<form className='login' onSubmit={handleSubmit}>
				<label>Email</label>
				<input type='text' name='email' onChange={handleChange} />
				<br />
				<label>Password</label>
				<input type='password' name='password' onChange={handleChange} />
				<br />
				<input type='submit' value='Login' />
				<br />
				<a href='/register'>New? Sign Up here!</a>
			</form>
		</div>
	);
};

export default Login;
