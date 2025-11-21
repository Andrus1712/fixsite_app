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

    if (result.error) {
        // Error de conexión (ERR_CONNECTION_REFUSED)
        if (result.error.status === 'FETCH_ERROR') {
            alert('Error de conexión: El servicio no está disponible. Por favor, inténtalo más tarde.');
            return result;
        }
        
        // Token expirado o inválido
        if (result.error.status === 401) {
            await baseQuery({ url: 'auth/logout', method: 'POST' }, api, extraOptions);
            api.dispatch(logout());
            window.location.href = '/login';
        }
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

    // Deshabilitar reintentos automáticos
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,

    // Endpoints se definen en las APIs de los features, no aquí.
    endpoints: () => ({}),
});