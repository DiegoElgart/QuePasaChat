import "./App.css";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";
import { useSelector } from "react-redux";
import { selectUser } from "./Redux/Slices/authSlice";
import { useEffect, useState } from "react";
function App() {
	const [id, setId] = useLocalStorage("id");

	const { user } = useSelector(selectUser);
	// useEffect(() => {
	// 	if (user) {
	// 		setId(user._id);
	// 	}
	// }, [user]);

	const dashboard = (
		<SocketProvider id={id}>
			{/* <ConversationsProvider> */}
			<ContactsProvider id={id}>
				<Dashboard />
			</ContactsProvider>
			{/* </ConversationsProvider> */}
		</SocketProvider>
	);

	return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
