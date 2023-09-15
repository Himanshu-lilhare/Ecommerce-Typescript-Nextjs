import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverLinkForAdmin } from "./productsApi";
import { TOrder } from "../types/order";

export const ordersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${serverLinkForAdmin}` }),
  endpoints: (builder) => ({
    getOrders: builder.query<TOrder[], void>({
      query: () => "/getAllOrders",
    }),
  }),
});

export const {useGetOrdersQuery} = ordersApi
