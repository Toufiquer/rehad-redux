import { apiSlice } from "../api/apiSlice";
import { addOneUser } from "../users/usersSlice";
import { studentLoggedIn } from "./studentAuthSlice";

export const studentAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    addStudent: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.user) {
            dispatch(addOneUser(query.data.user));
            dispatch(studentLoggedIn(query.data.user));
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
  }),
});
export const { useAddStudentMutation } = studentAuthApi;
