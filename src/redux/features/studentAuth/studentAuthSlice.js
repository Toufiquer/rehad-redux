import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  data: {},
};
const studentAuthSlice = createSlice({
  name: "studentAuth",
  initialState,
  reducers: {
    studentLoggedIn: (state, action) => {
      // In this project token is not validated
      state.data.name = action.payload.name;
      state.data.email = action.payload.email;
      state.data.role = action.payload.role;
      state.data.id = action.payload.id;
    },
    studentLoggedOut: (state, action) => {
      // state.accessToken = undefined;
      state.data = {};
    },
  },
});
export const { studentLoggedIn, studentLoggedOut } = studentAuthSlice.actions;
export default studentAuthSlice.reducer;
