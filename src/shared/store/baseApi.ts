import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logout } from '../../features/auth/store/authSlice';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: 'include', // Incluir cookies automáticamente
});

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // Inject X-Tenant-ID header from the active tenant in the Redux store
    const state = api.getState() as { auth: { currentTenant: { id: number } | null } };
    const tenantId = state.auth?.currentTenant?.id;

    let modifiedArgs = args;
    if (tenantId) {
        if (typeof args === 'string') {
            modifiedArgs = { url: args, headers: { 'X-Tenant-ID': String(tenantId) } };
        } else {
            modifiedArgs = {
                ...args,
                headers: {
                    ...(args as FetchArgs).headers,
                    'X-Tenant-ID': String(tenantId),
                },
            };
        }
    }

    const result = await rawBaseQuery(modifiedArgs, api, extraOptions);

    if (result.error) {
        // Error de conexión (ERR_CONNECTION_REFUSED)
        if (result.error.status === 'FETCH_ERROR') {
            alert('Error de conexión: El servicio no está disponible. Por favor, inténtalo más tarde.');
            return result;
        }

        // Token expirado o inválido
        if (result.error.status === 401) {
            await rawBaseQuery({ url: 'auth/logout', method: 'POST' }, api, extraOptions);
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
    reducerPath: "baseApi",

    // Función para realizar las solicitudes HTTP con interceptor de 401
    baseQuery: baseQueryWithReauth,

    // Tags para el caching y la invalidación (centralizados o definidos en cada feature)
    tagTypes: [
        "User",
        "Product",
        "Permission",
        "Order",
        "Role",
        "Component",
        "Tenant",
        "Brand",
        "Category",
        "Article",
        "Store",
        "Request",
        "OrderService",
        "Service",
        "ServiceArticle",
        "FailureCode",
        "ServiceOrderType",
    ],

    // Deshabilitar reintentos automáticos
    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,

    // Endpoints se definen en las APIs de los features, no aquí.
    endpoints: () => ({}),
});