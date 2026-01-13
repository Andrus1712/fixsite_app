import { Navigate, Outlet, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../shared/store";
import { useGetPermissionsByRoleQuery } from "../../features/permissions/services/permissionApi";
import { useCheckAuthQuery } from "../../features/auth/services/authApi";
import {
    logout,
    saveAuthInfo,
    updateModules,
    updatePermissions,
    updateRoles,
    updateTenants,
} from "../../features/auth/store/authSlice";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { data, currentRole } = useAppSelector(
        (state) => state.auth
    );
    const location = useLocation();
    const dispatch = useAppDispatch();

    // Solo verificar si hay sesión válida (sin datos)
    const { error: authError, isLoading: authLoading } = useCheckAuthQuery(undefined, {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    // Obtener datos completos (user, roles, tenants, permisos)
    const {
        data: permissions,
        error,
        refetch,
    } = useGetPermissionsByRoleQuery(
        {
            roleId: currentRole?.id || 0,
            userId: data?.user?.id || 0,
        },
        {
            skip: !!authError || !data?.user?.id,
        }
    );

    // Validar en cada cambio de ruta
    useEffect(() => {
        if (!authError && currentRole?.id && data?.user?.id) {
            refetch();
        }
    }, [location.pathname, authError, currentRole?.id, data?.user?.id]);

    useEffect(() => {
        if (
            (error && "status" in error && (error.status === 401 || error.status === 403)) ||
            (authError && "status" in authError && (authError.status === 401 || authError.status === 403))
        ) {
            dispatch(logout());
            return;
        }

        if (permissions) {
            dispatch(
                updatePermissions({ permissions: permissions.permission || [] })
            );
            dispatch(updateModules({ modules: permissions.modules || [] }));
            dispatch(updateRoles({ roles: permissions.roles || [] }));
            dispatch(updateTenants({ tenants: permissions.tenants || [] }));
        }
    }, [permissions, error, authError, dispatch]);

    if (authLoading) {
        return <div>Verificando autenticación...</div>;
    }

    if (authError) {
        return <Navigate to="/login" replace />;
    }

    // Si no hay datos de usuario, mostrar loading
    if (!data?.user) {
        return <div>Cargando datos de usuario...</div>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
