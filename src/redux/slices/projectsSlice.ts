import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';
import {type ProjectsState, type  Idea,type  Proposal,type  CreateIdeaData } from '@/types';

// Initial state
const initialState: ProjectsState = {
  ideas: [],
  proposals: [],
  loading: false,
  error: null,
};

// Async thunk to fetch all ideas
export const fetchIdeas = createAsyncThunk<Idea[]>(
  'projects/fetchIdeas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects/ideas/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch ideas'
      );
    }
  }
);

// Async thunk to create a new idea
export const createIdea = createAsyncThunk<Idea, CreateIdeaData>(
  'projects/createIdea',
  async (ideaData, { rejectWithValue }) => {
    try {
      const response = await api.post('/projects/ideas/', ideaData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create idea'
      );
    }
  }
);

// Async thunk to fetch all proposals
export const fetchProposals = createAsyncThunk<Proposal[]>(
  'projects/fetchProposals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/projects/proposals/');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch proposals'
      );
    }
  }
);

// Async thunk to upload a proposal (with file)
export const uploadProposal = createAsyncThunk<Proposal,
  { ideaId: number; file: File; description: string }
>(
  'projects/uploadProposal',
  async ({ ideaId, file, description }, { rejectWithValue }) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('idea', ideaId.toString());
      formData.append('file', file);
      formData.append('description', description);

      const response = await api.post('/projects/proposals/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload proposal'
      );
    }
  }
);

// Async thunk to fetch ideas by status
export const fetchIdeasByStatus = createAsyncThunk
 < Idea[],
  'submitted' | 'reviewing' | 'approved' | 'rejected'
>(
  'projects/fetchIdeasByStatus',
  async (status, { rejectWithValue }) => {
    try {
      const response = await api.get(`/projects/ideas/?status=${status}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch ideas by status'
      );
    }
  }
);

// Create the slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Clear all projects data
    clearProjects: (state) => {
      state.ideas = [];
      state.proposals = [];
    },
    // Update idea status locally (for optimistic updates)
    updateIdeaStatus: (state, action) => {
      const { ideaId, status } = action.payload;
      const idea = state.ideas.find(i => i.id === ideaId);
      if (idea) {
        idea.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    // FETCH IDEAS
    builder.addCase(fetchIdeas.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchIdeas.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = action.payload;
    });
    builder.addCase(fetchIdeas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // CREATE IDEA
    builder.addCase(createIdea.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createIdea.fulfilled, (state, action) => {
      state.loading = false;
      // Add new idea to the beginning (most recent first)
      state.ideas = [action.payload, ...state.ideas];
    });
    builder.addCase(createIdea.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH PROPOSALS
    builder.addCase(fetchProposals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProposals.fulfilled, (state, action) => {
      state.loading = false;
      state.proposals = action.payload;
    });
    builder.addCase(fetchProposals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // UPLOAD PROPOSAL
    builder.addCase(uploadProposal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadProposal.fulfilled, (state, action) => {
      state.loading = false;
      // Add new proposal to the beginning
      state.proposals = [action.payload, ...state.proposals];
    });
    builder.addCase(uploadProposal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // FETCH IDEAS BY STATUS
    builder.addCase(fetchIdeasByStatus.fulfilled, (state, action) => {
      state.loading = false;
      state.ideas = action.payload;
    });
  },
});

export const { clearError, clearProjects, updateIdeaStatus } = projectsSlice.actions;
export default projectsSlice.reducer;