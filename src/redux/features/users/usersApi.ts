import { api } from "@/redux/api/apiSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get users

    postUsers: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
    // updateUser: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/users/updateUser/${id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["profile"],
    // }),

    //
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        providesTags: ["users"],
      }),
    }),
  }),
});

export const { usePostUsersMutation, useGetUsersQuery } = usersApi;
