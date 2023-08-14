import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export const setSocket = socket => {
	return { type: "SET_SOCKET", payload: socket };
};

