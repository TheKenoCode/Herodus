/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
	baseURL: "https://herodus.herokuapp.com/users",
});

export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		const res = await API.post("/", userData);

		try {
			if (res.data) {
				localStorage.setItem("user", JSON.stringify(res.data));
			}
			return res.data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		const res = await API.post("/login", userData);

		try {
			if (res.data) {
				localStorage.setItem("user", JSON.stringify(res.data));
			}
			return res.data;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const logout = createAsyncThunk("auth/logout", async () => {
	localStorage.removeItem("user");
});
