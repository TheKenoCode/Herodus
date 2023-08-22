// Importing specific methods from the Redux toolkit library.
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiUrl } from '../../utils/API_URL'
const API_URL = getApiUrl()

// Defining the Post interface which represents the shape of a blog post.
interface Post {
  id: number
  title: string
  content: string
  author: string
}

// Defining the PostState interface which represents the state shape for blog posts.
interface PostState {
  posts: Post[] // An array to store all blog posts.
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // Status of async operations.
  error: string | null // Store any error messages.
}

// The initial state for the blog post slice.
const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null,
}

// Async thunk for fetching blog posts from the API.
// Thunks allow for handling asynchronous operations in Redux.
export const fetchPosts = createAsyncThunk('blogPost/fetchPosts', async () => {
  const response = await fetch(`${API_URL}/api/blogposts`)
  const data = await response.json()
  return data as Post[]
})

// Creating a Redux slice for blog posts.
const blogPostSlice = createSlice({
  name: 'blogPost', // Name of the slice.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer for adding a new post to the state.
    createPost: (state, action: PayloadAction<Omit<Post, 'id'>>) => {
      const newId = state.posts.length + 1 // Generate a new ID for the post.
      state.posts.push({ id: newId, ...action.payload })
    },
  },
  // Handle the state changes based on the status of the async thunk.
  extraReducers: (builder) => {
    builder
      // When the fetchPosts thunk is pending.
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      // When the fetchPosts thunk is successfully fulfilled.
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      // When the fetchPosts thunk encounters an error.
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Exporting the generated actions for use in components or thunks.
export const { createPost } = blogPostSlice.actions

// Exporting the reducer to be used in the Redux store.
export default blogPostSlice.reducer
