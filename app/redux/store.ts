// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';
import createPostReducer from './slices/createPostSlice';

const store = configureStore({
  reducer: {
    posts: postReducer,
    createPost: createPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
