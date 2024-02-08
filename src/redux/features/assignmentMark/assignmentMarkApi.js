// import { apiSlice } from "../api/apiSlice";

import { apiSlice } from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,
    }),
    getAssignmentMark: builder.query({
      query: (id) => `/assignmentMark/${id}`,
    }),
    updateAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start

        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMarks",
            undefined,
            (draft) => {
              const newValue = draft.map((curr) => {
                if (parseInt(curr.id) === parseInt(arg.id)) {
                  return { ...curr, ...arg.data };
                } else {
                  return curr;
                }
              });
              Object.assign(draft, newValue);
            }
          )
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
        } catch {
          patchResult1.undo();
        }
      },
    }),
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: { ...data },
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
                undefined,
                (draft) => {
                  const newValue = draft.map((curr) => {
                    if (parseInt(curr.id) === parseInt(arg.id)) {
                      return { ...query?.data };
                    } else {
                      return curr;
                    }
                  });
                  Object.assign(draft, newValue);
                }
              )
            );
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
    addAssignmentMark: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // debugger;
        try {
          const query = await queryFulfilled;
          // pessimistic cache update start
          if (query?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
                undefined,
                (draft) => {
                  draft.push(query.data);
                }
              )
            );
          }
          // pessimistic cache update end
        } catch {}
      },
    }),
    deleteAssignmentMark: builder.mutation({
      query: (id) => ({
        url: `/assignmentMark/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getAssignmentMarks",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (i) => parseInt(i.id) === parseInt(arg)
              );
              draft.splice(index, 1);
            }
          )
        );
        // optimistic cache update end
        try {
          const query = await queryFulfilled;
        } catch {
          patchResult1.undo();
        }
      },
    }),
  }),
});
export const {
  useGetAssignmentMarkQuery,
  useGetAssignmentMarksQuery,
  useUpdateAssignmentMarkMutation,
  useEditAssignmentMarkMutation,
  useDeleteAssignmentMarkMutation,
  useAddAssignmentMarkMutation,
} = assignmentMarkApi;
