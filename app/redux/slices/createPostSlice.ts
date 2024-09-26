
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface PostState {
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: PostState = {
    loading: false,
    success: false,
    error: null,
};

// Async thunk para crear un post
export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData: { title: string; user: string; description: string; imageUrl: string, timePosted: string }, { rejectWithValue }) => {
        try {
            const currentTime = new Date().toLocaleString();

            const updatedPostData = {
                ...postData,
                user: sessionStorage.getItem('name'), // Assuming you have the user's name
                timePosted: currentTime,
                likes: 0
            };

            const response = await axios.post('http://localhost:3004/posts', updatedPostData); // Adjust URL to your endpoint
            return response.data; // Return the created post data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || 'Error creating post');
        }
    }
);

const postSlice = createSlice({
    name: 'createPost',
    initialState,
    reducers: {
        resetCreatePost: (state) => {
            state.success = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; 
            });
    },
});

export const { resetCreatePost } = postSlice.actions;
export default postSlice.reducer;
