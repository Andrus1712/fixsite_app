import { baseApi } from "../../../shared/store/baseApi";

export interface ServiceArticle {
    id: number;
    service_id: number;
    article_id: number;
    article_name: string;
    article_sku: string;
    unit_measurement: string;
    default_quantity: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ServiceArticleResponse {
    success: boolean;
    status: number;
    message: string;
    data: ServiceArticle;
}

interface ServiceArticlesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: ServiceArticle[];
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        total: number;
    };
}

export type CreateServiceArticleDto = {
    service_id: number;
    article_id: number;
    default_quantity: number;
    is_active: boolean;
};

export type UpdateServiceArticleDto = {
    default_quantity?: number;
    is_active?: boolean;
};

export const serviceArticleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceArticles: builder.query<
            { data: ServiceArticle[]; pagination: { page: number; limit: number; totalPages: number; total: number } },
            { service_id: number; page: number; limit: number; filter?: string }
        >({
            query: ({ service_id, page, limit, filter }) => ({
                url: "/service-articles",
                params: { service_id, page, limit, ...(filter ? { filter } : {}) },
            }),
            transformResponse: (response: ServiceArticlesListResponse) => ({
                data: response.data,
                pagination: response.pagination,
            }),
            providesTags: ["ServiceArticle"],
        }),
        createServiceArticle: builder.mutation<ServiceArticle, CreateServiceArticleDto>({
            query: (body) => ({
                url: "/service-articles",
                method: "POST",
                body,
            }),
            transformResponse: (response: ServiceArticleResponse) => response.data,
            invalidatesTags: ["ServiceArticle"],
        }),
        updateServiceArticle: builder.mutation<ServiceArticle, { id: number; data: UpdateServiceArticleDto }>({
            query: ({ id, data }) => ({
                url: `/service-articles/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response: ServiceArticleResponse) => response.data,
            invalidatesTags: ["ServiceArticle"],
        }),
        deleteServiceArticle: builder.mutation<void, number>({
            query: (id) => ({
                url: `/service-articles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ServiceArticle"],
        }),
    }),
});

export const {
    useGetServiceArticlesQuery,
    useCreateServiceArticleMutation,
    useUpdateServiceArticleMutation,
    useDeleteServiceArticleMutation,
} = serviceArticleApi;
