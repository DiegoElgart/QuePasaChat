import { Login } from "./Login";
import { useState } from "react";

function App() {
	const [username, setUsername] = useState();
	return (
		<>
			{username}
			<Login onUsernameSubmit={setUsername} />
		</>
	);
}

export default App;
