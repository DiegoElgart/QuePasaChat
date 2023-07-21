import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { useState } from "react";
import Signup from "./Signup";
import Home from "./Home";
import { ContactsProvider } from "../contexts/ContactsProvider";

function App() {
	const [username, setUsername] = useState();
	const dashboard = (
		<ContactsProvider>
			<Home username={username} />
		</ContactsProvider>
	);
	return (
		<Routes>
			{username}
			<Route path='/' element={<Login onUsernameSubmit={setUsername} />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/home' element={dashboard} />
		</Routes>
	);
}

export default App;
