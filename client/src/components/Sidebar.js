import { useDispatch } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { useNavigate } from "react-router";

const Sidebar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLogout = () => {
		dispatch(logout);
		navigate("/");
	};
	return (
		<>
			<ul className='sidebar'>
				<span>Hi, username</span>
				<li className='sidebarItem'>Contacts</li>
				<li className='sidebarItem'>Groups</li>
				<li className='sidebarItem'>Chat</li>
				<li className='sidebarItem logout' onClick={handleLogout}>
					Logout
				</li>
			</ul>
		</>
	);
};

export default Sidebar;
