import { configureStore } from "@reduxjs/toolkit";
import { featuredApi } from "../services/featuredApi";
import { backendFetchApi } from "../services/backendFetchApi";
import { authSlice } from "./authSlice";
export const store = configureStore({
    reducer: {
        [featuredApi.reducerPath]: featuredApi.reducer,
        [backendFetchApi.reducerPath]: backendFetchApi.reducer,
        auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(featuredApi.middleware, backendFetchApi.middleware),
})

