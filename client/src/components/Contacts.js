const Contacts = ({ user }) => {
	return (
		<>
			<ul>
				{user &&
					user.contacts.map(contact => (
						<li style={{ listStyle: "none", fontSize: "large" }} key={contact._id}>
							{contact.username}
						</li>
					))}
			</ul>
		</>
	);
};

export default Contacts;
