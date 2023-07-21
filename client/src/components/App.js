// import { Routes, Route } from "react-router-dom";
// import { Login } from "./Login";
// import Signup from "./Signup";
// import Dashboard from "./Dashboard";
// import { ContactsProvider } from "../contexts/ContactsProvider";
// import useLocalStorage from "../hooks/useLocalStorage";
// import { ConversationsProvider } from "../contexts/ConversationsProvider";
// import SocketProvider from "../contexts/SocketProvider";

// function App() {
// 	const [username, setUsername] = useLocalStorage("username");
// 	const [id, setId] = useLocalStorage("id");

// 	const dashboard = (
// 		<SocketProvider id={id}>
// 			<ContactsProvider>
// 				<ConversationsProvider id={id}>
// 					<Dashboard username={username} id={id} />
// 				</ConversationsProvider>
// 			</ContactsProvider>
// 		</SocketProvider>
// 	);
// 	return id ? dashboard : <Login onUsernameSubmit={setUsername} onIdSubmit={setId} />;
// 	// <Routes>
// 	// 	{username}
// 	// 	{!id && <Route path='/' element={<Login onUsernameSubmit={setUsername} onIdSubmit={setId} />} />}
// 	// 	<Route path='/signup' element={<Signup />} />
// 	// 	<Route path='/home' element={dashboard} />
// 	// </Routes>
// }

// export default App;

import React from "react";
import Login from "./Login2";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";

function App() {
	const [id, setId] = useLocalStorage("id");

	const dashboard = (
		<SocketProvider id={id}>
			<ContactsProvider>
				<ConversationsProvider id={id}>
					<Dashboard id={id} />
				</ConversationsProvider>
			</ContactsProvider>
		</SocketProvider>
	);

	return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
