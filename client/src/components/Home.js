import { useState } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";

const Home = ({ socket }) => {
	console.log(socket);
	const [message, setMessage] = useState("");
	const dispatch = useDispatch();

	const handleChange = e => {
		e.preventDefault();
		//setMessage(prevMsg => ({ ...prevMsg, [e.target.name]: e.target.value }));
		setMessage(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		socket.emit("new message", message);
		setMessage("");
	};
	//var messages = document.getElementById("messages");
	socket.on("message recieved", function (msg) {
		console.log(msg);
		// var item = document.createElement("li");
		// item.textContent = msg;
		// messages.appendChild(item);
		// window.scrollTo(0, document.body.scrollHeight);
	});
	return (
		<div className='container'>
			<Sidebar />
			<div className='main'>
				<div className='conversation'>
					<ul id='messages'></ul>
				</div>
				<form className='dialog' onSubmit={handleSubmit}>
					<input type='textarea' className='textInput' name='message' onChange={handleChange} value={message} />
					<input type='submit' value='Send' className='sendButton' />
				</form>
			</div>
		</div>
	);
};

export default Home;
