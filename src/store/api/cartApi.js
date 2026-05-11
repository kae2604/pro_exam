import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "@constants/API.js";

export const cartAPI = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        applyPromoCode: build.mutation({
            query: (promoCode) => ({
                url: '/products/add',  // only as test
                method: 'POST',
                body: {
                    title: `Promo Verification: ${promoCode}`, // Серверу нужен title — даем его
                    couponCode: promoCode // Передаем сам код для наглядности в Network
                }
            }),
        }),
    })
})


export const {
    useApplyPromoCodeMutation,
} = cartAPI;

