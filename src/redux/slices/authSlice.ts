import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';
import { type AuthState, type LoginCredentials, type LoginResponse, type User } from '@/types';

// Initial state - what auth state looks like when app starts
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ============================================================================
// ASYNC THUNK: Login
// ============================================================================
export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      // POST to /auth/login/
      // Django will authenticate and create a session
      // Session cookie (sessionid) is automatically set by Django
      const response = await api.post('/auth/login/', credentials);
      
      // Response contains user data, NO TOKENS
      // {
      //   user: { id, email, full_name, role },
      //   message: "Login successful"
      // }
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Login failed'
      );
    }
  }
);

// ============================================================================
// ASYNC THUNK: Logout
// ============================================================================
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // POST to /auth/logout/
      // Django will destroy the session
      // Session cookie is automatically removed
      await api.post('/auth/logout/');
      
      // Clean up any lingering tokens from old implementation
      localStorage.removeItem('token');
      
      return;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Logout failed'
      );
    }
  }
);

// ============================================================================
// ASYNC THUNK: Fetch Current User
// ============================================================================
export const fetchCurrentUser = createAsyncThunk<User>(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      // GET /auth/profile/
      // If session cookie is valid, Django returns user data
      // If not authenticated, Django returns 401
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error: any) {
      // Don't log 401 errors - user just isn't logged in
      if (error.response?.status !== 401) {
        console.error('Failed to fetch user:', error);
      }
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch user'
      );
    }
  }
);

// ============================================================================
// SLICE: Auth State Management
// ============================================================================
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
    // Add a clearAuth action for manual logout
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ========================================================================
    // LOGIN CASES
    // ========================================================================
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      
      // ✅ NO localStorage.setItem('token') needed!
      // Session cookie (sessionid) is automatically set by Django
      // Browser will send it with every request automatically
      
      console.log('Login successful - Session created');
    });
    
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isAuthenticated = false;
      state.user = null;
    });

    // ========================================================================
    // LOGOUT CASES
    // ========================================================================
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // ✅ NO localStorage.removeItem('token') needed!
      // Session cookie is automatically destroyed by Django
      
      console.log('Logout successful - Session destroyed');
    });
    
    builder.addCase(logout.rejected, (state) => {
      // Even if logout fails, clear local state
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // ========================================================================
    // FETCH CURRENT USER CASES
    // ========================================================================
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      
      console.log('User session restored from cookie');
    });
    
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      
      // User is not logged in or session expired
      // This is normal on first visit or after session expiry
    });
  },
});

export const { clearError, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;