import { useMemo } from "react";
import type { WorkOrder } from "../models/OrderModel";
import { useOrderPermissions } from "./useOrderPermissions";

interface StatusActionOption {
    id: string;
    label: string;
    targetStatus: number;
    disabled?: boolean;
    isDanger?: boolean;
}

interface UseOrderStatusActionsResult {
    /** Status transition options for the dropdown */
    statusOptions: StatusActionOption[];
    /** Whether the "Finalizar orden" button should be disabled due to unresolved issues */
    hasUnresolvedIssues: boolean;
}

/**
 * Hook that computes available status transition actions based on
 * current order status and user permissions.
 * Returns options ready to be used in a DropdownButton.
 */
export function useOrderStatusActions(order: WorkOrder): UseOrderStatusActionsResult {
    const permissions = useOrderPermissions(order);

    const allIssuesResolved = useMemo(() => {
        return order.issues.length === 0 || order.issues.every((issue) => issue.status === "RESOLVED");
    }, [order.issues]);

    const statusOptions = useMemo<StatusActionOption[]>(() => {
        const options: StatusActionOption[] = [];

        switch (order.status) {
            case 2: // ASSIGNED
                if (order.assigned_technician_id !== null) {
                    options.push({
                        id: "transition_diagnose",
                        label: "Iniciar diagnóstico",
                        targetStatus: 3,
                        disabled: !permissions.canPerformTechnicianAction,
                    });
                }
                break;

            case 3: // DIAGNOSING
                options.push({
                    id: "transition_repair",
                    label: "Diagnóstico completado",
                    targetStatus: 4,
                    disabled: !permissions.canPerformTechnicianAction,
                });
                break;

            case 4: // IN_REPAIR
                options.push({
                    id: "transition_waiting",
                    label: "Esperando repuestos",
                    targetStatus: 8,
                    disabled: !permissions.canPerformTechnicianAction,
                });
                options.push({
                    id: "transition_complete",
                    label: "Finalizar orden",
                    targetStatus: 5,
                    disabled: !permissions.canPerformTechnicianAction || !allIssuesResolved,
                });
                break;

            case 8: // WAITING_PARTS
                options.push({
                    id: "transition_resume",
                    label: "Continuar reparación",
                    targetStatus: 4,
                    disabled: !permissions.canPerformTechnicianAction,
                });
                break;

            case 5: // COMPLETED
                if (permissions.canPerformAdminAction) {
                    options.push({
                        id: "transition_deliver",
                        label: "Marcar como entregado",
                        targetStatus: 6,
                    });
                }
                break;

            // DELIVERED (6) and CANCELLED (7) are terminal — no options
            default:
                break;
        }

        // Cancel option for eligible statuses (admin-only)
        const cancellableStatuses = new Set([2, 3, 4, 8]);
        if (cancellableStatuses.has(order.status)) {
            options.push({
                id: "transition_cancel",
                label: "Cancelar orden",
                targetStatus: 7,
                isDanger: true,
                disabled: !permissions.canPerformAdminAction,
            });
        }

        return options;
    }, [order.status, order.assigned_technician_id, permissions, allIssuesResolved]);

    return {
        statusOptions,
        hasUnresolvedIssues: !allIssuesResolved,
    };
}
