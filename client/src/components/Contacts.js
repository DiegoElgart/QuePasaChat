import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/authSlice";

const Contacts = () => {
	const { user } = useSelector(selectUser);

	return (
		<>
			<ul>
				{user.contacts.map(contact => (
					<li style={{ listStyle: "none", fontSize: "large" }} key={contact._id}>
						{contact.username}
					</li>
				))}
			</ul>
		</>
	);
};

export default Contacts;
