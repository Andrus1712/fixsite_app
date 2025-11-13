import { baseApi } from "../../../shared/store/baseApi";
import type { LoginResponse, logoutTenantResponse } from "../../auth/models/LoginResponse";

export const tenantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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

export const { useSelectTenantMutation, useLogoutTenantMutation } = tenantApi;