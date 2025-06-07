import { configureStore } from '@reduxjs/toolkit';

// Importing APIs for crypto, news, and exchanges
import { cryptoApi } from '../api/cryptoApi';
import { cryptoNewsApi } from '../api/cryptoNewsApi';
import { exchangeApi } from '../api/cryptoExchangeApi';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,         // CryptoApi reducer
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer, // CryptoNewsApi reducer
        [exchangeApi.reducerPath]: exchangeApi.reducer,     // ExchangeApi reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cryptoApi.middleware,       // CryptoApi middleware
            cryptoNewsApi.middleware,   // CryptoNewsApi middleware
            exchangeApi.middleware      // ExchangeApi middleware
        ),
});
