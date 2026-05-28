import { baseApi } from "../../../shared/store/baseApi";

export interface FailureCodeRelation {
    id: number;
    name: string;
}

export interface FailureSeverityRelation {
    id: number;
    name: string;
    priority: number;
}

export interface FailureCode {
    id: number;
    code: string;
    name: string;
    description?: string;
    estimatedRepairMinutes: number;
    isActive: boolean;
    deviceType: FailureCodeRelation;
    category: FailureCodeRelation;
    severity: FailureSeverityRelation;
    createdAt: string;
    updatedAt: string;
}

export interface FailureCategory {
    id: number;
    name: string;
}

export interface FailureSeverity {
    id: number;
    name: string;
    priority: number;
}

export interface DeviceType {
    id: number;
    name: string;
}

interface FailureCodeResponse {
    success: boolean;
    status: number;
    message: string;
    data: FailureCode;
}

interface FailureCodesListResponse {
    success: boolean;
    status: number;
    message: string;
    data: FailureCode[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

interface FailureCategoriesResponse {
    success: boolean;
    data: FailureCategory[];
}

interface FailureSeveritiesResponse {
    success: boolean;
    data: FailureSeverity[];
}

interface DeviceTypesResponse {
    success: boolean;
    data: DeviceType[];
}

export type CreateFailureCodeDto = {
    code: string;
    name: string;
    description?: string;
    estimatedRepairMinutes: number;
    isActive?: boolean;
    deviceType: { id: number };
    category: { id: number };
    severity: { id: number };
};

export type UpdateFailureCodeDto = Partial<CreateFailureCodeDto>;

export const failureCodesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFailureCodesPaginated: builder.query<
            { data: FailureCode[]; total: number; page: number; limit: number; totalPages: number },
            { page: number; limit: number; filter?: string; categoryId?: string; deviceTypeId?: string; severityId?: string }
        >({
            query: ({ page, limit, filter, categoryId, deviceTypeId, severityId }) => ({
                url: "/maintenance/failure-codes/all",
                params: {
                    page,
                    limit,
                    ...(filter ? { filter } : {}),
                    ...(categoryId ? { categoryId } : {}),
                    ...(deviceTypeId ? { deviceTypeId } : {}),
                    ...(severityId ? { severityId } : {}),
                },
            }),
            transformResponse: (response: FailureCodesListResponse) => ({
                data: response.data,
                total: response.total,
                page: response.page,
                limit: response.limit,
                totalPages: response.totalPages,
            }),
            providesTags: ["FailureCode"],
        }),
        getAllFailureCodes: builder.query<FailureCode[], void>({
            query: () => ({ url: "/maintenance/failure-codes" }),
            transformResponse: (response: FailureCodesListResponse) => response.data,
            providesTags: ["FailureCode"],
        }),
        getFailureCodeById: builder.query<FailureCode, number>({
            query: (id) => ({ url: `/maintenance/failure-codes/${id}` }),
            transformResponse: (response: FailureCodeResponse) => response.data,
            providesTags: ["FailureCode"],
        }),
        createFailureCode: builder.mutation<FailureCode, CreateFailureCodeDto>({
            query: (body) => ({
                url: "/maintenance/failure-codes",
                method: "POST",
                body,
            }),
            transformResponse: (response: FailureCodeResponse) => response.data,
            invalidatesTags: ["FailureCode"],
        }),
        updateFailureCode: builder.mutation<FailureCode, { id: number; data: UpdateFailureCodeDto }>({
            query: ({ id, data }) => ({
                url: `/maintenance/failure-codes/${id}`,
                method: "PUT",
                body: data,
            }),
            transformResponse: (response: FailureCodeResponse) => response.data,
            invalidatesTags: ["FailureCode"],
        }),
        deleteFailureCode: builder.mutation<void, number>({
            query: (id) => ({
                url: `/maintenance/failure-codes/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["FailureCode"],
        }),
        // Support data for selects
        getFailureCategories: builder.query<FailureCategory[], void>({
            query: () => ({ url: "/maintenance/failure-categories" }),
            transformResponse: (response: FailureCategoriesResponse) => response.data,
        }),
        getFailureSeverities: builder.query<FailureSeverity[], void>({
            query: () => ({ url: "/maintenance/failure-severities" }),
            transformResponse: (response: FailureSeveritiesResponse) => response.data,
        }),
        getDeviceTypes: builder.query<DeviceType[], void>({
            query: () => ({ url: "/info-devices/device-types" }),
            transformResponse: (response: DeviceTypesResponse) => response.data,
        }),
    }),
});

export const {
    useGetFailureCodesPaginatedQuery,
    useGetAllFailureCodesQuery,
    useGetFailureCodeByIdQuery,
    useCreateFailureCodeMutation,
    useUpdateFailureCodeMutation,
    useDeleteFailureCodeMutation,
    useGetFailureCategoriesQuery,
    useGetFailureSeveritiesQuery,
    useGetDeviceTypesQuery,
} = failureCodesApi;
