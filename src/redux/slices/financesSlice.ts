import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import {type FinanceState, type TopUp,type  FinanceSummary, type CreateTopUpData } from '@/types';

// Initial state
const initialState: FinanceState = {
  topups: [],
  summary: null,
  loading: false,
  error: null,
};

// Async thunk to fetch all top-ups
export const fetchTopUps = createAsyncThunk<TopUp[]>(
  'finance/fetchTopUps',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/finance/topups/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch top-ups'
      );
    }
  }
);

// Async thunk to create a new top-up
export const createTopUp = createAsyncThunk<TopUp, CreateTopUpData>(
  'finance/createTopUp',
  async (topupData, { rejectWithValue }) => {
    try {
      const response = await api.post('/finance/topups/', topupData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create top-up'
      );
    }
  }
);

// Async thunk to fetch finance summary
export const fetchFinanceSummary = createAsyncThunk<FinanceSummary>(
  'finance/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/finance/summary/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch finance summary'
      );
    }
  }
);

// Async thunk to fetch audit records (optional)
export const fetchAudits = createAsyncThunk<any[]>(
  'finance/fetchAudits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/finance/audits/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch audits'
      );
    }
  }
);

// Create the slice
const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Clear top-ups (useful when logging out)
    clearTopUps: (state) => {
      state.topups = [];
      state.summary = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH TOP-UPS
    builder.addCase(fetchTopUps.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTopUps.fulfilled, (state, action) => {
      state.loading = false;
      state.topups = action.payload;
    });
    builder.addCase(fetchTopUps.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // CREATE TOP-UP
    builder.addCase(createTopUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createTopUp.fulfilled, (state, action) => {
      state.loading = false;
      // Add the new top-up to the beginning of the array (most recent first)
      state.topups = [action.payload, ...state.topups];
    });
    builder.addCase(createTopUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH FINANCE SUMMARY
    builder.addCase(fetchFinanceSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFinanceSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.summary = action.payload;
    });
    builder.addCase(fetchFinanceSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH AUDITS (we're not storing audits in state for now)
    builder.addCase(fetchAudits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAudits.fulfilled, (state) => {
      state.loading = false;
      // Audits can be displayed directly without storing
    });
    builder.addCase(fetchAudits.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearTopUps } = financeSlice.actions;
export default financeSlice.reducer;