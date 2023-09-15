import { TUser } from "../types/user";
import { rootApi } from "./rootApi";

export const userApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<TUser[], void>({
      query: () => "getUsers",
      providesTags: [{ type: "User" as never }],
    }),
    editUserInfo: builder.mutation<TUser, Partial<TUser>>({
      query: (newUserData) => ({
        url: "/editUserInfo",
        method: "PUT",
        body: newUserData,
      }),
      invalidatesTags: [{ type: "User" as never }],
    }),
  }),
});

export const { useGetUsersQuery, useEditUserInfoMutation } = userApi;
