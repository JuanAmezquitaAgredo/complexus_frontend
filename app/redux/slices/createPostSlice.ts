// // features/createPostSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// interface Post {
//   title: string;
//   user: string;
//   description: string;
// }

// interface CreatePostState {
//   loading: boolean;
//   success: boolean;
//   error: string | null;
// }

// const initialState: CreatePostState = {
//   loading: false,
//   success: false,
//   error: null,
// };

// // Thunk para crear un post
// export const createPost = createAsyncThunk('posts/createPost', async (newPost: Post) => {
//   const response = await fetch('http://localhost:3004/posts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newPost),
//   });

//   if (!response.ok) {
//     throw new Error('Error creando el post');
//   }

//   return (await response.json()) as Post;
// });

// const createPostSlice = createSlice({
//   name: 'createPost',
//   initialState,
//   reducers: {
//     resetCreatePost: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createPost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createPost.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(createPost.rejected, (state, action) => {
//         state.loading = false;
//         state.success = false;
//         state.error = action.error.message || 'Error al crear el post';
//       });
//   },
// });

// export const { resetCreatePost } = createPostSlice.actions;
// export default createPostSlice.reducer;


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
