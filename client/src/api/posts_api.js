/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({
	baseURL: "https://herodus.herokuapp.com",
});

export const getPosts = createAsyncThunk(
	"posts/getPosts",
	async (postData, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const res = await API.get("/posts", config);

		console.log(res);
		return res.data;
	}
);
export const createPost = createAsyncThunk(
	"posts/createPost",
	async (newPost, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const res = await API.post("/posts", newPost, config);

		console.log(res);
		return res.data;
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async (id, updatedPost) => {
		const res = await API.get(`/posts/${id}`, updatedPost);

		console.log(res);
		return res.data;
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const res = await API.delete(`/posts/${id}`, config);

		console.log(res);
		return res.data;
	}
);

export const likePost = createAsyncThunk(
	"posts/likePost",
	async (id, thunkAPI) => {
		const token = thunkAPI.getState().auth.user.token;
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const res = await API.get(`/posts/${id}/likePost`, config);

		console.log(res);
		return res.data;
	}
);
