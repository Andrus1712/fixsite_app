import { baseApi } from "../../../shared/store/baseApi";

export const TechnicianApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTechnicnians: builder.query<any, { page?: number; limit?: number | string; filter?: string; } | void>({
            query: (params) => {
                const { page = 1, limit = 10, filter } = params || {};
                return {
                    url: `technicians/all?page=${page}&limit=${limit}${filter ? `&filter=${filter}` : ''}`,
                    method: 'GET',
                };
            }
        }),
        saveTechnician: builder.mutation<any, any>({
            query: (data) => ({
                url: `technicians/create`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetAllTechnicniansQuery, useSaveTechnicianMutation } = TechnicianApi;