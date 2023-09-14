// Importing necessary methods and utilities.
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

// Defining the UserPost interface.
interface UserPost {
  id: number
  content: string
  authorId: string
  imageUrl: string
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
    try {
      const response = await fetch(`/api/userposts`)

      if (!response.ok) {
        throw new Error(
          `Failed to fetch user posts with status: ${response.status}`,
        )
      }

      const data = await response.json()
      return data as UserPost[]
    } catch (error) {
      // Depending on your application, you might want to handle the error here or throw it again to let Redux handle it.
      console.error('Error fetching user posts:', error.message)
      throw error
    }
  },
)

// Creating the Redux slice for UserPosts.
const userPostSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    createUserPost: (state, action: PayloadAction<UserPost>) => {
      state.posts.unshift(action.payload) // Add the new post to the beginning of the posts array
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
