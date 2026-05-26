import { baseAPI } from "./baseAPI";

export const faqAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getFaqs: build.query({
            query: (skipValue) => `/posts?limit=10&skip=${skipValue}&select=id,title,body`
        })
    })
})
export const {
    useGetFaqsQuery,
} = faqAPI;

