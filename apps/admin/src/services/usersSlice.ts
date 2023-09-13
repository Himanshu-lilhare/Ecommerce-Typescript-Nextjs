import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TUser } from "../types/user";

const serverLinkForAdmin = "http://localhost:5001/admin";

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${serverLinkForAdmin}` }),
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "getUsers",
      providesTags: [{type:"User" as never}],
    }),
    editUserInfo: builder.mutation<TUser, Partial<TUser>>({
      query: (newUserData) => ({
        url: "/editUserInfo",
        method: "PUT",
        body: newUserData,
      }),
      invalidatesTags:[{type:"User" as never}],
     
    }),
  }),
});

export const { useGetUsersQuery, useEditUserInfoMutation } = userApi;
