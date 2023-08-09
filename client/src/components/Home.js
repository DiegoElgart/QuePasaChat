import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
	const [message, setMessage] = useState({ message: "" });
	const dispatch = useDispatch();
	const handleChange = e => {
		e.preventDefault();
		setMessage(prevMsg => ({ ...prevMsg, [e.target.name]: e.target.value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
	};
	return (
		<div className='container'>
			<Sidebar />
			<div className='main'>
				<div className='conversation'>
					<p>chat goes here</p>
				</div>
				<form className='dialog'>
					<input type='textarea' className='textInput' name='message' onChange={handleChange} />
					<input type='submit' value='Send' className='sendButton' />
				</form>
			</div>
		</div>
	);
};

export default Home;
