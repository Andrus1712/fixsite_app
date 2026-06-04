import { baseApi } from "../../../shared/store/baseApi";
import type { StandardResponse } from "../../../shared/types/api";
import type { WorkOrder } from "../models/OrderModel";

/** Args para PUT /orders/update-status/:orderCode */
export interface UpdateOrderStatusArgs {
    orderCode: string;
    status: number;
    notes?: string;
}

/** Evento de log de transición de estado */
export interface OrderLogEvent {
    id: number;
    order_id: number;
    status: number;
    notes: string | null;
    created_at: string;
    created_by: number;
}

/** Body para POST /orders/issues/create */
export interface CreateOrderIssueDto {
    order_id: number;
    title: string;
    description: string;
    failure_code_id?: number;
    additional_notes?: string;
    steps_to_reproduce?: string[];
    reported_by?: string;
    attachments?: Array<{
        filename: string;
        originalName: string;
        size: string;
        url: string;
    }>;
}

/** Body para PUT /orders/issues/:issueId */
export interface UpdateOrderIssueDto {
    issue_id: number;
    order_code: string;
    title?: string;
    description?: string;
    failure_code_id?: number;
    additional_notes?: string;
    steps_to_reproduce?: string[];
    attachments?: Array<{
        filename: string;
        originalName: string;
        size: string;
        url: string;
    }>;
}

/** Args para DELETE /orders/issues/:issueId */
export interface DeleteOrderIssueArgs {
    issue_id: number;
    order_code: string;
}

export const ordersApiExternal = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<StandardResponse<WorkOrder>, unknown>({
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
            transformResponse: (response: StandardResponse<{ url: string }>) => response.data.url,
        }),
        getAllOrders: builder.query<StandardResponse<WorkOrder[]>, { page?: number; limit?: number; filter?: string }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `orders/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<WorkOrder[]>) => response,
        }),
        getOrdersByCode: builder.query<WorkOrder, { order_code?: string }>({
            query: ({ order_code }) => ({
                url: `orders/${order_code}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<WorkOrder>) => response.data,
            providesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        assignOrderToTechnician: builder.mutation<StandardResponse<null>, { order_code: string; technician_id: number }>({
            query: ({ order_code, technician_id }) => ({
                url: `orders/assign`,
                method: "POST",
                body: { technician_id, order_code },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        unassignOrderTechnician: builder.mutation<StandardResponse<null>, { order_code: string }>({
            query: ({ order_code }) => ({
                url: `orders/unassign`,
                method: "POST",
                body: { order_code },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        createOrderIssue: builder.mutation<StandardResponse<null>, CreateOrderIssueDto & { order_code: string }>({
            query: ({ order_code: _omit, ...body }) => ({
                url: 'orders/issues/create',
                method: 'POST',
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        updateOrderIssue: builder.mutation<StandardResponse<null>, UpdateOrderIssueDto>({
            query: ({ issue_id, order_code: _omit, ...body }) => ({
                url: `orders/issues/${issue_id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        deleteOrderIssue: builder.mutation<StandardResponse<null>, DeleteOrderIssueArgs>({
            query: ({ issue_id }) => ({
                url: `orders/issues/${issue_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.order_code }],
        }),
        updateOrderStatus: builder.mutation<StandardResponse<null>, UpdateOrderStatusArgs>({
            query: ({ orderCode, status, notes }) => ({
                url: `orders/update-status/${orderCode}`,
                method: 'PUT',
                body: { status, ...(notes ? { notes } : {}) },
            }),
            invalidatesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.orderCode }],
        }),
        getOrderLogEvents: builder.query<OrderLogEvent[], { orderCode: string }>({
            query: ({ orderCode }) => ({
                url: `orders/${orderCode}/log-events`,
                method: 'GET',
            }),
            transformResponse: (response: StandardResponse<OrderLogEvent[]>) => response.data,
            providesTags: (_result, _error, arg) => [{ type: 'Order', id: arg.orderCode }],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useUploadImageMutation,
    useGetAllOrdersQuery,
    useGetOrdersByCodeQuery,
    useAssignOrderToTechnicianMutation,
    useUnassignOrderTechnicianMutation,
    useCreateOrderIssueMutation,
    useUpdateOrderIssueMutation,
    useDeleteOrderIssueMutation,
    useUpdateOrderStatusMutation,
    useGetOrderLogEventsQuery,
} = ordersApiExternal;
