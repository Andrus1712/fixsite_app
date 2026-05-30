import { useState, useMemo } from "react";
import styled from "styled-components";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaFileInvoiceDollar } from "react-icons/fa";
import { Button, Tooltip, Flex } from "../../../shared/components";
import type { WorkOrder } from "../models/OrderModel";
import { useOrderPermissions } from "../hooks/useOrderPermissions";
import { truncateNotes } from "../constants/orderStatusConfig";
import { useGetOrderLogEventsQuery } from "../services/orderApi";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ConfirmStatusChangeModal } from "./ConfirmStatusChangeModal";
import { InvoiceModal } from "./Invoice";


export interface OrderStatusActionsProps {
    order: WorkOrder;
}

interface PendingTransition {
    targetStatus: number;
}

/** Statuses that allow "Cancelar orden" (admin-only) */
const CANCELLABLE_STATUSES = new Set([2, 3, 4, 8]);

// ─── Styled Components ────────────────────────────────────────────────────────

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
`;

const ButtonRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
`;

const CancelRow = styled.div`
    display: flex;
    align-items: center;
    padding-top: ${(props) => props.theme.spacing.sm};
    border-top: 1px solid ${(props) => props.theme.colors.border};
`;

const WarningBanner = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => props.theme.colors.warningLight};
    border: 1px solid ${(props) => props.theme.colors.warning};
    border-radius: ${(props) => props.theme.borderRadius.md};
    color: ${(props) => props.theme.colors.warningDark};
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
`;

const InfoCard = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => props.theme.palette.purple[50]};
    border-left: 4px solid ${(props) => props.theme.colors.purple};
    border-radius: ${(props) => props.theme.borderRadius.md};
`;

const InfoCardLabel = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.purple};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xs};
`;

const InfoCardText = styled.p`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.text};
    line-height: 1.5;
`;

const TerminalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.sm};
`;

const TerminalMessage = styled.p`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.textMuted};
`;

// ─── Component ────────────────────────────────────────────────────────────────

export const OrderStatusActions = ({ order }: OrderStatusActionsProps) => {
    const [pendingTransition, setPendingTransition] = useState<PendingTransition | null>(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const permissions = useOrderPermissions(order);

    // Fetch log events for WAITING_PARTS notes display
    const { data: logEvents } = useGetOrderLogEventsQuery(
        { orderCode: order.order_code },
        { skip: order.status !== 8 }
    );

    // Get the latest log event with status 8 for notes display
    const waitingPartsNotes = useMemo(() => {
        if (order.status !== 8 || !logEvents) return null;
        const latestWaitingEvent = [...logEvents]
            .reverse()
            .find((event) => event.status === 8);
        return latestWaitingEvent?.notes ?? null;
    }, [order.status, logEvents]);

    // Issue resolution gate: all issues must be RESOLVED (or empty) to enable "Finalizar orden"
    const allIssuesResolved = useMemo(() => {
        return order.issues.length === 0 || order.issues.every((issue) => issue.status === "RESOLVED");
    }, [order.issues]);

    const handleTransition = (targetStatus: number) => {
        setPendingTransition({ targetStatus });
    };

    const handleCloseModal = () => {
        setPendingTransition(null);
    };

    /** Cuando se marca como DELIVERED exitosamente, abrir factura */
    const handleStatusChangeSuccess = () => {
        if (pendingTransition?.targetStatus === 6) {
            setShowInvoiceModal(true);
        }
    };

    // ─── Render per status ────────────────────────────────────────────────────

    const renderStatusActions = () => {
        switch (order.status) {
            case 2: // ASSIGNED
                return renderAssignedActions();
            case 3: // DIAGNOSING
                return renderDiagnosingActions();
            case 4: // IN_REPAIR
                return renderInRepairActions();
            case 8: // WAITING_PARTS
                return renderWaitingPartsActions();
            case 5: // COMPLETED
                return renderCompletedActions();
            case 6: // DELIVERED
            case 7: // CANCELLED
                return renderTerminalState();
            default:
                return null;
        }
    };

    const renderAssignedActions = () => {
        if (order.assigned_technician_id === null) {
            return null;
        }

        const disabled = !permissions.canPerformTechnicianAction;
        const tooltipText = disabled
            ? "Solo el técnico asignado puede realizar esta acción"
            : "";

        return (
            <ButtonRow>
                <Tooltip content={tooltipText} disabled={!disabled}>
                    <Button
                        variant="primary"
                        onClick={() => handleTransition(3)}
                        disabled={disabled}
                        aria-disabled={disabled}
                    >
                        Iniciar diagnóstico
                    </Button>
                </Tooltip>
            </ButtonRow>
        );
    };

    const renderDiagnosingActions = () => {
        const disabled = !permissions.canPerformTechnicianAction;
        const tooltipText = disabled
            ? "Solo el técnico asignado puede realizar esta acción"
            : "";

        return (
            <>
                <WarningBanner>
                    <FaSearch />
                    En diagnóstico
                </WarningBanner>
                <ButtonRow>
                    <Tooltip content={tooltipText} disabled={!disabled}>
                        <Button
                            variant="primary"
                            onClick={() => handleTransition(4)}
                            disabled={disabled}
                            aria-disabled={disabled}
                        >
                            Diagnóstico completado
                        </Button>
                    </Tooltip>
                </ButtonRow>
            </>
        );
    };

    const renderInRepairActions = () => {
        const techDisabled = !permissions.canPerformTechnicianAction;
        const techTooltip = techDisabled
            ? "Solo el técnico asignado puede realizar esta acción"
            : "";

        const finalizarDisabled = techDisabled || !allIssuesResolved;
        const finalizarTooltip = techDisabled
            ? "Solo el técnico asignado puede realizar esta acción"
            : !allIssuesResolved
                ? "Resuelve todas las fallas para completar"
                : "";

        return (
            <ButtonRow>
                <Tooltip content={techTooltip} disabled={!techDisabled}>
                    <Button
                        variant="warning"
                        onClick={() => handleTransition(8)}
                        disabled={techDisabled}
                        aria-disabled={techDisabled}
                    >
                        Esperando repuestos
                    </Button>
                </Tooltip>
                <Tooltip content={finalizarTooltip} disabled={!finalizarDisabled}>
                    <Button
                        variant="success"
                        onClick={() => handleTransition(5)}
                        disabled={finalizarDisabled}
                        aria-disabled={finalizarDisabled}
                    >
                        Finalizar orden
                    </Button>
                </Tooltip>
            </ButtonRow>
        );
    };

    const renderWaitingPartsActions = () => {
        const disabled = !permissions.canPerformTechnicianAction;
        const tooltipText = disabled
            ? "Solo el técnico asignado puede realizar esta acción"
            : "";

        return (
            <>
                {waitingPartsNotes && (
                    <InfoCard>
                        <InfoCardLabel>
                            <FaInfoCircle />
                            Notas de espera
                        </InfoCardLabel>
                        <InfoCardText>{truncateNotes(waitingPartsNotes)}</InfoCardText>
                    </InfoCard>
                )}
                <ButtonRow>
                    <Tooltip content={tooltipText} disabled={!disabled}>
                        <Button
                            variant="primary"
                            onClick={() => handleTransition(4)}
                            disabled={disabled}
                            aria-disabled={disabled}
                        >
                            Continuar reparación
                        </Button>
                    </Tooltip>
                </ButtonRow>
            </>
        );
    };

    const renderCompletedActions = () => {
        if (!permissions.canPerformAdminAction) {
            return null;
        }

        return (
            <ButtonRow>
                <Button
                    variant="success"
                    onClick={() => handleTransition(6)}
                >
                    Marcar como entregado
                </Button>
            </ButtonRow>
        );
    };

    const renderTerminalState = () => {
        const isDelivered = order.status === 6;

        return (
            <TerminalContainer>
                <Flex align="center" gap="sm">
                    {isDelivered ? (
                        <FaCheckCircle color="inherit" />
                    ) : (
                        <FaTimesCircle color="inherit" />
                    )}
                    <OrderStatusBadge status={order.status} />
                </Flex>
                <TerminalMessage>
                    {isDelivered
                        ? "Esta orden ha sido entregada. No hay más acciones disponibles."
                        : "Esta orden ha sido cancelada. No hay más acciones disponibles."}
                </TerminalMessage>
                {isDelivered && (
                    <ButtonRow>
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<FaFileInvoiceDollar />}
                            onClick={() => setShowInvoiceModal(true)}
                        >
                            Ver factura
                        </Button>
                    </ButtonRow>
                )}
            </TerminalContainer>
        );
    };

    const renderCancelButton = () => {
        if (!CANCELLABLE_STATUSES.has(order.status)) return null;
        if (!permissions.canPerformAdminAction) {
            return (
                <CancelRow>
                    <Tooltip content="Solo administradores pueden cancelar órdenes">
                        <Button
                            variant="danger"
                            onClick={() => handleTransition(7)}
                            disabled
                            aria-disabled={true}
                        >
                            Cancelar orden
                        </Button>
                    </Tooltip>
                </CancelRow>
            );
        }

        return (
            <CancelRow>
                <Button
                    variant="danger"
                    onClick={() => handleTransition(7)}
                >
                    Cancelar orden
                </Button>
            </CancelRow>
        );
    };

    return (
        <ActionsContainer>
            {renderStatusActions()}
            {renderCancelButton()}

            {pendingTransition && (
                <ConfirmStatusChangeModal
                    isOpen={true}
                    onClose={handleCloseModal}
                    orderCode={order.order_code}
                    currentStatus={order.status}
                    targetStatus={pendingTransition.targetStatus}
                    onSuccess={handleStatusChangeSuccess}
                />
            )}

            <InvoiceModal
                isOpen={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                orderCode={order.order_code}
            />
        </ActionsContainer>
    );
};
