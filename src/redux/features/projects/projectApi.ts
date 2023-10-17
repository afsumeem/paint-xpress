import { api } from "@/redux/api/apiSlice";

const projectApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // get projects

    getProjects: builder.query({
      query: ({ search, category }) => ({
        url: "/filteredProjects",
        params: { search, category },
      }),
    }),
  }),
});

export const { useGetProjectsQuery } = projectApi;
