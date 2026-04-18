import { baseApi } from "../../../shared/store/baseApi";
import type { AvailableServicesResponse, CreateOrderServiceDto, OrderServiceRequest } from "../models/OrderServiceModel";

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
            query: (body) => ({
                url: `orders-service/create`,
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useGetServicesAvailableMutation, useCreateOrderServiceMutation } = ordersServicesApi;