import { RouterProvider } from "react-router";
import { createDynamicRouter, type MenuItem } from "./CreateDynamicRouter";
import { useAppSelector } from "../../shared/store";
import { useMemo } from "react";
import { LoadingSpinner } from "../../shared/components";

function DynamicRoutes() {
    const { permission, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    const childPaths: MenuItem[] = useMemo(() => {
        if (!permission || permission.length <= 0) return [];

        return permission.map((c) => ({
            id: c.id,
            label: c.label,
            to: c.path,
            icon: c.icon,
            order: c.order,
            index: c.componentKey === "dashboard-index",
            title: c.title,
            showMenu: c.showMenu,
            componentKey: c.componentKey,
        }));
    }, [permission]);

    const dynamicRouter = useMemo(() => {
        if (childPaths.length === 0) {
            return createDynamicRouter([]);
        }
        return createDynamicRouter(childPaths);
    }, [childPaths, isAuthenticated]);

    if (!permission && isAuthenticated) {
        return <LoadingSpinner />;
    }

    return <RouterProvider router={dynamicRouter} />;
}

export default DynamicRoutes;
