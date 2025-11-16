import type { Order } from "../models/OrderModels";
import { baseApi } from "../../../shared/store/baseApi";
import type { ApiResponse } from "../models/ApiModel";

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
        createOrder: builder.mutation<Order, any>({
            query: (orderData) => ({
                url: 'orders',
                method: 'POST',
                body: orderData,
            }),
            invalidatesTags: ['Order'],
        }),
        uploadImage: builder.mutation<{ url: string }, FormData>({
            query: (formData) => ({
                url: 'upload/image',
                method: 'POST',
                body: formData,
            }),
        }),
        getAllOrders: builder.query<ApiResponse, void>({
            query: () => ({
                url: "orders",
                method: "GET",
            }),
            providesTags: ['Order'],
            keepUnusedDataFor: 0,
        }),
    }),
});

// export const { useGetAllOrdersQuery } = ordersApi;
export const { useCreateOrderMutation, useUploadImageMutation, useGetAllOrdersQuery: useGetAllOrdersQueryExternal } = ordersApiExternal;