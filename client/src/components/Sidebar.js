const Sidebar = () => {
	return (
		<>
			<ul className='sidebar'>
				<span>Hi, username</span>
				<li className='sidebarItem'>Contacts</li>
				<li className='sidebarItem'>Groups</li>
				<li className='sidebarItem'>Chat</li>
				<li className='sidebarItem logout'>Logout</li>
			</ul>
		</>
	);
};

export default Sidebar;
