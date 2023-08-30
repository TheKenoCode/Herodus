// Importing necessary methods and utilities.
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

// Defining the UserPost interface.
interface UserPost {
  id: number
  title: string
  content: string
  authorId: string
}

// Defining the UserPostState interface.
interface UserPostState {
  posts: UserPost[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// Initial state for the UserPosts slice.
const initialState: UserPostState = {
  posts: [],
  status: 'idle',
  error: null,
}

// Async thunk for fetching user posts.
export const fetchUserPosts = createAsyncThunk(
  'userPost/fetchUserPosts',
  async () => {
    const response = await fetch(`/api/userposts`)
    const data = await response.json()
    console.log(data)
    return data as UserPost[]
  }
)

// Creating the Redux slice for UserPosts.
const userPostSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    createUserPost: (state, action: PayloadAction<Omit<UserPost, 'id'>>) => {
      const newId = state.posts.length + 1
      state.posts.push({ id: newId, ...action.payload })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { createUserPost } = userPostSlice.actions
export default userPostSlice.reducer
