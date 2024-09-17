
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
    async (postData: { title: string; user: string; description: string; imageUrl: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:3004/posts', postData); // Ajusta la URL a tu endpoint
            return response.data; // Devuelve los datos del post creado
        } catch (error: any) { 
            return rejectWithValue(error.response.data.message || 'Error al crear el post');
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
                state.error = action.payload as string; // Captura el error
            });
    },
});

export const { resetCreatePost } = postSlice.actions;
export default postSlice.reducer;
