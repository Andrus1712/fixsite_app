import { baseApi } from "../../../shared/store/baseApi";

export const componentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getComponents: builder.query<any, { page?: number; limit?: number; filter?: string; }>({
            query: ({ page = 1, limit = 10, filter } = {}) => ({
                url: `permissions/components/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Component'],
        }),
        getComponentById: builder.query<any, number>({
            query: (id) => ({
                url: `permissions/components/${id}`,
                method: 'GET',
            }),
            providesTags: ['Component'],
        }),
        saveComponent: builder.mutation<any, { 
            label: string, 
            title: string, 
            componentKey: string, 
            option: string, 
            action: string, 
            path: string, 
            icon?: string, 
            order: number, 
            showMenu: boolean, 
            active: boolean, 
            type: string,
            moduleIds: number[]
        }>({
            query: (newComponent) => ({
                url: 'permissions/components',
                method: 'POST',
                body: newComponent,
            }),
            invalidatesTags: ['Component'],
        }),
        updateComponent: builder.mutation<any, { 
            id: number, 
            label: string, 
            title: string, 
            componentKey: string, 
            option: string, 
            action: string, 
            path: string, 
            icon?: string, 
            order: number, 
            showMenu: boolean, 
            active: boolean, 
            type: string,
            moduleIds: number[]
        }>({
            query: ({ id, ...component }) => ({
                url: `permissions/components/${id}`,
                method: 'PUT',
                body: component,
            }),
            invalidatesTags: ['Component'],
        }),
        deleteComponent: builder.mutation<any, number>({
            query: (id) => ({
                url: `permissions/components/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Component'],
        }),
    })
});

export const { 
    useGetComponentsQuery, 
    useGetComponentByIdQuery, 
    useSaveComponentMutation, 
    useUpdateComponentMutation, 
    useDeleteComponentMutation 
} = componentsApi;