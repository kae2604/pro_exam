import { configureStore } from '@reduxjs/toolkit'
// import { postsAPI } from "./api/postsApi.js";
// import { categoriesAPI } from "./api/categoriesApi.js";
import { productsAPI } from "./api/productsAPI.js";
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        // [postsAPI.reducerPath]: postsAPI.reducer,
        // [categoriesAPI.reducerPath]: categoriesAPI.reducer,
        [productsAPI.reducerPath]: productsAPI.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            // postsAPI.middleware,
            // categoriesAPI.middleware,
            productsAPI.middleware,
        )
})

export default store
