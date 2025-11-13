import { baseApi } from "../../../shared/store/baseApi";

export const modulesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getModules: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `permissions/modules/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Module'],
        }),
        getModuleById: builder.query<any, number>({
            query: (id) => ({
                url: `permissions/modules/${id}`,
                method: 'GET',
            }),
            providesTags: ['Module'],
        }),
        saveModule: builder.mutation<any, { name: string, description: string, icon: string, active: boolean }>({
            query: (newModule) => ({
                url: 'permissions/modules',
                method: 'POST',
                body: newModule,
            }),
            invalidatesTags: ['Module'],
        }),
        updateModule: builder.mutation<any, { id: number, name: string, description: string, icon: string, active: boolean }>({
            query: ({ id, ...module }) => ({
                url: `permissions/modules/${id}`,
                method: 'PUT',
                body: module,
            }),
            invalidatesTags: ['Module'],
        }),
        deleteModule: builder.mutation<any, number>({
            query: (id) => ({
                url: `permissions/modules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Module'],
        }),
    })
});

export const { 
    useGetModulesQuery, 
    useGetModuleByIdQuery, 
    useSaveModuleMutation, 
    useUpdateModuleMutation, 
    useDeleteModuleMutation 
} = modulesApi;