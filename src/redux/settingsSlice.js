import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allowNotification: false,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSimpleSetting: (state, action) => {
      const { settingsKey, value } = action.payload;
      state[settingsKey] = value;
    },
  },
});

export const { updateSimpleSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
