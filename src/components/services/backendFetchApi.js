import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = "https://rflix-backend-1706.herokuapp.com/api";

export const backendFetchApi = createApi({
    reducerPath: 'backendFetchApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        fetchTopMovies: builder.query({
            query: () => `/top250movies`,
        }),
        fetchTopSeries: builder.query({
            query: () => `/top250series`,
        }),
        fetchInTheatres: builder.query({
            query: () => `/inTheatres`,
        }),
        fetchGenreMovies: builder.query({
            query: (genre) => `/genres/movies/${genre}`,
        }),
        fetchGenreSeries: builder.query({
            query: (genre) => `/genres/series/${genre}`,
        })
    })
})
export const {
    useFetchTopMoviesQuery,
    useFetchTopSeriesQuery,
    useFetchInTheatresQuery,
    useFetchGenreMoviesQuery,
    useFetchGenreSeriesQuery,
} = backendFetchApi;