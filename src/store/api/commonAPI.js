import { baseAPI } from './baseAPI';

export const commonAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getRandomQuote: build.query({
            query: () => '/quotes/random',
        }),

        getBannerImages: build.query({
            query: (id) => ({
                url: `/products/${id}`,
                params: { select: 'images' }
            }),
        }),

        sendLetter: build.mutation({
            query: () => ({
                url: '/http/200',
                method: 'POST',
                body: {
                    title: 'Subscribe to Newsletter',
                }
            }),
        }),

        loginUser: build.mutation({
            query: ({username, password}) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    username,
                    password,
                }
            }),
        }),
    }),
});

export const {
    useGetRandomQuoteQuery,
    useGetBannerImagesQuery,
    useSendLetterMutation,
    useLoginUserMutation,
} = commonAPI;