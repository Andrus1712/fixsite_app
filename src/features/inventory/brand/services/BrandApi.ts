import { baseApi } from "../../../../shared/store/baseApi";

interface Brand {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface BrandResponse {
    success: boolean;
    message: string;
    data: Brand;
}

interface BrandsListResponse {
    success: boolean;
    status: number;
    message: string;
    data: Brand[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export const BrandApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBrands: builder.query<
            { data: Brand[]; pagination: { page: number; total: number; totalPages: number; }; },
            { page: number; limit: number; filter?: string; }
        >({
            query: ({ page, limit, filter }) => ({
                url: "/article-brands/all",
                params: { page, limit, filter },
            }),
            transformResponse: (response: BrandsListResponse) => ({
                data: response.data,
                pagination: {
                    page: response.pagination.page,
                    total: response.pagination.total,
                    totalPages: response.pagination.totalPages,
                },
            }),
            providesTags: ["Brand"],
        }),
        getBrandById: builder.query<Brand, number>({
            query: (id) => `/article-brands/${id}`,
            transformResponse: (response: BrandResponse) => response.data,
            providesTags: ["Brand"],
        }),
        createBrand: builder.mutation<Brand, { name: string; }>({
            query: (body) => ({
                url: "/article-brands/create",
                method: "POST",
                body,
            }),
            transformResponse: (response: BrandResponse) => response.data,
            invalidatesTags: ["Brand"],
        }),
        updateBrand: builder.mutation<Brand, { id: number; name: string; }>({
            query: ({ id, name }) => ({
                url: `/article-brands/update/${id}`,
                method: "PATCH",
                body: { name },
            }),
            transformResponse: (response: BrandResponse) => response.data,
            invalidatesTags: ["Brand"],
        }),
        deleteBrand: builder.mutation<Brand, number>({
            query: (id) => ({
                url: `/article-brands/delete/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: BrandResponse) => response.data,
            invalidatesTags: ["Brand"],
        }),
    }),
});

export const {
    useGetAllBrandsQuery,
    useGetBrandByIdQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = BrandApi;
