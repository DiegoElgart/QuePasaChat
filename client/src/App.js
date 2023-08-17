import "./App.css";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { ContactsProvider } from "./context/ContactsProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./Redux/Slices/authSlice";
import { useEffect } from "react";
import { getAllConversationsAPI } from "./Redux/Actions/chatActions";

function App() {
	const [id, setId] = useLocalStorage("id");
	const dispatch = useDispatch();
	const { user } = useSelector(selectUser);

	useEffect(() => {
		dispatch(getAllConversationsAPI());
	}, []);

	const dashboard = (
		<SocketProvider id={id}>
			<ConversationsProvider>
				<ContactsProvider id={id}>
					<Dashboard />
				</ContactsProvider>
			</ConversationsProvider>
		</SocketProvider>
	);

	return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
