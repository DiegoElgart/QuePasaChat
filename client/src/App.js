import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { io } from "socket.io-client";

function App() {
	const socket = io("http://localhost:4000");

	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/home' element={<Home socket={socket} />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}

export default App;
