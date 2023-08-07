import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authLogin } from "../Redux/Auth/authAction";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { user, error } = useSelector(store => store.user);
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
		if (user._id && error === false) {
			naviage("/home");
		} else if (error === true) {
			alert("Wrong Password or Email");
		}
	}, [user, error]);

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(authLogin(loginData));
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
			</form>
		</div>
	);
};

export default Login;
