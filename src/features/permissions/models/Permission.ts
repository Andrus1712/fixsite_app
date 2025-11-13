export interface IPermission {
    id: number,
    userId: number,
    key?: string,
    componentId: number,
    assignedBy: string,
    componentKey: string,
    option: string,
    action: string,
    createdAt: string,
    updatedAt: string,
    label: string;
    title: string;
    path: string;
    icon: string;
    order: number;
    showMenu: boolean;
    active: string;
}

export interface IRoles {
    id: number,
    name: string,
    description: string,
    active: boolean,
    createdAt: string,
    updatedAt: string;
}

export interface IModules {
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
}

export interface IComponents {
    id: number,
    label: string,
    title: string,
    componentKey: string,
    option: string,
    action: string,
    path: string,
    icon: string,
    order: number,
    showMenu: boolean,
    active: boolean,
    createdAt: string,
    updatedAt: string,
}

export interface ITenants {
    id: number,
    name: string,
    subdomain: string,
    databaseName: boolean;
}