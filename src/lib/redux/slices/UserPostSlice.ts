// Importing necessary methods and utilities.
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/utils/axiosConfig';

// Defining the UserPost interface.
interface User {
  _id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  bio: string;
  role: string;
  location: string;
  userLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  likedPosts: UserPost[];
  createdAt: string;
}
interface UserPost {
  _id: string;
  content: string;
  author: User;
  imageUrl: string;
  likes: string[];
  createdAt: string;
}

// Defining the UserPostState interface.
interface UserPostState {
  posts: UserPost[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state for the UserPosts slice.
const initialState: UserPostState = {
  posts: [],
  status: 'idle',
  error: null,
};
export const searchPosts = createAsyncThunk(
  'userPost/searchPosts',
  async (query: string): Promise<UserPost[]> => {
    try {
      const response = await api.get(`/userposts?search=${query}`);

      const data = response.data;

      if (
        Array.isArray(data) &&
        data.every((item) => 'author' in item && 'content' in item)
      ) {
        return data;
      }
      throw new Error('Data does not match expected type');
    } catch (error) {
      if (error.response) {
        // Error response from server
        throw new Error(
          `Failed to search posts with status: ${error.response.status}`
        );
      } else if (error.request) {
        // The request was made, but no response was received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request
        throw new Error('Error setting up request');
      }
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  'userPost/fetchUserPosts',
  async (): Promise<UserPost[]> => {
    try {
      const response = await api.get(`/userposts`);

      const data: unknown = response.data;

      if (
        Array.isArray(data) &&
        data.every((item) => 'author' in item && 'content' in item)
      ) {
        return data as UserPost[];
      }
      throw new Error('Invalid data structure');
    } catch (error) {
      if (error.response) {
        console.error('Error fetching blog posts:', error.response.data); //eslint-disable-line
        throw new Error(
          `Failed to fetch user posts with status: ${error.response.status}`
        );
      } else if (error.request) {
        console.error(
          'Error fetching blog posts: No response received from server'
        ); //eslint-disable-line
        throw new Error('No response received from server');
      } else {
        console.error('Error fetching blog posts:', error.message); //eslint-disable-line
        throw new Error('Error setting up request');
      }
    }
  }
);
// Async thunk to fetch a single user post by its ID.
export const fetchSingleUserPost = createAsyncThunk(
  'userPost/fetchSingleUserPost',
  async (postId: string): Promise<UserPost> => {
    const response = await api.get(`/userposts/${postId}`);

    const data: unknown = response.data;

    if ('author' in data && 'content' in data) {
      return data as UserPost;
    }
    throw new Error('Invalid data structure');
  }
);

// Async thunk to delete a user post by its ID.
export const deleteUserPost = createAsyncThunk(
  'userPost/deleteUserPost',
  async (postId: string): Promise<void> => {
    await api.delete(`/userposts/${postId}`);
  }
);

// Creating the Redux slice for UserPosts.
const userPostSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    createUserPost: (state, action: PayloadAction<UserPost>) => {
      state.posts.unshift(action.payload); // Add the new post to the beginning of the posts array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchSingleUserPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleUserPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post if it exists
        } else {
          state.posts.push(action.payload); // Add the post if it doesn't exist
        }
      })
      .addCase(fetchSingleUserPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      .addCase(deleteUserPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUserPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg
        ); // Remove the deleted post
      })
      .addCase(deleteUserPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { createUserPost } = userPostSlice.actions;
export default userPostSlice.reducer;
