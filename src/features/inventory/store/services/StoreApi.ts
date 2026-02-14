import { baseApi } from "../../../../shared/store/baseApi";

export interface Store {
    id: number;
    name: string;
    type: string;
    active: string;
    created_at: string;
}

interface StoreResponse {
    success: boolean;
    message: string;
    data: Store;
}

interface StoreInventory {
    articles_id: number;
    articles_name: string;
    articles_sku: string;
    inventory_created_at: string;
    inventory_id: string;
    inventory_max_stock: number;
    inventory_min_stock: number;
    inventory_stock: number;
    inventory_updated_at: string;
    stores_id: number;
    stores_name: string;
    stores_type: string;
    articles_description: string;
    article_categories_name: string;
    article_brands_name: string;
    articles_unit_measurement: string;
}

interface StoresListResponse {
    success: boolean;
    status: number;
    message: string;
    data: Store[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

interface StoresInventoryListResponse {
    success: boolean;
    status: number;
    message: string;
    data: StoreInventory[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}


interface RequestListResponse {
    success: boolean;
    status: number;
    message: string;
    data: RequestInventory[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
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


const StoreApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStores: builder.query<
            { data: Store[]; pagination: { page: number; total: number; totalPages: number; }; },
            { page: number; limit: number; filter?: string; }
        >({
            query: ({ page, limit, filter }) => ({
                url: `/stores/all`,
                params: { page, limit, filter },
                method: 'GET',
            }),
            transformResponse: (response: StoresListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Store"],
        }),
        getStoreInventoryById: builder.query<
            { data: StoreInventory[]; pagination: { page: number; total: number; totalPages: number; }; },
            { store_id: number; page: number; limit: number; filter?: string; }
        >({
            query: ({ store_id, page, limit, filter }) => ({
                url: `/stores/inventory/${store_id}`,
                params: { page, limit, filter },
                method: 'GET',
            }),
            transformResponse: (response: StoresInventoryListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Store"],
        }),
        getAllRequestByStoreId: builder.query<
            { data: RequestInventory[]; pagination: { page: number; total: number; totalPages: number; }; },
            { page: number, limit: number, filter?: string; store_id?: number; status?: string; }
        >({
            query: ({ page, limit, filter, store_id, status }) => ({
                url: `stores/requests/all/${store_id}`,
                method: 'GET',
                params: { page, limit, filter, store_id, status },
            }),
            transformResponse: (response: RequestListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Request"],
        }),
        updateStoreInventory: builder.mutation<
            StoreResponse,
            { inventory_id: string; max_stock: number; min_stock: number; alert_enabled: boolean; }
        >({
            query: ({ inventory_id, ...body }) => ({
                url: `/stores/config-inventory/${inventory_id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ["Store"],
        }),
    })
});

export const { useGetAllStoresQuery, useGetStoreInventoryByIdQuery, useUpdateStoreInventoryMutation, useGetAllRequestByStoreIdQuery } = StoreApi;