import { baseApi } from "../../../shared/store/baseApi";

export const rolesAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `permissions/roles/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Role'],
        }),
        saveRoles: builder.mutation<any, { name: string, description: string, permissions: string[]; }>({
            query: (newRole) => ({
                url: 'permissions/roles',
                method: 'POST',
                body: newRole,
            }),
            invalidatesTags: ['Role'],
        }),
        getRoleById: builder.query<any, number>({
            query: (id) => ({
                url: `permissions/roles/${id}`,
                method: 'GET',
            }),
            providesTags: ['Role'],
        }),
        updateRole: builder.mutation<any, { id: number, name: string, description: string, permissions: string[]; }>({
            query: ({ id, ...role }) => ({
                url: `permissions/roles/${id}`,
                method: 'PUT',
                body: role,
            }),
            invalidatesTags: ['Role'],
        }),
        deleteRole: builder.mutation<any, number>({
            query: (id) => ({
                url: `permissions/roles/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Role'],
        }),
    })
});

export const { useGetRolesQuery, useSaveRolesMutation, useGetRoleByIdQuery, useUpdateRoleMutation, useDeleteRoleMutation } = rolesAPi;