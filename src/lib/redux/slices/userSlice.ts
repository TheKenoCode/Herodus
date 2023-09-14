// Importing specific methods from the Redux toolkit library.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Defining the User interface which represents the shape of a user.
interface User {
  id: string
  name: string
  email: string
  followers: string[]
  following: string[]
  bio: string
  location: string
  userLink: string
  imageUrl: string
  coverImage: string
  YHaplogroup: string
  MtHaplogroup: string
}

// Defining the UserState interface which represents the state shape for users.
interface UserState {
  currentUser: User | null // The current authenticated user.
  isAuthenticated: boolean // A flag to easily check if a user is authenticated.
  allUsers: User[] // An array to store all users.
  status: 'idle' | 'loading' | 'succeeded' | 'failed' // Status of async operations.
  error: string | null // Store any error messages.
}

// The initial state for the user slice.
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  allUsers: [],
  status: 'idle',
  error: null,
}

// Async thunk for fetching all users from the API.
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async () => {
    try {
      const response = await fetch(`/api/users`) // Fetching all users from the given endpoint.

      if (!response.ok) {
        throw new Error(`Failed to fetch users with status: ${response.status}`)
      }

      return response.json() as User[]
    } catch (error) {
      // Depending on your application, you might want to handle the error here or throw it again to let Redux handle it.
      console.error('Error fetching users:', error.message)
      throw error
    }
  },
)

// Async thunk for updating a user.
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: { id: string; fields: any }) => {
    try {
      console.log(updateData)
      const response = await fetch(`/api/users/${updateData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData.fields),
      })

      if (!response.ok) {
        throw new Error(`Failed to update user with status: ${response.status}`)
      }

      return response.json() as User
    } catch (error) {
      // Depending on your application, you might want to handle the error here or throw it again to let Redux handle it.
      console.error('Error updating user:', error.message)
      throw error
    }
  },
)

// Async thunk for deleting a user.
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    })
    return response.json()
  },
)

// Creating a Redux slice for users.
const userSlice = createSlice({
  name: 'user', // Name of the slice.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer for setting the current user when a user logs in.
    login: (state, action) => {
      state.currentUser = action.payload
      state.isAuthenticated = true
    },
    // Reducer for resetting the current user when a user logs out.
    logout: (state) => {
      state.currentUser = null
      state.isAuthenticated = false
    },
  },
  // Handle the state changes based on the status of the async thunk.
  extraReducers: (builder) => {
    builder
      // When the fetchAllUsers thunk is pending.
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading'
      })
      // When the fetchAllUsers thunk is successfully fulfilled.
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allUsers = action.payload
      })
      // When the fetchAllUsers thunk encounters an error.
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // When the updateUser thunk is pending.
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading'
      })
      // When the updateUser thunk is successfully fulfilled.
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = action.payload
      })
      // When the updateUser thunk encounters an error.
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // When the deleteUser thunk is pending.
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading'
      })
      // When the deleteUser thunk is successfully fulfilled.
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentUser = null
        state.isAuthenticated = false
      })
      // When the deleteUser thunk encounters an error.
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Exporting the generated actions for use in components or thunks.
export const { login, logout } = userSlice.actions

// Exporting the reducer to be used in the Redux store.
export default userSlice.reducer
