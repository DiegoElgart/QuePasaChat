import React, { useEffect, useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import NewContactModal from "./NewContactModal";
import NewConversationModal from "./NewConversationModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import { selectUser } from "../Redux/Slices/authSlice";

const CONVERSATIONS_KEY = "conversations";
const CONTACTS_KEY = "contacts";

export default function Sidebar({ id }) {
	const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
	const [modalOpen, setModalOpen] = useState(false);
	const [username, setUsername] = useState("");
	const conversationsOpen = activeKey === CONVERSATIONS_KEY;
	const { user } = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			setUsername(user.username);
		}
	}, []);
	function closeModal() {
		setModalOpen(false);
	}
	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<div style={{ width: "350px" }} className='d-flex flex-column'>
			<Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
				<Nav variant='tabs' className='justify-content-center'>
					<Nav.Item>
						<Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Button className='m-1' variant='dark' onClick={handleLogout}>
							Logout
						</Button>
					</Nav.Item>
				</Nav>
				<Tab.Content className='border-right overflow-auto flex-grow-1'>
					<Tab.Pane eventKey={CONVERSATIONS_KEY}>
						<Conversations />
					</Tab.Pane>
					<Tab.Pane eventKey={CONTACTS_KEY}>
						<Contacts />
					</Tab.Pane>
				</Tab.Content>
				<div className='p-2 border-top border-right '>
					You're : <span className='text-muted'>{username}</span>
				</div>
				<Button onClick={() => setModalOpen(true)} className='rounded-0'>
					New {conversationsOpen ? "Conversation" : "Contact"}
				</Button>
			</Tab.Container>

			<Modal show={modalOpen} onHide={closeModal}>
				{conversationsOpen ? <NewConversationModal closeModal={closeModal} /> : <NewContactModal closeModal={closeModal} />}
			</Modal>
		</div>
	);
}
