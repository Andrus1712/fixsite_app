import { baseApi } from "../../../shared/store/baseApi";
import type { LoginResponse, logoutTenantResponse } from "../../auth/models/LoginResponse";

export const tenantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTenants: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `tenants/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Tenant'],
        }),
        selectTenant: builder.mutation<LoginResponse, { tenantId: string; }>({
            query: (tenantId) => ({
                url: `auth/select-tenant`,
                method: 'POST',
                body: tenantId
            }),
            invalidatesTags: ['Permission']
        }),
        logoutTenant: builder.mutation<logoutTenantResponse, void>({
            query: () => ({
                url: `auth/logout-tenant`,
                method: 'POST'
            }),
            invalidatesTags: ['Permission']
        }),
    })
});

export const { useGetTenantsQuery, useSelectTenantMutation, useLogoutTenantMutation } = tenantApi;