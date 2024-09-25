import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Post } from '../../types/posts';

interface PinnedPostState {
  pinnedPosts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PinnedPostState = {
  pinnedPosts: [],
  loading: false,
  error: null,
};

// Define the async thunk to fetch pinned posts
export const fetchPinnedPosts = createAsyncThunk('pinnedPosts/fetchPinnedPosts', async () => {
  const response = await axios.get('http://localhost:3004/pin'); 
  return response.data;
});

const pinnedPostSlice = createSlice({
  name: 'pinnedPosts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPinnedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPinnedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.pinnedPosts = action.payload;
      })
      .addCase(fetchPinnedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load pinned posts';
      });
  },
});

export default pinnedPostSlice.reducer;
