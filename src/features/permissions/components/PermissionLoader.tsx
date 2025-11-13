import { useEffect, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/store";
import {
    useGetPermissionsByRoleQuery,
    useGetPermissionsQuery,
} from "../services/permissionApi";
import { updateModules, updatePermissions } from "../../auth/store/authSlice";

interface PermissionLoaderProps {
    children: ReactNode;
}

export const PermissionLoader = ({ children }: PermissionLoaderProps) => {
    const { isAuthenticated, data, currentRole } = useAppSelector(
        (state) => state.auth
    );
    const dispatch = useAppDispatch(); // Obtén el dispatch

    // Cargar permisos automáticamente cuando está autenticado
    // const { data: permissions } = useGetPermissionsQuery(
    //     data?.user?.id.toString() || "",
    //     {
    //         skip: !isAuthenticated || !data?.user?.id,
    //     }
    // );
    const { data: permissions } = useGetPermissionsByRoleQuery(
        {
            roleId: currentRole?.id || 0,
            userId: data?.user?.id || 0,
        },
        {
            skip: !isAuthenticated || !data?.user?.id,
        }
    );

    // Usa useEffect para despachar las acciones
    // Esto previene el bucle de renderizado.
    useEffect(() => {
        if (permissions) {
            // Se despacha solo si 'permissions' ha cambiado y existe
            dispatch(
                updatePermissions({ permissions: permissions.permission || [] })
            );
            dispatch(updateModules({ modules: permissions.modules || [] }));
        }
    }, [permissions, dispatch]); // Dependencias: solo se ejecuta cuando permissions cambie

    return <>{children}</>;
};
