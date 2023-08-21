import "./App.css";
import Login from "./components/Login";
import { SocketProvider } from "./context/SocketProvider";
import { ConversationsProvider } from "./context/ConversationProvider";
import Dashboard from "./components/Dashboard";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch } from "react-redux";

function App() {
	const [id, setId] = useLocalStorage("id");

	const dashboard = (
		<SocketProvider id={id}>
			<ConversationsProvider>
				<Dashboard />
			</ConversationsProvider>
		</SocketProvider>
	);

	return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
