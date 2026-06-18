import { baseApi } from "../../../shared/store/baseApi";

export interface Service {
    id: number;
    code: string;
    description: string;
    base_price: number;
    is_active: boolean;
    requires_articles: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ServiceResponse {
    success: boolean;
    status: number;
    message: string;
    data: Service;
}

interface ServicesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: Service[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type CreateServiceDto = {
    code: string;
    description: string;
    base_price: number;
    is_active?: boolean;
    requires_articles?: boolean;
};

export type UpdateServiceDto = Partial<CreateServiceDto>;

export const servicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServicesPaginated: builder.query<
            { data: Service[]; total: number; page: number; limit: number; totalPages: number },
            { page: number; limit: number; filter?: string }
        >({
            query: ({ page, limit, filter }) => ({
                url: "/services/all",
                params: { page, limit, ...(filter ? { filter } : {}) },
            }),
            transformResponse: (response: ServicesListResponse) => ({
                data: response.data,
                total: response.total,
                page: response.page,
                limit: response.limit,
                totalPages: response.totalPages,
            }),
            providesTags: ["Service"],
        }),
        getAllServices: builder.query<Service[], void>({
            query: () => ({ url: "/services" }),
            transformResponse: (response: ServicesListResponse) => response.data,
            providesTags: ["Service"],
        }),
        getServiceById: builder.query<Service, number>({
            query: (id) => ({ url: `/services/${id}` }),
            transformResponse: (response: Service) => response,
            providesTags: ["Service"],
        }),
        createService: builder.mutation<Service, CreateServiceDto>({
            query: (body) => ({
                url: "/services",
                method: "POST",
                body,
            }),
            transformResponse: (response: ServiceResponse) => response.data,
            invalidatesTags: ["Service"],
        }),
        updateService: builder.mutation<Service, { id: number; data: UpdateServiceDto }>({
            query: ({ id, data }) => ({
                url: `/services/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: ServiceResponse) => response.data,
            invalidatesTags: ["Service"],
        }),
        deleteService: builder.mutation<void, number>({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Service"],
        }),
    }),
});

export const {
    useGetAllServicesPaginatedQuery,
    useGetAllServicesQuery,
    useGetServiceByIdQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = servicesApi;
