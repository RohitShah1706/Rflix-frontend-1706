import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "https://api.themoviedb.org/3";

export const featuredApi = createApi({
    reducerPath: 'featuredApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getFeatured: builder.query({
            query: () => `/trending/all/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        }),
    })
})
export const {
    useGetFeaturedQuery,
} = featuredApi;