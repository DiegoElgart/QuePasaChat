import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../context/ConversationProvider";

export default function OpenConversation() {
	const [text, setText] = useState("");
	const id = localStorage.getItem("QuePasaChat-id");
	const setRef = useCallback(node => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);
	const { sendMessage, selectedConversation } = useConversations();
	function handleSubmit(e) {
		e.preventDefault();
		//console.log(selectedConversation);
		sendMessage(
			//selectedConversation.recipients.map(r => r._id),
			selectedConversation.recipients,
			text,
			selectedConversation._id
		);
		setText("");
	}

	return (
		<div className='d-flex flex-column flex-grow-1'>
			<div className='flex-grow-1 overflow-auto'>
				<div className='d-flex flex-column align-items-start justify-content-end px-3'>
					{selectedConversation.messages.map((message, index) => {
						//console.log(message);
						const lastMessage = selectedConversation.messages.length - 1 === index;
						return (
							<div ref={lastMessage ? setRef : null} key={index} className={`my-1 d-flex flex-column ${message.sender === id ? "align-self-end align-items-end" : "align-items-start"}`}>
								<div className={`rounded px-2 py-1 ${message.sender === id ? "bg-primary text-white" : "border"}`}>{message.text}</div>
								<div className={`text-muted small ${message.sender === id ? "text-right" : ""}`}>{message.sender === id ? "You" : message.senderUsername}</div>
							</div>
						);
					})}
				</div>
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='m-2'>
					<InputGroup>
						<Form.Control as='textarea' required value={text} onChange={e => setText(e.target.value)} style={{ height: "75px", resize: "none" }} />

						<Button type='submit'>Send</Button>
					</InputGroup>
				</Form.Group>
			</Form>
		</div>
	);
}
