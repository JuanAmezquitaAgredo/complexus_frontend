// features/postSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types/posts';

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk('get/fetchPosts', async () => {
  const response = await fetch('http://localhost:3004/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default postSlice.reducer;
