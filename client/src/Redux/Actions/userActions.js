import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const updateUser = createAsyncThunk("user/update", async request => {
	const response = await axios.post(`${AUTH_URL}/${request.id}/contacts`, { contactId: request.contactId });
	return response.data;
});
