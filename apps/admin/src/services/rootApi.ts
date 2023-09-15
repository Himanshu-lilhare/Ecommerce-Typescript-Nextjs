import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const serverLinkForAdmin = "http://localhost:5001/admin";

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${serverLinkForAdmin}` }),
  tagTypes: [""],
  endpoints: (builder) => ({}),
});
