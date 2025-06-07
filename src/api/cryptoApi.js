import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST,
    'x-rapidapi-key': import.meta.env.VITE_CRYPTO_RAPIDAPI_KEY,
};
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CRYPTO_API_URL }),
    endpoints: (builder) => ({
        // Fetch list of cryptocurrencies
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),

        // Fetch details of a specific cryptocurrency
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),

        // Fetch crypto history
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),

        // Fetch global stats
        getGlobalStats: builder.query({
            query: () => createRequest(`/stats?referenceCurrencyUuid=yhjMzLPhuIDl`),
        }),
    }),
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetGlobalStatsQuery,
} = cryptoApi;
