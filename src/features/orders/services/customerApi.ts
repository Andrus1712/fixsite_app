import { baseApi } from "../../../shared/store/baseApi";

export const customerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<any, { page?: number; limit?: number; filter?: string; } | void>({
            query: (params) => {
                const { page = 1, limit = 10, filter } = params || {};
                return {
                    url: `customers?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                    method: 'GET',
                };
            },
        }),
        getCustomerById: builder.query<any, number>({
            query: (id) => `customers/${id}`,
        }),
        createCustomer: builder.mutation<any, any>({
            query: (data) => ({
                url: 'customers',
                method: 'POST',
                body: data,
            }),
        }),
        updateCustomer: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `customers/${id}`,
                method: 'PATCH',
                body: data,
            }),
        }),
        deleteCustomer: builder.mutation<any, number>({
            query: (id) => ({
                url: `customers/${id}`,
                method: 'DELETE',
            }),
        }),
    })
});

export const {
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useLazyGetCustomersQuery
} = customerApi;
