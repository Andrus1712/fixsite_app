import { useMemo } from "react";
import { useAppSelector } from "../../../shared/store";
import type { WorkOrder } from "../models/OrderModel";

export interface OrderPermissions {
    isTechnicianOwner: boolean;
    isAdmin: boolean;
    canPerformTechnicianAction: boolean;
    canPerformAdminAction: boolean;
}

/**
 * Hook that computes role-based permissions for a given work order.
 *
 * - `isTechnicianOwner`: current user is the assigned technician
 * - `isAdmin`: current role is "Administrator" or "Receptionist"
 * - `canPerformTechnicianAction`: user is the owner AND order has an assigned technician
 * - `canPerformAdminAction`: user has admin/receptionist role
 */
export function useOrderPermissions(order: WorkOrder): OrderPermissions {
    const userId = useAppSelector((state) => state.auth.data?.user.id ?? null);
    const currentRoleName = useAppSelector((state) => state.auth.currentRole?.name ?? null);

    const permissions = useMemo<OrderPermissions>(() => {
        const isTechnicianOwner =
            userId !== null && order.assigned_technician_id !== null && userId === order.assigned_technician_id;

        const isAdmin =
            currentRoleName === "Administrador" || currentRoleName === "Receptionist";

        const canPerformTechnicianAction =
            isTechnicianOwner && order.assigned_technician_id !== null;

        const canPerformAdminAction = isAdmin;

        return {
            isTechnicianOwner,
            isAdmin,
            canPerformTechnicianAction,
            canPerformAdminAction,
        };
    }, [userId, currentRoleName, order.assigned_technician_id]);

    return permissions;
}
