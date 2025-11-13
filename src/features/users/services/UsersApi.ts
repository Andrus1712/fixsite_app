import { baseApi } from "../../../shared/store/baseApi";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `users/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        getUsers2: builder.query({
            query: (params) => ({
                url: "",
                params,
            }),
            providesTags: ["User"],
        }),
        getUserById: builder.query({
            query: (id) => `users/${id}`,
            providesTags: (result, error, id) => [{ type: "User", id }],
        }),
        saveUser: builder.mutation({
            query: (userData) => ({
                url: "users",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...userData }) => ({
                url: `users/${id}`,
                method: "PUT",
                body: userData,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useSaveUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;