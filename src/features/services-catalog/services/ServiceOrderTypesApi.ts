import { baseApi } from "../../../shared/store/baseApi";
import type { Service } from "./ServicesApi";
import type { FailureCode } from "../../maintenance/services/FailureCodesApi";

export interface OrderType {
    id: number;
    codigo: string;
    descripcion: string;
}

export interface ServiceOrderType {
    id: number;
    service: Pick<Service, "id" | "code" | "description" | "base_price">;
    orderType: OrderType;
    failureCode: Pick<FailureCode, "id" | "code" | "description" | "estimatedRepairMinutes"> | null;
    price: number;
    estimatedMinutes: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ServiceOrderTypeResponse {
    success: boolean;
    status: number;
    message: string;
    data: ServiceOrderType;
}

interface ServiceOrderTypesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: ServiceOrderType[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface OrderTypesListResponse {
    success: boolean;
    data: OrderType[];
}

export type CreateServiceOrderTypeDto = {
    service_id: number,
    order_type_id: number,
    failure_code_id: number | null | undefined,
    price: number,
    estimated_minutes: number,
    is_active: boolean,
};

export type UpdateServiceOrderTypeDto = Partial<CreateServiceOrderTypeDto>;

export const serviceOrderTypesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceOrderTypesPaginated: builder.query<
            { data: ServiceOrderType[]; total: number; page: number; limit: number; totalPages: number },
            { page: number; limit: number; serviceId?: string; orderTypeId?: string }
        >({
            query: ({ page, limit, serviceId, orderTypeId }) => ({
                url: "/services/service-order-types/all",
                params: {
                    page,
                    limit,
                    ...(serviceId ? { serviceId } : {}),
                    ...(orderTypeId ? { orderTypeId } : {}),
                },
            }),
            transformResponse: (response: ServiceOrderTypesListResponse) => ({
                data: response.data,
                total: response.total,
                page: response.page,
                limit: response.limit,
                totalPages: response.totalPages,
            }),
            providesTags: ["ServiceOrderType"],
        }),
        getServiceOrderTypeById: builder.query<ServiceOrderType, number>({
            query: (id) => ({ url: `/services/service-order-types/${id}` }),
            transformResponse: (response: ServiceOrderTypeResponse) => response.data,
            providesTags: ["ServiceOrderType"],
        }),
        createServiceOrderType: builder.mutation<ServiceOrderType, CreateServiceOrderTypeDto>({
            query: (body) => ({
                url: "/services/service-order-types",
                method: "POST",
                body,
            }),
            transformResponse: (response: ServiceOrderTypeResponse) => response.data,
            invalidatesTags: ["ServiceOrderType"],
        }),
        updateServiceOrderType: builder.mutation<ServiceOrderType, { id: number; data: UpdateServiceOrderTypeDto }>({
            query: ({ id, data }) => ({
                url: `/services/service-order-types/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: ServiceOrderTypeResponse) => response.data,
            invalidatesTags: ["ServiceOrderType"],
        }),
        deleteServiceOrderType: builder.mutation<void, number>({
            query: (id) => ({
                url: `/services/service-order-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ServiceOrderType"],
        }),
        // Support data for selects
        getOrderTypesList: builder.query<OrderType[], void>({
            query: () => ({ url: "/services/order-types/list" }),
            transformResponse: (response: OrderTypesListResponse) => response.data,
        }),
    }),
});

export const {
    useGetServiceOrderTypesPaginatedQuery,
    useGetServiceOrderTypeByIdQuery,
    useCreateServiceOrderTypeMutation,
    useUpdateServiceOrderTypeMutation,
    useDeleteServiceOrderTypeMutation,
    useGetOrderTypesListQuery,
} = serviceOrderTypesApi;
