import React, { useEffect } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
// import { ContactsProvider } from "../context/ContactsProvider";
import { ConversationsProvider } from "../context/ConversationProvider";
import { SocketProvider } from "../context/SocketProvider";
import { useDispatch, useSelector } from "react-redux";
import { selectUserStatus } from "../Redux/Slices/authSlice";
import { getAllUsers } from "../Redux/Actions/userActions";

function App() {
	const id = localStorage.getItem("QuePasaChat-id");
	const status = useSelector(selectUserStatus);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllUsers());
	}, []);
	const dashboard = (
		<SocketProvider id={id}>
			{/* <ContactsProvider> */}
			<ConversationsProvider id={id}>
				<Dashboard id={id} />
			</ConversationsProvider>
			{/* </ContactsProvider> */}
		</SocketProvider>
	);

	return status === "succeeded" ? dashboard : <Login />;
}

export default App;
