import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "@constants/API.js";

export const categoriesAPI = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => '/products/categories',
        }),
        // getUserById: build.query({
        //     query: ({userId}) => `users/${userId}`,
        // }),
    })
})


export const {
    useGetCategoriesQuery,
    useLazyGetUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery
} = categoriesAPI;

