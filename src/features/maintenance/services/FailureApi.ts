import { baseApi } from "../../../shared/store/baseApi";

export const failureApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllFailuresCategories: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter }) => ({
                url: `maintenance/failure-categories/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
        }),
        getAllFailuresCodes: builder.query<any, { page?: number; limit?: number; filter?: string; categoryId: string; deviceTypeId: string; severityId: string; }>({
            query: ({ page = 1, limit = 10, filter, categoryId, deviceTypeId, severityId }) => ({
                url: `maintenance/failure-codes/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}&categoryId=${categoryId}&deviceTypeId=${deviceTypeId}&severityId=${severityId}`,
                method: 'GET',
            }),
        }),
        getAllFailuresSeverities: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter }) => ({
                url: `maintenance/failure-severities/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
        })
    })
});

export const {
    useGetAllFailuresCategoriesQuery,
    useGetAllFailuresCodesQuery,
    useGetAllFailuresSeveritiesQuery
} = failureApi;