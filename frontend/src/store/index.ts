import { configureStore } from '@reduxjs/toolkit';
import homeReducer from 'app/pages/HomePage/slice';
import customerReducer from 'app/pages/CustomerManagementPage/slice'

export const store = configureStore({
  reducer: {
    home: homeReducer,
    customer: customerReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
