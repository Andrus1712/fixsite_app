import { baseApi } from "../../../shared/store/baseApi";
import type { LoginResponse } from "../models/LoginResponse";

// Define tu feature-specific API slice extendiendo la baseApi
export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Ejemplo de Query (petición GET)
        getUsers: builder.query<any[], void>({
            query: () => 'users', // Se concatena con la baseUrl de baseApi
            providesTags: ['User'], // Proporciona tags para el caching
        }),

        // Ejemplo de Mutation (petición POST)
        createUser: builder.mutation<any, Partial<any>>({
            query: (newUser) => ({
                url: 'users',
                method: 'POST',
                body: newUser,
            }),
            // Invalida los tags 'User' para forzar el refetch de getUsers
            invalidatesTags: ['User'],
        }),

        authUser: builder.mutation<LoginResponse, { username: string, password: string; }>({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

// RTK Query genera automáticamente hooks personalizados para cada endpoint
export const { useGetUsersQuery, useCreateUserMutation, useAuthUserMutation } = authApi;

// Asegúrate de añadir este slice a la propiedad 'reducer' en 'store/index.ts'
// si no estás inyectando los endpoints en la baseApi.