import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {BASE_URL} from "../../api/config.js";

export const postsAPI = createApi({
    reducerPath: 'postsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => 'posts?_limit=25',
            providesTags: () => [{type: 'Post', id: 'all'}]
        }),
        getPostById: build.query({
            query: ({postId}) => `posts/${postId}`,
            providesTags: ({id}) => {
                return [{type: 'Post', id}]
            }
        }),
        createPost: build.mutation({
            query: (data) => ({
                url: 'posts',
                method: 'POST',
                body: {
                    title: data.title,
                    body: data.body,
                    userId: data.userId,
                }
            }),
            invalidatesTags:  [{type: 'Post', id: 'all'}]
        }),
        editPost: build.mutation({
            query: (data) => ({
                url: `posts/${data.postId}`,
                method: 'PUT',
                body: {
                    title: data.title,
                    body: data.body,
                    userId: data.userId,
                }
            }),
            invalidatesTags: ({id}) => [{type: 'Post', id: 'all'}, {type: 'Post', id}]
        }),
        deletePost: build.mutation({
            query: (data) => ({
                url: `posts/${data.postId}`,
                method: 'DELETE',
            }),
            invalidatesTags:  [{type: 'Post', id: 'all'}]
        })
    })
})


export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation
} = postsAPI;