import { baseApi } from "../../../shared/store/baseApi";
import type { ApiResponse } from "../models/ApiModel";
import type { StandardResponse } from "../../../shared/types/api";
import type { WorkOrder } from "../models/OrderModel";

// export const ordersApi = createApi({
//     reducerPath: "orderApi",
//     baseQuery: fetchBaseQuery({ baseUrl: "/" }),
//     tagTypes: ['Order'],
//     endpoints: (builder) => ({
//         getAllOrders: builder.query<Order[], void>({
//             query: () => "ordenes.json",
//             providesTags: ['Order'],
//             keepUnusedDataFor: 0,
//         }),
//     }),
// });

export const ordersApiExternal = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<StandardResponse<WorkOrder>, any>({
            query: (orderData) => ({
                url: 'orders/create',
                method: 'POST',
                body: orderData,
            }),
        }),
        uploadImage: builder.mutation<string, FormData>({
            query: (formData) => ({
                url: 'upload/image',
                method: 'POST',
                body: formData,
            }),
            transformResponse: (response: StandardResponse<{ url: string; }>) => response.data.url,
        }),
        getAllOrders: builder.query<StandardResponse<WorkOrder[]>, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `orders/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<WorkOrder[]>) => response,
        }),
        getOrdersByCode: builder.query<WorkOrder, { order_code?: string; }>({
            query: ({ order_code }) => ({
                url: `orders/${order_code}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<WorkOrder>) => response.data,
            providesTags: (result, error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        assignOrderToTechnician: builder.mutation<StandardResponse<null>, { order_code: string; technician_id: number; }>({
            query: ({ order_code, technician_id }) => ({
                url: `orders/assign`,
                method: "POST",
                body: { technician_id, order_code },
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
    }),
});

// export const { useGetAllOrdersQuery } = ordersApi;
export const { useCreateOrderMutation, useUploadImageMutation, useGetAllOrdersQuery, useGetOrdersByCodeQuery, useAssignOrderToTechnicianMutation } = ordersApiExternal;