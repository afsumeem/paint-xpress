import { api } from "@/redux/api/apiSlice";

const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get services

    getServices: builder.query({
      query: ({ search, category }) => ({
        url: "/filteredServices",
        params: { search, category },
      }),
    }),
  }),
});

export const { useGetServicesQuery } = serviceApi;
