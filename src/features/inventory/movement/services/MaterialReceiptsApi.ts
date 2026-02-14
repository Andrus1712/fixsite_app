import { baseApi } from "../../../../shared/store/baseApi";

interface MaterialReceipts {
    id: number;
    status: string,
    created_by: string;
    approved_by: string;
    created_at: string;
    store_id: number;
    store_name: string;
    items_count: number;
    purchase_order_id: number;
}

export interface RequestInventory {
    id_request: number,
    status: string;
    code: string;
    reference: string;
    store_from_id?: number,
    store_from_name?: number,
    store_to_id: number;
    store_to_name: string;
    created_by: string;
    created_at: string;
    count_items: string;
    reason?: string,
    items: Partial<items[]>;
}

interface items {
    id: number;
    quantity: number;
    unitcost: string;
    receipt_id: number;
    article_id: number;
    article_name: string;
    article_sku: string;
    article_unit_measurement: string;
    article_category_name: string;
    article_brand_name: string;
    destinationReference?: string;
    newQuantity?: string;
    difference?: string;
}

interface MaterialReceipts {
    id: number;
    status: string;
    createdBy: string;
    createdAt: string;
    items: [{
        id: number;
        quantity: number;
        unitCost: string;
    }];
}

interface MaterialReceiptsResponse {
    success: boolean;
    message: string;
    data: MaterialReceipts;
}

const MaterialReceiptsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMaterialReceipts: builder.query<
            { data: MaterialReceipts[]; pagination: { page: number; total: number; totalPages: number; }; },
            { page: number, limit: number, filter?: string; store_id?: number; }
        >({
            query: ({ page, limit, filter, store_id }) => ({
                url: '/material-receipts/all',
                method: 'GET',
                params: { page, limit, filter, store_id },
            }),
        }),
        submitRequest: builder.mutation<MaterialReceiptsResponse, number>({
            query: (id) => ({
                url: `/material-receipts/submit/${id}`,
                method: 'PATCH',
            }),
            transformResponse: (response: MaterialReceiptsResponse) => response,
            invalidatesTags: ["Request"],
        }),
        approveRequest: builder.mutation<MaterialReceipts, number>({
            query: (id) => ({
                url: `/material-receipts/approve/${id}`,
                method: 'PATCH',
            }),
            transformResponse: (response: MaterialReceiptsResponse) => response.data,
            invalidatesTags: ["Request"],
        }),
        rejectRequest: builder.mutation<MaterialReceipts, number>({
            query: (id) => ({
                url: `/material-receipts/reject/${id}`,
                method: 'PATCH',
            }),
            transformResponse: (response: MaterialReceiptsResponse) => response.data,
            invalidatesTags: ["Request"],
        }),
        cancelRequest: builder.mutation<MaterialReceipts, number>({
            query: (id) => ({
                url: `/material-receipts/cancel/${id}`,
                method: 'PATCH',
            }),
            transformResponse: (response: MaterialReceiptsResponse) => response.data,
            invalidatesTags: ["Request"],
        }),
    }),
});

export const {
    useGetAllMaterialReceiptsQuery,
    useSubmitRequestMutation,
    useApproveRequestMutation,
    useRejectRequestMutation,
    useCancelRequestMutation,
} = MaterialReceiptsApi;