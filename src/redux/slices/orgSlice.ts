import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import { type OrgState, type Announcement, type Event } from '@/types';

// Initial state
const initialState: OrgState = {
  announcements: [],
  events: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all announcements
export const fetchAnnouncements = createAsyncThunk<Announcement[]>(
  'org/fetchAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/org/announcements/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch announcements'
      );
    }
  }
);

// Async thunk to fetch recent announcements (for dashboard)
export const fetchRecentAnnouncements = createAsyncThunk<Announcement[]>(
  'org/fetchRecentAnnouncements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/org/announcements/recent/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch recent announcements'
      );
    }
  }
);

// Async thunk to fetch all events
export const fetchEvents = createAsyncThunk<Event[]>(
  'org/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/org/events/');
      return response.data;
    } catch (error: any) {
      // Handle 404 gracefully - empty events is not an error
      if (error.response?.status === 404) {
        return [];
      }
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch events'
      );
    }
  }
);

// Async thunk to fetch next upcoming event (for dashboard)
export const fetchNextEvent = createAsyncThunk<Event | null>(
  'org/fetchNextEvent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/org/events/next/');
      return response.data;
    } catch (error: any) {
      // 404 means no upcoming events - this is NOT an error, return null
      if (error.response?.status === 404) {
        return null;
      }
      // Other errors should be rejected
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch next event'
      );
    }
  }
);

// Create the slice
const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Clear all org data
    clearOrgData: (state) => {
      state.announcements = [];
      state.events = [];
    },
  },
  extraReducers: (builder) => {
    // FETCH ANNOUNCEMENTS
    builder.addCase(fetchAnnouncements.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAnnouncements.fulfilled, (state, action) => {
      state.loading = false;
      state.announcements = action.payload;
    });
    builder.addCase(fetchAnnouncements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH RECENT ANNOUNCEMENTS
    builder.addCase(fetchRecentAnnouncements.fulfilled, (state, action) => {
      state.announcements = action.payload;
    });

    // FETCH EVENTS
    builder.addCase(fetchEvents.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.events = action.payload;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH NEXT EVENT
    builder.addCase(fetchNextEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNextEvent.fulfilled, (state, action) => {
      state.loading = false;
      // If we got a valid event (not null), add it to the events array
      if (action.payload) {
        const exists = state.events.some(e => e.id === action.payload!.id);
        if (!exists) {
          state.events = [action.payload, ...state.events];
        }
      }
      // If payload is null, it means no upcoming events - this is fine, not an error
    });
    builder.addCase(fetchNextEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearOrgData } = orgSlice.actions;
export default orgSlice.reducer;