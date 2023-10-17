import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://paintxpress-server.vercel.app/",
  }),
  tagTypes: ["users"],
  endpoints: () => ({}),
});
