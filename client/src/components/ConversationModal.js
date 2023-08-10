import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/authSlice";

const ConversationModal = () => {
	const { user } = useSelector(selectUser);
	return (
		<>
			<form></form>
		</>
	);
};

export default ConversationModal;
