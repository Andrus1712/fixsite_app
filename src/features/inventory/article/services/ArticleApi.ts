import { baseApi } from "../../../../shared/store/baseApi";

interface Article {
    id: number;
    sku: string;
    name: string;
    description: string;
    category_id: number;
    brand_id: number;
    unit_measurement: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

interface ArticleResponse {
    success: boolean;
    message: string;
    data: Article;
}

interface ArticlesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: Article[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const ArticleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllArticles: builder.query<
            { data: Article[]; pagination: { page: number; total: number; totalPages: number } },
            { page: number; limit: number; filter?: string }
        >({
            query: ({ page, limit, filter }) => ({
                url: "/articles/all",
                params: { page, limit, filter },
            }),
            transformResponse: (response: ArticlesListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Article"],
        }),
        getArticleById: builder.query<Article, number>({
            query: (id) => `/articles/${id}`,
            transformResponse: (response: ArticleResponse) => response.data,
            providesTags: ["Article"],
        }),
        createArticle: builder.mutation<Article, Omit<Article, "id" | "created_at" | "updated_at">>({
            query: (body) => ({
                url: "/articles/create",
                method: "POST",
                body,
            }),
            transformResponse: (response: ArticleResponse) => response.data,
            invalidatesTags: ["Article"],
        }),
        updateArticle: builder.mutation<Article, { id: number; data: Partial<Omit<Article, "id" | "created_at" | "updated_at">> }>({
            query: ({ id, data }) => ({
                url: `/articles/update/${id}`,
                method: "PATCH",
                body: data,
            }),
            transformResponse: (response: ArticleResponse) => response.data,
            invalidatesTags: ["Article"],
        }),
        deleteArticle: builder.mutation<Article, number>({
            query: (id) => ({
                url: `/articles/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: ArticleResponse) => response.data,
            invalidatesTags: ["Article"],
        }),
    }),
});

export const {
    useGetAllArticlesQuery,
    useLazyGetAllArticlesQuery,
    useGetArticleByIdQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation,
} = ArticleApi;
