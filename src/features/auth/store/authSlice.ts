import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../models/LoginResponse";
import type { IModules, IPermission, IRoles, ITenants } from "../../permissions/models/Permission";

interface AuthState {
    isAuthenticated: boolean;
    data: LoginResponse | null;
    currentRole: IRoles | null;
    currentTenant: ITenants | null;
    globalMode: boolean;
    permission: IPermission[];
}

const initialState: AuthState = {
    isAuthenticated: false,
    data: null,
    currentRole: null,
    currentTenant: null,
    globalMode: true,
    permission: []
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveAuthInfo: (state, action: PayloadAction<LoginResponse>) => {
            state.isAuthenticated = true;
            state.data = action.payload;
            state.globalMode = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.data = null;
            state.currentRole = null;
            state.currentTenant = null;
            state.globalMode = true;
        },
        updatePermissions: (state, action: PayloadAction<{ permissions: IPermission[]; }>) => {
            if (state.data) {
                state.data.permission = action.payload.permissions;
                state.permission = action.payload.permissions;
            }
        },
        updateModules: (state, action: PayloadAction<{ modules: IModules[]; }>) => {
            if (state.data) {
                state.data.modules = action.payload.modules;
            }
        },
        updateRoles: (state, action: PayloadAction<{ roles: IRoles[]; }>) => {
            if (state.data) {
                state.data.roles = action.payload.roles;
            }
        },
        setCurrentRole: (state, action: PayloadAction<{ role: IRoles; }>) => {
            state.currentRole = action.payload.role;
        },
        updateTenants: (state, action: PayloadAction<{ tenants: ITenants[]; }>) => {
            if (state.data) {
                state.data.tenants = action.payload.tenants;
            }
        },
        setCurrentTenant: (state, action: PayloadAction<{ tenant: ITenants | null; }>) => {
            if (state.data) {
                state.currentTenant = action.payload.tenant;
            }
        },

        changeGlobalMode: (state, action: PayloadAction<boolean>) => {
            state.globalMode = action.payload;
        },

        checkAuthUser: (state, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        }
    },
});

export const {
    saveAuthInfo,
    logout,
    updatePermissions,
    updateModules,
    setCurrentRole,
    updateRoles,
    updateTenants,
    setCurrentTenant,
    changeGlobalMode,
    checkAuthUser
} = authSlice.actions;
export default authSlice.reducer;