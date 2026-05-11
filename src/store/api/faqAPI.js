import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "@constants/API.js";

export const faqAPI = createApi({
    reducerPath: 'faqAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getFaqs: build.query({
            query: () => '/posts?limit=10&select=id,title,body',
        })
    })
})


export const {
    useGetFaqsQuery,
    useGetProductsByCategoryQuery,
    useGetProductByIdQuery,
    useGetProductImagesByIdQuery,
    useGetHomeNewArrivalsQuery,
    useGetHomeTopSellingQuery,
    useGetAllProductsQuery,
    useLazyGetUsersQuery,
    useLazyGetUserByIdQuery
} = faqAPI;

