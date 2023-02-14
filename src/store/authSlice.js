import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {loggedIn: false, user: "Mohammed El-Behery"},
  reducers: {
    logInOut: (state, _) => {
      state.loggedIn = !state.loggedIn;
    },
  }
});

export const { logInOut } = authSlice.actions;

export default authSlice.reducer;