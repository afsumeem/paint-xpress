import { api } from "@/redux/api/apiSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get services

    postUsers: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostUsersMutation } = usersApi;
