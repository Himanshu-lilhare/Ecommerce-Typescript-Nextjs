import { Middleware, configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/usersSlice"; // Import the user API configuration
import { productApi } from "../services/productAoSlice"; // Import the product API configuration

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,productApi.middleware),
});
