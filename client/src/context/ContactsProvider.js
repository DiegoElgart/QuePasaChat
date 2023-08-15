import React, { useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { addContactToUser } from "../Redux/Actions/userActions";
import { selectUser } from "../Redux/Slices/authSlice";
import { useEffect } from "react";
import { getAllUsers } from "../Redux/Actions/userActions";
const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
	const dispatch = useDispatch();
	const { user } = useSelector(selectUser);
	const [contacts, setContacts] = useState(user.contacts);
	useEffect(() => {
		dispatch(getAllUsers());
	}, []);

	function createContact(id, username) {
		setContacts(prevContacts => {
			return [...prevContacts, { id, username }];
		});

		dispatch(addContactToUser({ id: user._id, contactId: id }));
	}

	return <ContactsContext.Provider value={{ createContact }}>{children}</ContactsContext.Provider>;
}
