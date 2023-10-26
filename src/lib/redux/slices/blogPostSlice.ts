// Importing specific methods from the Redux toolkit library.
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/utils/axiosConfig';

// Defining the Post interface which represents the shape of a blog post.
interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

// Defining the PostState interface which represents the state shape for blog posts.
interface PostState {
  posts: Post[]; // An array to store all blog posts.
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of async operations.
  error: string | null; // Store any error messages.
}

// The initial state for the blog post slice.
const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching blog posts from the API.
// Thunks allow for handling asynchronous operations in Redux.
export const fetchPosts = createAsyncThunk('blogPost/fetchPosts', async () => {
  try {
    const response = await api.get(`/blogposts`);

    return response.data as Post[];
  } catch (error) {
    if (error.response) {
      console.error('Error fetching blog posts:', error.response.data); //eslint-disable-line
      throw new Error(
        `Failed to fetch blog posts with status: ${error.response.status}`,
      );
    } else if (error.request) {
      console.error(
        'Error fetching blog posts: No response received from server',
      ); //eslint-disable-line
      throw new Error('No response received from server');
    } else {
      console.error('Error fetching blog posts:', error.message); //eslint-disable-line
      throw new Error('Error setting up request');
    }
  }
});

// Creating a Redux slice for blog posts.
const blogPostSlice = createSlice({
  name: 'blogPost', // Name of the slice.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer for adding a new post to the state.
    createPost: (state, action: PayloadAction<Omit<Post, 'id'>>) => {
      const newId = state.posts.length + 1;
      const { _id, ...restOfPayload } = action.payload;
      state.posts.push({ _id: newId.toString(), ...restOfPayload });
    },
  },
  // Handle the state changes based on the status of the async thunk.
  extraReducers: (builder) => {
    builder
      // When the fetchPosts thunk is pending.
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      // When the fetchPosts thunk is successfully fulfilled.
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      // When the fetchPosts thunk encounters an error.
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Exporting the generated actions for use in components or thunks.
export const { createPost } = blogPostSlice.actions;

// Exporting the reducer to be used in the Redux store.
export default blogPostSlice.reducer;
