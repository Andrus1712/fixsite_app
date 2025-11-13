import type { IModules, IPermission, IRoles, ITenants } from "../../permissions/models/Permission";

export interface LoginResponse {
    _token: string,
    user: {
        id: number,
        name: string,
        username: string,
        email: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string;
    },
    roles: IRoles[],
    permission: IPermission[],
    modules: IModules[];
    tenants: ITenants[];
}

export interface logoutTenantResponse {
    tempToken: string,
    user: {
        id: number,
        name: string,
        username: string,
        email: string,
        isActive: boolean,
        createdAt: string,
        updatedAt: string;
    },
    tenants: ITenants[];
}