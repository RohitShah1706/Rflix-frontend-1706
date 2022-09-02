import { configureStore } from "@reduxjs/toolkit";
import { featuredApi } from "../services/featuredApi";
import { backendFetchApi } from "../services/backendFetchApi";
export const store = configureStore({
    reducer: {
        [featuredApi.reducerPath]: featuredApi.reducer,
        [backendFetchApi.reducerPath]: backendFetchApi.reducer,
    },
})

