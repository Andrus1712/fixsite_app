import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../../shared/store";
import { useGetPermissionsByRoleQuery } from "../../features/permissions/services/permissionApi";
import {
    setCurrentToken,
    updateModules,
    updatePermissions,
    updateRoles,
    updateTenants,
} from "../../features/auth/store/authSlice";
import { useEffect } from "react";

const ProtectedRoute = () => {
    const { isAuthenticated, data, currentRole, currentToken, currentTenant } =
        useAppSelector((state) => state.auth);
        

    const { data: permissions, refetch } = useGetPermissionsByRoleQuery(
        {
            roleId: currentRole?.id || 0,
            userId: data?.user?.id || 0,
        },
        {
            skip: !isAuthenticated || !data?.user?.id,
        }
    );

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (permissions) {
            // Se despacha solo si 'permissions' ha cambiado y existe
            dispatch(
                updatePermissions({ permissions: permissions.permission || [] })
            );
            dispatch(updateModules({ modules: permissions.modules || [] }));
            dispatch(updateRoles({ roles: permissions.roles || [] }));
            dispatch(updateTenants({ tenants: permissions.tenants || [] }));
        }
    }, [permissions, dispatch]);

    useEffect(() => {
        refetch();
    }, [currentRole, currentToken, currentTenant]);

    return <Outlet />;
};

export default ProtectedRoute;
