import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router";
import { selectUser } from "../Redux/Slices/authSlice";
import { useState } from "react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Groups from "./Groups";
import ContactModal from "./ContactModal";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector(selectUser);
	const handleLogout = () => {
		dispatch(logout());
		navigate("/");
	};

	const [activeKey, setActiveKey] = useState("Conversation");
	const [isOpen, setIsOpen] = useState(false);

	const handleContext = e => {
		e.preventDefault();
		setActiveKey(e.target.id);
	};
	return (
		<div style={{ height: "100vh" }}>
			{/* <span className='username'>Hi, {user.username}</span> */}
			<ul className='sidebar '>
				<li className='sidebarItem' id='Contact' onClick={handleContext}>
					Contacts
				</li>
				<li className='sidebarItem' id='Group' onClick={handleContext}>
					Groups
				</li>
				<li className='sidebarItem ' id='Conversation' onClick={handleContext}>
					Conversation
				</li>
				<li className='sidebarItem logout' onClick={handleLogout}>
					Logout
				</li>
			</ul>
			<div className='content'>
				{activeKey === "Conversation" ? <Conversations /> : null}
				{activeKey === "Contact" ? <Contacts /> : null}
				{activeKey === "Group" ? <Groups /> : null}
			</div>
			<button className='primaryBtn' onClick={() => setIsOpen(true)}>
				New {activeKey}
			</button>
			{isOpen && <ContactModal setIsOpen={setIsOpen} />}
		</div>
	);
};

export default Sidebar;
