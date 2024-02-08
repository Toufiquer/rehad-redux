import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import usersSlice from "../features/users/usersSlice";
import adminAuthSlice from "../features/adminAuth/adminAuthSlice";
import studentAuthSlice from "../features/studentAuth/studentAuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    users: usersSlice,
    adminAuth: adminAuthSlice,
    studentAuth: studentAuthSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
