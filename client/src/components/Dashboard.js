import React from "react";
import Sidebar from "./Sidebar";

const Dashboard = ({ username }) => {
	return (
		<div>
			<Sidebar username={username} />
		</div>
	);
};

export default Dashboard;
