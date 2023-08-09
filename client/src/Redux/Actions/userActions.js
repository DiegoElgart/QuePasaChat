import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:4000/auth";

export const login = createAsyncThunk("auth/login", async loginData => {
	const response = await axios.post(`${AUTH_URL}/login`, loginData);
	localStorage.setItem("accessToken", response.data.token);
	return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async newUser => {
	const response = await axios.post(`${AUTH_URL}/register`, newUser);
	return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
	localStorage.removeItem("accessToken");
});
