import { Routes, Route } from "react-router-dom";
import { Login } from "./Login";
import { useState } from "react";
import Signup from "./Signup";

function App() {
	const [username, setUsername] = useState();
	return (
		<Routes>
			{username}
			<Route path='/' element={<Login onUsernameSubmit={setUsername} />} />
			<Route path='/signup' element={<Signup />} />
		</Routes>
	);
}

export default App;
