import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='/home' element={<Home />} />
		</Routes>
	);
}

export default App;
