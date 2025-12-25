import { baseApi } from "../../../shared/store/baseApi";

export const infoDevicesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Device Types
        getDeviceTypes: builder.query<any, void>({
            query: () => 'info-devices/device-types',
            keepUnusedDataFor: 0,
        }),
        getDeviceTypesAll: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `info-devices/device-types/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getDeviceTypeById: builder.query<any, number>({
            query: (id) => `info-devices/device-types/${id}`,
            keepUnusedDataFor: 0,
        }),
        createDeviceType: builder.mutation<any, any>({
            query: (data) => ({
                url: 'info-devices/device-types',
                method: 'POST',
                body: data,
            }),
        }),
        updateDeviceType: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `info-devices/device-types/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteDeviceType: builder.mutation<any, number>({
            query: (id) => ({
                url: `info-devices/device-types/${id}`,
                method: 'DELETE',
            }),
        }),

        // Device Brands
        getDeviceBrands: builder.query<any, void>({
            query: () => 'info-devices/device-brands',
            keepUnusedDataFor: 0,
        }),
        getDeviceBrandsAll: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `info-devices/device-brands/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getDeviceBrandById: builder.query<any, number>({
            query: (id) => `info-devices/device-brands/${id}`,
            keepUnusedDataFor: 0,
        }),
        createDeviceBrand: builder.mutation<any, any>({
            query: (data) => ({
                url: 'info-devices/device-brands',
                method: 'POST',
                body: data,
            }),
        }),
        updateDeviceBrand: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `info-devices/device-brands/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteDeviceBrand: builder.mutation<any, number>({
            query: (id) => ({
                url: `info-devices/device-brands/${id}`,
                method: 'DELETE',
            }),
        }),

        // Device Models
        getDeviceModels: builder.query<any, { brandId?: number; typeId?: number; }>({
            query: ({ brandId, typeId } = {}) => ({
                url: `info-devices/device-models${brandId ? `?brandId=${brandId}` : ''}${typeId ? `${brandId ? '&' : '?'}typeId=${typeId}` : ''}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getDeviceModelsAll: builder.query<any, { page?: number; limit?: number; filter?: string; brandId?: number; typeId?: number; }>({
            query: ({ page = 1, limit = 10, filter, brandId, typeId } = {}) => ({
                url: `info-devices/device-models/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}${brandId ? `&brandId=${brandId}` : ''}${typeId ? `&typeId=${typeId}` : ''}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getDeviceModelById: builder.query<any, number>({
            query: (id) => `info-devices/device-models/${id}`,
            keepUnusedDataFor: 0,
        }),
        createDeviceModel: builder.mutation<any, any>({
            query: (data) => ({
                url: 'info-devices/device-models',
                method: 'POST',
                body: data,
            }),
        }),
        updateDeviceModel: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `info-devices/device-models/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deleteDeviceModel: builder.mutation<any, number>({
            query: (id) => ({
                url: `info-devices/device-models/${id}`,
                method: 'DELETE',
            }),
        }),

        // Password Types
        getPasswordTypes: builder.query<any, void>({
            query: () => 'info-devices/password-types',
            keepUnusedDataFor: 0,
        }),
        getPasswordTypesAll: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `info-devices/password-types/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,
        }),
        getPasswordTypeById: builder.query<any, number>({
            query: (id) => `info-devices/password-types/${id}`,
            keepUnusedDataFor: 0,
        }),
        createPasswordType: builder.mutation<any, any>({
            query: (data) => ({
                url: 'info-devices/password-types',
                method: 'POST',
                body: data,
            }),
        }),
        updatePasswordType: builder.mutation<any, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `info-devices/password-types/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        deletePasswordType: builder.mutation<any, number>({
            query: (id) => ({
                url: `info-devices/password-types/${id}`,
                method: 'DELETE',
            }),
        }),
    })
});

export const {
    // Device Types
    useGetDeviceTypesQuery,
    useGetDeviceTypesAllQuery,
    useGetDeviceTypeByIdQuery,
    useCreateDeviceTypeMutation,
    useUpdateDeviceTypeMutation,
    useDeleteDeviceTypeMutation,
    
    // Device Brands
    useGetDeviceBrandsQuery,
    useGetDeviceBrandsAllQuery,
    useGetDeviceBrandByIdQuery,
    useCreateDeviceBrandMutation,
    useUpdateDeviceBrandMutation,
    useDeleteDeviceBrandMutation,
    
    // Device Models
    useGetDeviceModelsQuery,
    useGetDeviceModelsAllQuery,
    useGetDeviceModelByIdQuery,
    useCreateDeviceModelMutation,
    useUpdateDeviceModelMutation,
    useDeleteDeviceModelMutation,
    
    // Password Types
    useGetPasswordTypesQuery,
    useGetPasswordTypesAllQuery,
    useGetPasswordTypeByIdQuery,
    useCreatePasswordTypeMutation,
    useUpdatePasswordTypeMutation,
    useDeletePasswordTypeMutation,
} = infoDevicesApi;