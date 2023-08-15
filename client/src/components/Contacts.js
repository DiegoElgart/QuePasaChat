import { useContacts } from "../context/ContactsProvider";
const Contacts = () => {
	const { contacts } = useContacts();
	return (
		<>
			<ul>
				{contacts.map(contact => (
					<li style={{ listStyle: "none", fontSize: "large" }} key={contact._id}>
						{contact.username}
					</li>
				))}
			</ul>
		</>
	);
};

export default Contacts;
