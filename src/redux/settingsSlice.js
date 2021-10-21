import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allowNotification: false,
  darkMode: "system",

  // does the current browser support scheduled notifications
  supportsNotifications: false,
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

export const selectDarkMode = (state) => state.settings.darkMode;
export const selectAllowNotifications = (state) => state.settings.allowNotification;
export const selectSupportsNotifications = (state) => state.settings.supportsNotifications;

export default settingsSlice.reducer;
