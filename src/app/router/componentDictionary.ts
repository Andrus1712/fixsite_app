import { lazy } from "react";

// Discionario de paginas

const ExamplePage = lazy(() => import("../../shared/pages/ExamplePage"));
// const UserPage = lazy(() => import("../../modules/users/presentation/pages/UserPage"));
// const DashboardPage = lazy(() => import("../../modules/dashboard/presentation/pages/DashboardPage"));
// const SettingsPage = lazy(() => import("../../modules/settings/presentation/pages/SettingsPage"));
// Ordenes
const OrderPage = lazy(() => import("../../features/orders/pages/OrdersPage"));
const InfoOrderPage = lazy(() => import("../../features/orders/pages/InfoOrderPage"));
const NewOrderPage = lazy(() => import("../../features/orders/pages/NewOrderpage"));

// ROles
const RolesPage = lazy(() => import("../../features/Roles/pages/index"));
const NewRolPage = lazy(() => import("../../features/Roles/pages/NewRolPage"));
const EditRolPage = lazy(() => import("../../features/Roles/pages/EditRolPage"));
// Users
const UsersPage = lazy(() => import("../../features/users/pages/index"));
const NewUserPage = lazy(() => import("../../features/users/pages/NewUserPage"));
const EditUserPage = lazy(() => import("../../features/users/pages/EditUserPage"));
// Module
const ModulePage = lazy(() => import("../../features/permissions/pages/ModulesPage"));
const NewModulePage = lazy(() => import("../../features/permissions/pages/NewModulePage"));
const EditModulePage = lazy(() => import("../../features/permissions/pages/EditModulePage"));
// Components
const ComponentsPage = lazy(() => import("../../features/permissions/pages/ComponentsPage"));
const NewComponentPage = lazy(() => import("../../features/permissions/pages/NewComponentPage"));
const EditComponentPage = lazy(() => import("../../features/permissions/pages/EditComponentPage"));
// Permission
const PermissionsPage = lazy(() => import("../../features/permissions/pages/PermissionsPage"));
const NewPermissionPage = lazy(() => import("../../features/permissions/pages/NewPermissionPage"));
const EditPermissionPage = lazy(() => import("../../features/permissions/pages/EditPermissionPage"));
// Tecnicos
const TechnicianPage = lazy(() => import("../../features/technician/pages/TechnicianPage"));
const NewTechnicianPage = lazy(() => import("../../features/technician/pages/NewTechnicianPage"));
// const EditTechnicianPage = lazy(() => import("../../features/technician/pages/EditTechnicianPage"));



export const componentMap: Record<string, React.ComponentType> = {
    "user-index": UsersPage,
    "users-new": NewUserPage,
    "user-edit": EditUserPage,
    "dashboard-index": ExamplePage,
    // "settings-index": SettingsPage,
    // "settings-show": SettingsPage,
    "order-index": OrderPage,
    "order-new": NewOrderPage,
    "order-info": InfoOrderPage,
    // Roles
    "roles-index": RolesPage,
    "roles-new": NewRolPage,
    "role-edit": EditRolPage,
    // Modules
    "module-index": ModulePage,
    "module-new": NewModulePage,
    "module-edit": EditModulePage,
    // Components
    "component-index": ComponentsPage,
    "component-new": NewComponentPage,
    "component-edit": EditComponentPage,
    // Permissions
    "permission-index": PermissionsPage,
    "permission-new": NewPermissionPage,
    "permission-edit": EditPermissionPage,
    //Servicices
    // Tecnicos
    "technician-index": TechnicianPage,
    "technician-new": NewTechnicianPage,
    "technician-edit": TechnicianPage,
};