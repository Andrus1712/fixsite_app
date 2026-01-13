import type { Order, ResponseOrder } from "../models/OrderModels";
import { baseApi } from "../../../shared/store/baseApi";
import type { ApiResponse } from "../models/ApiModel";
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
        createOrder: builder.mutation<ResponseOrder, any>({
            query: (orderData) => ({
                url: 'orders/create',
                method: 'POST',
                body: orderData,
            }),
        }),
        uploadImage: builder.mutation<{ url: string; }, FormData>({
            query: (formData) => ({
                url: 'upload/image',
                method: 'POST',
                body: formData,
            }),
        }),
        getAllOrders: builder.query<ApiResponse, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `orders/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: "GET",
            }),
        }),
        getOrdersByCode: builder.query<WorkOrder, { order_code?: string; }>({
            query: ({ order_code }) => ({
                url: `orders/${order_code}`,
                method: "GET",
            }),
        }),
    }),
});

// export const { useGetAllOrdersQuery } = ordersApi;
export const { useCreateOrderMutation, useUploadImageMutation, useGetAllOrdersQuery: useGetAllOrdersQueryExternal, useGetOrdersByCodeQuery } = ordersApiExternal;