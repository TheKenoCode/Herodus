// Importing specific methods from the Redux toolkit library.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getApiUrl } from '../../utils/API_URL'
const API_URL = getApiUrl()
// Defining the User interface which represents the shape of a user.
interface User {
  name: string
  email: string
  image: string
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
    const response = await fetch(`${API_URL}/api/users`) // Fetching all users from the given endpoint.
    return response.json() as User[]
  }
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
  },
})

// Exporting the generated actions for use in components or thunks.
export const { login, logout } = userSlice.actions

// Exporting the reducer to be used in the Redux store.
export default userSlice.reducer
