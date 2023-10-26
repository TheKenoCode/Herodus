// Importing specific methods from the Redux toolkit library.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/lib/utils/axiosConfig';

// Defining the User interface which represents the shape of a user.
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
  playlistLink: string;
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

// Defining the UserState interface which represents the state shape for users.
interface UserState {
  currentUser: User | null; // The current authenticated user.
  isAuthenticated: boolean; // A flag to easily check if a user is authenticated.
  allUsers: User[]; // An array to store all users.
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of async operations.
  error: string | null; // Store any error messages.
}

// The initial state for the user slice.
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  allUsers: [],
  status: 'idle',
  error: null,
};
interface UpdateFields {
  name: string;
  email: string;
  bio: string;
  location: string;
  userLink: string;
  imageUrl: string;
  coverImage: string;
  YHaplogroup: string;
  MtHaplogroup: string;
  playlistLink: string;
}
// Async thunk for fetching all users from the API.
export const fetchAllUsers = createAsyncThunk(
  'user/fetchAllUsers',
  async (): Promise<User[]> => {
    const response = await api.get('/users');

    const data = response.data;

    if (
      Array.isArray(data) &&
      data.every((item) => 'name' in item && 'email' in item)
    ) {
      return data;
    }

    throw new Error('Data does not match expected type');
  },
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string): Promise<User> => {
    const response = await api.get(`/users/${userId}`);

    const userData = response.data;

    if ('_id' in userData && 'name' in userData && 'email' in userData) {
      return userData as User;
    }

    throw new Error('Data does not match expected type');
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updateData: { id: string; fields: UpdateFields }): Promise<User> => {
    const response = await api.put(
      `/users/${updateData.id}`,
      updateData.fields,
    );

    const updatedData = response.data;

    if (
      '_id' in updatedData &&
      'name' in updatedData &&
      'email' in updatedData
    ) {
      return updatedData as User;
    }

    throw new Error('Data does not match expected type');
  },
);

export const updateAccountAuth = createAsyncThunk(
  'user/updateAccountAuth',
  async (
    {
      userId: userId,
      email: email,
      password: password,
      emailPassword: emailPassword,
    },
    thunkAPI,
  ) => {
    console.log(email);

    // Make API request to update account details
    const response = await api.put(`/users/accountupdate/${userId}`, {
      email: email,
      password: password,
      emailPassword: emailPassword,
    });

    // Check if the response is successful and contains the expected data
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return thunkAPI.rejectWithValue(response.data);
    }
  },
);

// Async thunk for deleting a user.
export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/users/${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Creating a Redux slice for users.
const userSlice = createSlice({
  name: 'user', // Name of the slice.
  initialState, // Initial state for the slice.
  reducers: {
    // Reducer for setting the current user when a user logs in.
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    // Reducer for resetting the current user when a user logs out.
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
  // Handle the state changes based on the status of the async thunk.
  extraReducers: (builder) => {
    builder
      // When the fetchAllUsers thunk is pending.
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      // When the fetchAllUsers thunk is successfully fulfilled.
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allUsers = action.payload;
      })
      // When the fetchAllUsers thunk encounters an error.
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      // When the updateUser thunk is pending.
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      // When the updateUser thunk is successfully fulfilled.
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      // When the updateUser thunk encounters an error.
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      // When the deleteUser thunk is pending.
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })

      // When the deleteUser thunk is successfully fulfilled.
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.currentUser = null;
        state.isAuthenticated = false;
      })

      // When the deleteUser thunk encounters an error.
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // When the fetchUserById thunk is pending.
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      // When the fetchUserById thunk is successfully fulfilled.
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      // When the fetchUserById thunk encounters an error.
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })

      .addCase(updateAccountAuth.fulfilled, (state, action) => {
        // Handle the successful update, e.g., update the current user's email
        state.currentUser = action.payload;
        // Add other necessary updates here...
      })
      .addCase(updateAccountAuth.rejected, (state, action) => {
        // Handle the failed update, e.g., set an error message
        state.error = action.payload || 'Failed to update account details.';
      });
  },
});

// Exporting the generated actions for use in components or thunks.
export const { login, logout } = userSlice.actions;

// Exporting the reducer to be used in the Redux store.
export default userSlice.reducer;
