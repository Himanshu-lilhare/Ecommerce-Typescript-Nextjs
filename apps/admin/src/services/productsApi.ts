import { TProduct } from "../types/product";
import { rootApi } from "./rootApi";

export let serverLinkForAdmin = "http://localhost:5001/admin";

export const productApi = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<TProduct[], void>({
      query: () => "getAllProducts",
      providesTags: [{ type: "Product" as never }],
    }),
    editProductInfo: builder.mutation<TProduct, Partial<TProduct>>({
      query: (updatedValue) => ({
        url: "editProductInfo",
        method: "PUT",
        body: updatedValue,
      }),
      invalidatesTags: [{ type: "Product" as never }],
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
