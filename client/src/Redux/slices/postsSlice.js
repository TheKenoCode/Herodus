/** @format */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} from "../../api/posts_api";
const initialState = {
	goals: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};
export const postsSlice = createSlice({
	name: "posts",
	initialState: initialState,

	extraReducers(builder) {
		builder
			.addCase(getPosts.fulfilled, (state, action) => {
				return [...action.payload];
			})
			.addCase(createPost.fulfilled, (state, action) => {
				return [...state, action.payload];
				// state.posts.push(action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				return state.filter((post) => post._id !== action.payload);
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				return state.map((post) =>
					post._id === action.payload._id ? action.payload : post
				);
			});
	},
});

export default postsSlice.reducer;
