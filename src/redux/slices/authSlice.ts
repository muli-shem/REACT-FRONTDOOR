import { createSlice, createAsyncThunk, type  PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { type AuthState, type LoginCredentials, type LoginResponse, type User } from '@/types';

// Initial state - what auth state looks like when app starts
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Async thunk for login
// This function makes the API call and returns the result
export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',  // Action name (will show in Redux DevTools)
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login/', credentials);
      return response.data;
    } catch (error: any) {
      // Return error message to be handled by reducer
      return rejectWithValue(
        error.response?.data?.message || 'Login failed'
      );
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/auth/logout/');
      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

// Async thunk to fetch current user (check if already logged in)
export const fetchCurrentUser = createAsyncThunk<User>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous actions (instant state updates)
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // Handle async thunk states (pending, fulfilled, rejected)
    
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
    });

    // LOGOUT
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // FETCH CURRENT USER
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;