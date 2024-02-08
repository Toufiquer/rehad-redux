import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  data: [],
};
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // After fetch all data it will dispatch from userApi.
    pushAllData: (state, action) => {
      state.data.push(action.payload);
    },
    addOneUser: (state, action) => {
      const idx = state.data.indexOf(action.payload);
      if (idx === -1) {
        state.data.push(action.payload);
      }
    },
    removeOneUser: (state, action) => {
      const idx = state.data.indexOf(action.payload);
      if (idx !== -1) {
        state.data.splice(idx, 1);
      }
    },
  },
});
export const { pushAllData, addOneUser, removeOneUser } = usersSlice.actions;
export default usersSlice.reducer;
