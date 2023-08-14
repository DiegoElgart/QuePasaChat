import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import { useEffect } from "react";

import { getAllUsers } from "./Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./Redux/Slices/authSlice";

function App() {
	const { user } = useSelector(selectUser);
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/home' element={<Home user={user} />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
}

export default App;
