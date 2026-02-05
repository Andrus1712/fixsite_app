import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout } from '../../features/auth/store/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    credentials: 'include', // Incluir cookies automáticamente
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // Token expirado o inválido, limpiar cookies y hacer logout
        await baseQuery({ url: 'auth/logout', method: 'POST' }, api, extraOptions);
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
    tagTypes: ['User', 'Product', 'Permission', 'Order', 'Role', 'Component', 'Tenant'],

    // Endpoints se definen en las APIs de los features, no aquí.
    endpoints: () => ({}),
});