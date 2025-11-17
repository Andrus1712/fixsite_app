import { createBrowserRouter, type RouteObject } from "react-router";
import { lazy, createElement } from "react";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../../shared/pages/MainLayout";
import AuthLayout from "../../shared/pages/AuthLayout";
import { componentMap } from "./componentDictionary";

const ExamplePage = lazy(() => import("../../shared/pages/ExamplePage"));
const LoginPage = lazy(() => import("../../features/auth/pages/LoginPage"));
const NotFound = lazy(() => import("../../shared/pages/NotFound"));

export interface MenuItem {
    id: number;
    label: string;
    to: string;
    icon: string;
    order: number;
    index?: boolean;
    title: string;
    showMenu: boolean;
    componentKey: string;
}

export const createDynamicRouter = (menuItems: MenuItem[] = []) => {
    // Generate routes from menu items
    let indexItem;

    const dynamicRoutes = menuItems
        .filter(item => item.to !== "/auth/login" && componentMap[item.componentKey])
        .map(item => {
            if (item.index) {
                indexItem = {
                    index: item.index,
                    element: createElement(componentMap[item.componentKey]),
                    handle: {
                        ...item
                    }
                };
            }
            return {
                path: item.to.replace('/', ''),
                element: createElement(componentMap[item.componentKey]),
                handle: {
                    ...item
                }
            };
        });

    if (indexItem) {
        dynamicRoutes.unshift(indexItem);
    }
    

    const routes: RouteObject[] = [
        // landingPage
        {
            path: "/example",
            element: createElement(ExamplePage)
        },
        {
            path: "/",
            element: createElement(ProtectedRoute),
            children: [
                {
                    path: "/app",
                    element: createElement(MainLayout),
                    children: [
                        ...dynamicRoutes,
                        {
                            path: "*",
                            element: createElement(NotFound),
                            handle: {
                                notFound: true
                            }
                        }
                    ],
                },
            ],
        },
        {
            path: '/',
            element: createElement(AuthLayout),
            children: [
                {
                    path: "login",
                    element: createElement(LoginPage),
                },
                {
                    path: "register",
                    element: createElement(LoginPage),
                },
            ],
        },
    ];

    return createBrowserRouter(routes);
};