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

// Inventory
const BrandPage = lazy(() => import("../../features/inventory/brand/pages/BrandPage"));
const CreateEditBrandPage = lazy(() => import("../../features/inventory/brand/pages/CreateEditBrandPage"));
// const ShowBrandPage = lazy(() => import("../../features/inventory/brand/pages/ShowBrandPage"));

const CategoryPage = lazy(() => import("../../features/inventory/category/pages/CategoryPage"));
const CreateEditCategoryPage = lazy(() => import("../../features/inventory/category/pages/CreateEditCategoryPage"));
// const ShowCategoryPage = lazy(() => import("../../features/inventory/category/pages/ShowCategoryPage"));

const ArticlePage = lazy(() => import("../../features/inventory/article/pages/ArticlePage"));
const CreateEditArticlePage = lazy(() => import("../../features/inventory/article/pages/CreateEditArticlePage"));

//Store
const StorePage = lazy(() => import("../../features/inventory/store/pages/StorePage"));
const ShowStorePage = lazy(() => import("../../features/inventory/store/pages/ShowStorePage"));

// material-receipts
const CreateMaterialReceiptsPage = lazy(() => import("../../features/inventory/movement/pages/CreateMaterialReceiptsPage"));

// stock-transfers
const CreateStockTransferPage = lazy(() => import("../../features/inventory/movement/pages/CreateStockTransferPage"));

// material-issues
const CreateMaterialIssuePage = lazy(() => import("../../features/inventory/movement/pages/CreateMaterialIssuePage"));

// inventory-adjustments
const CreateInventoryAdjustmentPage = lazy(() => import("../../features/inventory/movement/pages/CreateInventoryAdjustmentPage"));


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
    // Brand
    "brand-index": BrandPage,
    "brand-new": CreateEditBrandPage,
    "brand-edit": CreateEditBrandPage,
    "brand-show": BrandPage,
    // Categories
    "category-show": CreateEditCategoryPage,
    "category-edit": CreateEditCategoryPage,
    "category-new": CreateEditCategoryPage,
    "category-index": CategoryPage,
    // Articles
    "article-index": ArticlePage,
    "article-new": CreateEditArticlePage,
    "article-edit": CreateEditArticlePage,
    "article-show": ArticlePage,
    // Store
    "store-index": StorePage,
    "inventory-index": StorePage,
    "store-show": ShowStorePage,
    // material-receipts 
    "material-receipts-new": CreateMaterialReceiptsPage,
    // stock-transfers
    "stock-transfer-new": CreateStockTransferPage,
    // material-issues
    "material-issues-new": CreateMaterialIssuePage,
    // inventory-adjustments
    "inventory-adjustments-new": CreateInventoryAdjustmentPage,
};