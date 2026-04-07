import { baseApi } from "../../../../shared/store/baseApi";
import type { InventoryAdjustmentFormData } from "../schemas/inventory-adjustment.schema";

interface InventoryAdjustmentResponse {
    success: boolean;
    message: string;
    data: any;
}

const InventoryAdjustmentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createInventoryAdjustment: builder.mutation<InventoryAdjustmentResponse, InventoryAdjustmentFormData>({
            query: (data) => ({
                url: `/inventory-adjustments/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Request"],
        }),
        submitInventoryAdjustment: builder.mutation<InventoryAdjustmentResponse, number>({
            query: (id) => ({
                url: `/inventory-adjustments/submit/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        approveInventoryAdjustment: builder.mutation<InventoryAdjustmentResponse, number>({
            query: (id) => ({
                url: `/inventory-adjustments/approve/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request", "Store"],
        }),
        rejectInventoryAdjustment: builder.mutation<InventoryAdjustmentResponse, number>({
            query: (id) => ({
                url: `/inventory-adjustments/reject/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        cancelInventoryAdjustment: builder.mutation<InventoryAdjustmentResponse, number>({
            query: (id) => ({
                url: `/inventory-adjustments/cancel/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
    }),
});

export const {
    useCreateInventoryAdjustmentMutation,
    useSubmitInventoryAdjustmentMutation,
    useApproveInventoryAdjustmentMutation,
    useRejectInventoryAdjustmentMutation,
    useCancelInventoryAdjustmentMutation,
} = InventoryAdjustmentsApi;
