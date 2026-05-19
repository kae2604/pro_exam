import { baseAPI } from "./baseAPI";

export const cartAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        applyPromoCode: build.mutation({
            query: (promoCode) => ({
                url: '/http/200',  // only as test
                method: 'POST',
                body: {
                    title: `Promo Verification: ${promoCode}`,
                    couponCode: promoCode
                }
            }),
        }),
        createOrder: build.mutation({
            query: (orderData) => ({
                url: '/products/add',
                method: 'POST',
                body: {
                    title: 'Order Checkout',
                    ...orderData
                }
            }),
            invalidatesTags: ['Product'],
        }),
    }),
    overrideExisting: false,
})


export const {
    useApplyPromoCodeMutation,
    useCreateOrderMutation,
} = cartAPI;

