import { configureStore } from '@reduxjs/toolkit'
import { postsAPI } from "./api/postsApi.js";
import { usersAPI } from "./api/usersApi.js";

const store = configureStore({
    reducer: {
        [postsAPI.reducerPath]: postsAPI.reducer,
        [usersAPI.reducerPath]: usersAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsAPI.middleware, usersAPI.middleware)
})

export default store
