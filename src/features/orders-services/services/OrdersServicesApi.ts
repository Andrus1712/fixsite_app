import { baseApi } from "../../../shared/store/baseApi";
import type { AvailableServicesResponse, CreateOrderServiceDto, OrderServiceRequest, OrderServicesResponse } from "../models/OrderServiceModel";

export const ordersServicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServicesAvailable: builder.mutation<AvailableServicesResponse, OrderServiceRequest>({
            query: (body) => ({
                url: `services/available`,
                method: "POST",
                body,
            }),
        }),
        createOrderService: builder.mutation<void, CreateOrderServiceDto>({
            query: ({ order_code: _order_code, ...body }) => ({
                url: `orders-service/create`,
                method: "POST",
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "OrderService", id: arg.order_id },
                ...(arg.order_code ? [{ type: "Order" as const, id: arg.order_code }] : []),
            ],
        }),
        getOrderService: builder.query<OrderServicesResponse, { order_id: number; }>({
            query: ({ order_id }) => ({
                url: `orders-service/order/${order_id}`,
                method: "GET",
            }),
            providesTags: (_result, _error, arg) => [
                { type: "OrderService", id: arg.order_id },
            ],
        }),
        deleteOrderService: builder.mutation<void, { order_service_id: number; order_id: number; order_code?: string }>({
            query: ({ order_service_id }) => ({
                url: `orders-service/${order_service_id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "OrderService", id: arg.order_id },
                ...(arg.order_code ? [{ type: "Order" as const, id: arg.order_code }] : []),
            ],
        }),
    }),
});

export const {
    useGetServicesAvailableMutation,
    useCreateOrderServiceMutation,
    useGetOrderServiceQuery,
    useDeleteOrderServiceMutation,
} = ordersServicesApi;