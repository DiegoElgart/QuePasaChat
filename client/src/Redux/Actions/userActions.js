import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../Slices/authSlice";
const AUTH_URL = "http://localhost:4000/auth";

export const login = createAsyncThunk("auth/login", async loginData => {
	const response = await axios.post(`${AUTH_URL}/login`, loginData);
	localStorage.setItem("accessToken", response.data.token);
	localStorage.setItem("QuePasaChat-id", response.data.user._id);

	return response.data;
});

export const register = createAsyncThunk("users/register", async newUser => {
	const response = await axios.post(`${AUTH_URL}/register`, newUser);
	localStorage.setItem("accessToken", response.data.token);
	localStorage.setItem("QuePasaChat-id", response.data.user._id);
	return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
	localStorage.clear();
});

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
	const response = await axios.get(`${AUTH_URL}/users`);
	return response.data;
});

export const addContactToUser = createAsyncThunk("user/update", async contactId => {
	const currId = localStorage.getItem("QuePasaChat-id");
	const response = await axios.post(`${AUTH_URL}/${currId}/contacts`, { contactId });
	return response.data;
});

export const blockUnblockContact = createAsyncThunk("user/blockUnblockContact", async contactId => {
	const currId = localStorage.getItem("QuePasaChat-id");

	const response = await axios.post(`${AUTH_URL}/blockContact/${currId}`, { contactId: contactId });
	return response.data;
});
