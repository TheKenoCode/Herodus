// Importing specific methods from the Redux toolkit library.
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Defining the User interface with potential properties of a user.
interface User {
  id: string
  name: string
  email: string
  role: string
  followers: string[]
  following: string[]
  bio: string
  location: string
  userLink: string
  imageUrl: string
  YHaplogroup: string
  MtHaplogroup: string
  // ... any other user properties you have
}

// Defining the AuthState interface which represents the state shape for authentication.
interface AuthState {
  token: string | null // Represents the JWT or any authentication token.
  isAuthenticated: boolean // A flag to easily check if a user is authenticated.
  user: User | null // Holds the authenticated user's data or null if no user is authenticated.
}

// The initial state of the authentication slice.
const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
}

// Creating a Redux slice for authentication.
// A slice automatically generates reducers and actions based on the reducers you define.
const authSlice = createSlice({
  name: 'auth', // Name of the slice.
  initialState, // Initial state for the slice.
  reducers: {
    // The login reducer updates the state with the user's token and details when a user logs in.
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    // The logout reducer resets the state when a user logs out.
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
    },
  },
})

// Exporting the generated actions for use in components or thunks.
export const { login, logout } = authSlice.actions

// Exporting the reducer to be used in the Redux store.
export default authSlice.reducer
