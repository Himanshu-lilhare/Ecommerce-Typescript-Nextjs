// Or from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProduct } from "../types/product";

export let serverLinkForAdmin = "http://localhost:5001/admin";

export const productApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${serverLinkForAdmin}` }),
  endpoints: (builder) => ({
    getProducts: builder.query<TProduct[], void>({
      query: () => "getAllProducts",
      providesTags:[{type:"Product" as never}]
    }),
    editProductInfo:builder.mutation<TProduct,Partial<TProduct>>({
      query:(updatedValue)=>({
        url:"editProductInfo",
        method:"PUT",
        body:updatedValue

      }),
      invalidatesTags:[{type:"Product" as never}]

    })
   
  }),
});

export const { useGetProductsQuery } = productApi;
