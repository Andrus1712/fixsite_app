import { baseApi } from "../../../../shared/store/baseApi";
import type { StockTransferFormData } from "../schemas/stock-transfer.schema";

interface StockTransferResponse {
    success: boolean;
    message: string;
    data: any;
}

const StockTransfersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createStockTransfer: builder.mutation<StockTransferResponse, StockTransferFormData>({
            query: (data) => ({
                url: `/stock-transfers/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Request"],
        }),
        submitStockTransfer: builder.mutation<StockTransferResponse, number>({
            query: (id) => ({
                url: `/stock-transfers/submit/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        approveStockTransfer: builder.mutation<StockTransferResponse, number>({
            query: (id) => ({
                url: `/stock-transfers/approve/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request", "Store"],
        }),
        rejectStockTransfer: builder.mutation<StockTransferResponse, number>({
            query: (id) => ({
                url: `/stock-transfers/reject/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        cancelStockTransfer: builder.mutation<StockTransferResponse, number>({
            query: (id) => ({
                url: `/stock-transfers/cancel/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
    }),
});

export const {
    useCreateStockTransferMutation,
    useSubmitStockTransferMutation,
    useApproveStockTransferMutation,
    useRejectStockTransferMutation,
    useCancelStockTransferMutation,
} = StockTransfersApi;
