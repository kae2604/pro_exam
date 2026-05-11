import { configureStore } from '@reduxjs/toolkit'
import { productsAPI } from "./api/productsAPI.js";
import { cartAPI } from "./api/cartAPI.js";
import { faqAPI } from "./api/faqAPI.js";
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        [productsAPI.reducerPath]: productsAPI.reducer,
        [cartAPI.reducerPath]: cartAPI.reducer,
        [faqAPI.reducerPath]: faqAPI.reducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            cartAPI.middleware,
            productsAPI.middleware,
            faqAPI.middleware,
        )
})
export default store
