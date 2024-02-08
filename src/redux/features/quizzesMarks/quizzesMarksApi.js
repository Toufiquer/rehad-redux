import { apiSlice } from "../api/apiSlice";

export const QuizMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoints here
    getQuizzesMarks: builder.query({
      query: () => `/quizMark`,
    }),
    getQuizMarks: builder.query({
      query: (id) => `/quizMark/${id}`,
    }),
    updateQuizMarks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getQuizzesMarks",
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
    editQuizMarks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizMark/${id}`,
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
                "getQuizzesMarks",
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
    deleteQuizMarks: builder.mutation({
      query: (id) => ({
        url: `/quizMark/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // optimistic cache update start
        const patchResult1 = dispatch(
          apiSlice.util.updateQueryData(
            "getQuizzesMarks",
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
    addQuizMarks: builder.mutation({
      query: (data) => ({
        url: `/quizMark`,
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
                "getQuizzesMarks",
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
  }),
});
export const {
  useGetQuizzesMarksQuery,
  useGetQuizMarksQuery,
  useEditQuizMarksMutation,
  useUpdateQuizMarksMutation,
  useDeleteQuizMarksMutation,
  useAddQuizMarksMutation,
} = QuizMarksApi;
