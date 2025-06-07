import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createExchangeRequest = (url) => ({ url });

export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_EXCHANGE_API_URL }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      // Fetch list of exchanges
      query: () => createExchangeRequest('/exchanges')
    }),
  }),
});

export const {
  useGetExchangesQuery
} = exchangeApi;
