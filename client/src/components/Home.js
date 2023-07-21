import React from "react";
import Sidebar from "./Sidebar";

const Home = ({ username }) => {
	return (
		<div className='d-flex' style={{ height: "100vh" }}>
			<Sidebar username={username} />
		</div>
	);
};

export default Home;
