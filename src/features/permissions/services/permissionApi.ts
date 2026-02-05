import { baseApi } from "../../../shared/store/baseApi";
import type { PermissionResponse } from "../models/PermissionResponse";

export const permissionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPermissions: builder.query<PermissionResponse, string>({
            query: (userId) => 'permissions/' + userId,
            providesTags: ['Permission'],
        }),
        createPermission: builder.mutation<any, Partial<any>>({
            query: (newPermission) => ({
                url: 'permissions',
                method: 'POST',
                body: newPermission,
            }),
            invalidatesTags: ['Permission'],
        }),
        getPermissionsByRole: builder.query<PermissionResponse, { roleId: number; userId: number; }>({
            query: ({ roleId, userId }) => `permissions/by-role?roleId=${roleId}&userId=${userId}`,
            keepUnusedDataFor: 0,
        }),
        getAvailablePermissions: builder.query<any, void>({
            query: () => ({
                url: `permissions/available`,
                method: 'GET',
            }),
        }),
        // CRUD
        getPermissionsAll: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `permissions/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Permission'],
        }),
        getPermissionById: builder.query<any, number>({
            query: (id) => ({
                url: `permissions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Permission'],
        }),
        savePermission: builder.mutation<any, {
            key: string,
            assignedBy: string,
            userId?: number,
            componentId: number;
        }>({
            query: (newPermission) => ({
                url: 'permissions/save',
                method: 'POST',
                body: newPermission,
            }),
            invalidatesTags: ['Permission'],
        }),
        updatePermission: builder.mutation<any, {
            id: number,
            key: string,
            assignedBy: string,
            userId?: number,
            componentId: number;
        }>({
            query: ({ id, ...permission }) => ({
                url: `permissions/${id}`,
                method: 'PUT',
                body: permission,
            }),
            invalidatesTags: ['Permission'],
        }),
        deletePermission: builder.mutation<any, number>({
            query: (id) => ({
                url: `permissions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Permission'],
        }),
    })
});

export const {
    useGetPermissionsQuery,
    useCreatePermissionMutation,
    useGetPermissionsByRoleQuery,
    useGetAvailablePermissionsQuery,
    useGetPermissionsAllQuery,
    useGetPermissionByIdQuery,
    useSavePermissionMutation,
    useUpdatePermissionMutation,
    useDeletePermissionMutation } = permissionApi;