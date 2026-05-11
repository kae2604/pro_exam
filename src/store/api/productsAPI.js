import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "@constants/API.js";

export const productsAPI = createApi({
    reducerPath: 'productsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getCategories: build.query({
            query: () => '/products/categories',
        }),
        getAllProducts: build.query({
            query: () => '/products?limit=0&select=title,price,discountPercentage,thumbnail,rating',
        }),
        getProductsByCategory: build.query({
            query: (slug) => `/products/category/${slug}?select=title,price,discountPercentage,thumbnail,rating`,
        }),
        getSameProductsByCategory: build.query({
            query: ({category, limit}) => `/products/category/${category}?limit=${limit}&select=title,price,discountPercentage,thumbnail,rating`,
        }),
        getProductById: build.query({
            query: (productId) => `/products/${productId}`,
        }),
        getProductImagesById: build.query({
            query: (productId) => `/products/${productId}?select=images`,
        }),
        getHomeNewArrivals: build.query({
            query: () => '/products?limit=4&sortBy=id&order=desc&select=title,price,discountPercentage,thumbnail,rating',
        }),
        getHomeTopSelling: build.query({
            query: () => '/products?limit=4&sortBy=rating&order=desc&select=title,price,discountPercentage,thumbnail,rating',
        }),
    })
})


export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetSameProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetProductImagesByIdQuery,
    useGetHomeNewArrivalsQuery,
    useGetHomeTopSellingQuery,
    useGetAllProductsQuery,
    useLazyGetUsersQuery,
    useLazyGetUserByIdQuery
} = productsAPI;

