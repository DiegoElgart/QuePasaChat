import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { addContactToUser } from "../Redux/Actions/userActions";

const ContactsContext = React.createContext();

export function useContacts() {
	return useContext(ContactsContext);
}

export function ContactsProvider({ children }) {
	const dispatch = useDispatch();

	function createContact(id) {
		dispatch(addContactToUser(id));
	}

	return <ContactsContext.Provider value={{ createContact }}>{children}</ContactsContext.Provider>;
}
