import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Avatar, Badge } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { accessChat, makeRecentChatApi } from "../Redux/RecentChat/recentChatAction";
import { selectChat } from "../Redux/Chat/chatAction";
import { removeSeenMsg } from "../Redux/Notification/notificationAction";
import { makeSearchApi } from "../Redux/Search/searchAction";

export const MyChat = () => {
	const [search, setSearch] = useState(false);

	const { search_result, loading, error } = useSelector(store => store.search);
	const { recent_chat, loading: chat_loading } = useSelector(store => store.recentChat);
	const { user, token } = useSelector(store => store.user);
	const { chat } = useSelector(store => store.chat);

	const dispatch = useDispatch();

	useEffect(() => {
		if (token) dispatch(makeRecentChatApi(token));
	}, [user]);

	const ref = useRef();
	const handleQuery = e => {
		if (!e.target.value) {
			setSearch(false);
			return;
		}
		if (ref.current) clearTimeout(ref.current);
		setSearch(true);
		ref.current = setTimeout(() => {
			dispatch(makeSearchApi(e.target.value));
		}, 1000);
	};
	return (
		<div className='mychat-cont'>
			<div>
				<div className='notification'>
					<h2>Chats</h2>
					{/* <NotificationsIcon /> */}
					<Badge badgeContent={notification} color='error'>
						<Notificationcomp />
					</Badge>
					{/* <AddIcon /> */}
				</div>
				<div className='search-cont'>
					<SearchIcon />
					<input onChange={handleQuery()} type='text' placeholder='Search users' />
				</div>
			</div>
			<div className='recent-chat'>
				<p className='Recent'>Recent</p>
				<div className='recent-user'>
					{search
						? search_result.map(el => <SearchUserComp key={el._id} {...el} token={token} recent_chat={recent_chat} setSearch={setSearch} />)
						: !chat_loading && recent_chat.map((el, index) => <ChatUserComp key={el._id} {...el} index={index} chattingwith={chat._id} id={user._id} />)}
				</div>
			</div>
		</div>
	);
};
