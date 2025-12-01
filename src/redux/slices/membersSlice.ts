import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import { type MembersState, type Member, type JoinApplicationData } from '@/types';

// Initial state
const initialState: MembersState = {
  members: [],
  currentMember: null,
  loading: false,
  error: null,
  totalCount: 0,
};

// Async thunk to fetch all members
export const fetchMembers = createAsyncThunk<Member[]>(
  'members/fetchMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/members/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch members'
      );
    }
  }
);

// Async thunk to fetch a single member by ID
export const fetchMemberById = createAsyncThunk<Member, number>(
  'members/fetchMemberById',
  async (memberId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/members/${memberId}/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch member'
      );
    }
  }
);

// Async thunk to fetch member count
export const fetchMemberCount = createAsyncThunk<number>(
  'members/fetchCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/members/count/');
      return response.data.count;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch member count'
      );
    }
  }
);

// Async thunk to submit join application
export const submitJoinApplication = createAsyncThunk <
  { detail: string; user?: any },
  JoinApplicationData
>(
  'members/join',
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await api.post('/members/join/', applicationData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || 'Failed to submit application'
      );
    }
  }
);

// Create the slice
const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    // Clear current member (when navigating away from profile page)
    clearCurrentMember: (state) => {
      state.currentMember = null;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH ALL MEMBERS
    builder.addCase(fetchMembers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMembers.fulfilled, (state, action) => {
      state.loading = false;
      state.members = action.payload;
      state.totalCount = action.payload.length;
    });
    builder.addCase(fetchMembers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH SINGLE MEMBER
    builder.addCase(fetchMemberById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMemberById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentMember = action.payload;
    });
    builder.addCase(fetchMemberById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH MEMBER COUNT
    builder.addCase(fetchMemberCount.fulfilled, (state, action) => {
      state.totalCount = action.payload;
    });

    // SUBMIT JOIN APPLICATION
    builder.addCase(submitJoinApplication.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(submitJoinApplication.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(submitJoinApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearCurrentMember, clearError } = membersSlice.actions;
export default membersSlice.reducer;