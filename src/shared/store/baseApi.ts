import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '.';
import { logout } from '../../features/auth/store/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.currentToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Token expirado o inválido, hacer logout y redirigir
        api.dispatch(logout());
        window.location.href = '/login';
    }

    return result;
};

/**
 * Define la API base con una URL base y un fetcher (fetchBaseQuery).
 * Todas las APIs específicas de features extenderán esta API base.
 */
export const baseApi = createApi({
    // path para el reducer en el store
    reducerPath: 'baseApi',

    // Función para realizar las solicitudes HTTP con interceptor de 401
    baseQuery: baseQueryWithReauth,

    // Tags para el caching y la invalidación (centralizados o definidos en cada feature)
    tagTypes: ['User', 'Product', 'Permission', 'Order', 'Role', 'Component'],

    // Endpoints se definen en las APIs de los features, no aquí.
    endpoints: () => ({}),
});