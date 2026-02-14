import { baseApi } from "../../../../shared/store/baseApi";

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface CategoryResponse {
    success: boolean;
    message: string;
    data: Category;
}

interface CategoriesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: Category[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const CategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<
            { data: Category[]; pagination: { page: number; total: number; totalPages: number } },
            { page: number; limit: number; filter?: string }
        >({
            query: ({ page, limit, filter }) => ({
                url: "/article-categories/all",
                params: { page, limit, filter },
            }),
            transformResponse: (response: CategoriesListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Category"],
        }),
        getCategoryById: builder.query<Category, number>({
            query: (id) => `/article-categories/${id}`,
            transformResponse: (response: CategoryResponse) => response.data,
            providesTags: ["Category"],
        }),
        createCategory: builder.mutation<Category, { name: string }>({
            query: (body) => ({
                url: "/article-categories/create",
                method: "POST",
                body,
            }),
            transformResponse: (response: CategoryResponse) => response.data,
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation<Category, { id: number; name: string }>({
            query: ({ id, name }) => ({
                url: `/article-categories/update/${id}`,
                method: "PATCH",
                body: { name },
            }),
            transformResponse: (response: CategoryResponse) => response.data,
            invalidatesTags: ["Category"],
        }),
        deleteCategory: builder.mutation<Category, number>({
            query: (id) => ({
                url: `/article-categories/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: CategoryResponse) => response.data,
            invalidatesTags: ["Category"],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = CategoryApi;
