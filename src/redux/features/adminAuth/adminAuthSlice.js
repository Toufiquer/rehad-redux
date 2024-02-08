import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  data: {},
};
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLoggedIn: (state, action) => {
      // In this project token is not validated
      state.data.name = action.payload.name;
      state.data.email = action.payload.email;
      state.data.role = action.payload.role;
    },
    adminLoggedOut: (state, action) => {
      // state.accessToken = undefined;
      state.data = {};
    },
  },
});
export const { adminLoggedIn, adminLoggedOut } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
