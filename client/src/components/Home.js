import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";

export const Home = () => {
	const { user, loading, error } = useSelector(store => store.user);
	const { chat } = useSelector(store => store.chat);

	if (!user._id) {
	}

	return (
		<div className='home-cont'>
			<SideNavbar />
			{/* {chat._id ? <br /> : <MessageStarter {...user} />} */}
		</div>
	);
};

const MessageStarter = ({ username }) => {
	return (
		<div>
			<div>
				<Avatar sx={{ width: 70, height: 70 }} />
				<h3>Welcome, {username}</h3>
				<p>Please select a chat to start messaging.</p>
			</div>
		</div>
	);
};
