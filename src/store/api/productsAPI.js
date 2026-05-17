import { baseAPI } from "./baseAPI";

export const productsAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({

        getCategories: build.query({
            query: () => '/products/categories',
        }),

        getProductsForHomeCategory: build.query({
            query: (category) => {
                const url = "/products";
                return{
                    url: url,
                    params: {
                        limit:0,
                        select: 'category,images'
                    },
                };
            },
        }),

        getProductsByCategory: build.query({
            query: ({category, limit, skip, sortBy, order, id}) => {
                const url = category ? `/products/category/${category}` : '/products';
                return{
                    url: url,
                    params: {
                        limit,
                        skip,
                        sortBy,
                        order,
                        id,
                        select: 'title,price,discountPercentage,thumbnail,rating'
                    },
                };
            },
            providesTags: ['Product'],
        }),

        getProductsBySearch: build.query({
            query: ({search, limit, skip, sortBy, order, id}) => {
                const url = `/products/search?q=${search}`;
                return{
                    url: url,
                    params: {
                        limit,
                        skip,
                        sortBy,
                        order,
                        id,
                        select: 'title,price,discountPercentage,thumbnail,rating'
                    },
                };
            },
            providesTags: ['Product'],
        }),

        getProductsWithParams: build.query({
            query: ({limit, sortBy, order, select}) => {
                const url = '/products';
                return{
                    url: url,
                    params: {
                        limit,
                        sortBy,
                        order,
                        select
                    },
                };
            },
        }),

        getProductById: build.query({
            query: (productId) => `/products/${productId}`,
            providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
        }),

        getBannerImages: build.query({
            query: (id) => ({
                url: `/products/${id}`,
                params: { select: 'images' }
            }),
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetCategoriesQuery,
    useGetProductsByCategoryQuery,
    useGetProductsForHomeCategoryQuery,
    useGetProductsBySearchQuery,
    useGetProductsWithParamsQuery,
    useGetProductByIdQuery,
    useGetBannerImagesQuery,
} = productsAPI;

