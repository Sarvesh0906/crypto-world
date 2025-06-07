import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const newsHeaders = {
    'x-rapidapi-host': import.meta.env.VITE_NEWS_RAPIDAPI_HOST,
    'x-rapidapi-key': import.meta.env.VITE_NEWS_RAPIDAPI_KEY,
};

const createRequest = (url) => ({
    url,
    headers: newsHeaders, 
});

export const cryptoNewsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_NEWS_API_URL }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            // Fetch cryptocurrency news
            query: (searchTerm = 'Cryptocurrency') =>
                createRequest(`/v2/search/publishers?query=${encodeURIComponent(searchTerm)}&language=en&sort=popularity`),
            transformResponse: (response) => response?.data || [],
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
