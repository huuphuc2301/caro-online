import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  message: string;
}

const initialState: HomeState = {
  message: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    changeMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;

export default homeSlice.reducer;
