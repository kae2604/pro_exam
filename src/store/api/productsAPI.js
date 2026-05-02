import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "@constants/API.js";

export const productsAPI = createApi({
    reducerPath: ' productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getProductsByCategory: build.query({
            query: (slug) => `/products/category/${slug}`,
        }),
        getProductById: build.query({
            query: (productId) => `/products/${productId}`,
        }),
        getHomeNewArrivals: build.query({
            query: () => '/products?limit=4&sortBy=id&order=desc',
        }),
        getHomeTopSelling: build.query({
            query: () => '/products?limit=4&sortBy=ProductRating&order=desc',
        }),
    })
})


export const {
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetHomeNewArrivalsQuery,
    useGetHomeTopSellingQuery,
    useLazyGetUsersQuery,
    useLazyGetUserByIdQuery
} = productsAPI;

