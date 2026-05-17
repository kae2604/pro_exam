import { configureStore } from '@reduxjs/toolkit'
import { baseAPI } from "./api/baseAPI";
import cartReducer from './slices/cartSlice';
import categoryFiltersReducer from './slices/categoryFiltersSlice.js';

const store = configureStore({
    reducer: {
        [baseAPI.reducerPath]: baseAPI.reducer,
        cart: cartReducer,
        categoryFilters: categoryFiltersReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            baseAPI.middleware,
        )
})
export default store
