// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import createPostReducer from './slices/createPostSlice';
import pinnedPostReducer from './slices/pinnedPostSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    createPost: createPostReducer,
    pinnedPosts: pinnedPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
