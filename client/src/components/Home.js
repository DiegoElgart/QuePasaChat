import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

const Home = ({ user }) => {
	const [message, setMessage] = useState("");
	const [messagedReceived, setMessagedReceived] = useState([]);
	const dispatch = useDispatch();
	const handleChange = e => {
		e.preventDefault();
		// setMessage(prevMsg => ({ ...prevMsg, [e.target.name]: e.target.value }));
		setMessage(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		socket.emit("send_message", { senderId: user._id, message: message });
		setMessage("");
	};

	useEffect(() => {
		socket.on("receive_message", data => {
			console.log(data);
			setMessagedReceived(data.message);
		});
	}, [socket]);

	return (
		<div className='container'>
			<Sidebar />
			<div className='main'>
				<div className='conversation'>
					<ul id='messages'>{messagedReceived}</ul>
				</div>
				<form className='dialog' onSubmit={handleSubmit}>
					<input type='textarea' className='textInput' name='message' onChange={handleChange} value={message} />
					<input type='submit' value='Send' className='primaryBtn sendBtn' />
				</form>
			</div>
		</div>
	);
};

export default Home;
