import React, { useEffect } from "react";
import Login from "./Login";
import useLocalStorage from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationProvider";
import { SocketProvider } from "../context/SocketProvider";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/authSlice";

function App() {
	const id = localStorage.getItem("QuePasaChat-id");
	const { user } = useSelector(selectUser);

	const dashboard = (
		<SocketProvider id={id}>
			<ContactsProvider>
				<ConversationsProvider id={id}>
					<Dashboard id={id} />
				</ConversationsProvider>
			</ContactsProvider>
		</SocketProvider>
	);

	return user ? dashboard : <Login />;
}

export default App;
