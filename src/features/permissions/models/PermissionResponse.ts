import type { IComponents, IPermission, IRoles, ITenants } from "./Permission";

export interface PermissionResponse {
    permission: IPermission[],
    roles: IRoles[],
    modules: [{
        id: number,
        label: string,
        title: string,
        moduleKey: string,
        icon: string,
        order: number,
        active: boolean,
        createdAt: string,
        updatedAt: string,
        components: IComponents[];
    }];
    tenants: ITenants[];
}