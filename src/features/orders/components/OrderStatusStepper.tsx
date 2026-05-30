import { useMemo } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useGetOrderLogEventsQuery } from "../services/orderApi";
import type { OrderLogEvent } from "../services/orderApi";
import { getStatusConfig } from "../constants/orderStatusConfig";
import type { WorkOrder } from "../models/OrderModel";

// --- Types ---

interface OrderStatusStepperProps {
    order: WorkOrder;
}

type StepState = "completed" | "active" | "pending";

interface StepData {
    statusValue: number;
    label: string;
    state: StepState;
    date: string | null;
}

interface BranchIndicator {
    statusValue: number;
    label: string;
    color: string;
    date: string | null;
    attachedToStep: number;
}

// --- Constants ---

/** Normal flow sequence */
const NORMAL_FLOW: number[] = [1, 2, 3, 4, 5, 6];

/** Branching states that are shown as secondary indicators */
const BRANCHING_STATES = new Set([7, 8]);

/**
 * Determines which normal-flow step a branching state attaches to.
 * WAITING_PARTS (8) branches from IN_REPAIR (4).
 * CANCELLED (7) branches from the last completed normal-flow step.
 */
function getAttachmentStep(branchStatus: number, lastCompletedNormalStep: number): number {
    if (branchStatus === 8) return 4; // WAITING_PARTS attaches to IN_REPAIR
    // CANCELLED attaches to the last completed normal-flow step
    return lastCompletedNormalStep;
}

// --- Step classification logic ---

/**
 * Classifies each step in the normal flow based on the current order status
 * and available log events.
 */
export function classifySteps(
    currentStatus: number,
    logEvents: OrderLogEvent[]
): { steps: StepData[]; branches: BranchIndicator[] } {
    const eventByStatus = new Map<number, OrderLogEvent>();
    for (const event of logEvents) {
        // Keep the latest event per status
        if (!eventByStatus.has(event.status) || event.id > (eventByStatus.get(event.status)?.id ?? 0)) {
            eventByStatus.set(event.status, event);
        }
    }

    // Determine the position of the current status in the normal flow
    const currentFlowIndex = NORMAL_FLOW.indexOf(currentStatus);

    // If current status is a branching state, find the last normal-flow step that was completed
    const isCurrentBranching = BRANCHING_STATES.has(currentStatus);

    // Build steps
    const steps: StepData[] = NORMAL_FLOW.map((statusValue, index) => {
        const config = getStatusConfig(statusValue);
        const event = eventByStatus.get(statusValue);
        const dateStr = event ? formatEventDate(event.created_at) : null;

        let state: StepState;

        if (isCurrentBranching) {
            // When in a branching state, classify based on log events
            if (event) {
                state = "completed";
            } else {
                state = "pending";
            }
        } else if (currentFlowIndex === -1) {
            // Unknown status — only mark current as active if it matches
            state = "pending";
        } else if (index < currentFlowIndex) {
            state = "completed";
        } else if (index === currentFlowIndex) {
            state = "active";
        } else {
            state = "pending";
        }

        return {
            statusValue,
            label: config.label,
            state,
            date: dateStr,
        };
    });

    // Build branch indicators
    const branches: BranchIndicator[] = [];
    const lastCompletedNormalStep = findLastCompletedNormalStep(currentStatus, logEvents);

    for (const event of logEvents) {
        if (BRANCHING_STATES.has(event.status)) {
            const config = getStatusConfig(event.status);
            const attachedTo = getAttachmentStep(event.status, lastCompletedNormalStep);
            branches.push({
                statusValue: event.status,
                label: config.label,
                color: config.color,
                date: formatEventDate(event.created_at),
                attachedToStep: attachedTo,
            });
        }
    }

    // If current status is a branching state and no log event exists for it,
    // still show it as a branch indicator
    if (isCurrentBranching && !eventByStatus.has(currentStatus)) {
        const config = getStatusConfig(currentStatus);
        const attachedTo = getAttachmentStep(currentStatus, lastCompletedNormalStep);
        branches.push({
            statusValue: currentStatus,
            label: config.label,
            color: config.color,
            date: null,
            attachedToStep: attachedTo,
        });
    }

    return { steps, branches };
}

function findLastCompletedNormalStep(currentStatus: number, logEvents: OrderLogEvent[]): number {
    // Find the highest normal-flow status that has a log event
    let last = 1;
    for (const event of logEvents) {
        if (NORMAL_FLOW.includes(event.status) && event.status > last) {
            last = event.status;
        }
    }
    // If current status is in normal flow and higher, use it
    if (NORMAL_FLOW.includes(currentStatus) && currentStatus > last) {
        last = currentStatus;
    }
    return last;
}

function formatEventDate(isoDate: string): string {
    try {
        return format(new Date(isoDate), "dd/MM/yyyy HH:mm");
    } catch {
        return "";
    }
}

// --- Styled Components ---

const StepperContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.xs};
    overflow-x: auto;
    padding: ${(props) => props.theme.spacing.sm} 0;
`;

const StepWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    min-width: 120px;
    flex: 1;
`;

const StepRow = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const StepMarker = styled.div<{ $state: StepState }>`
    width: 28px;
    height: 28px;
    min-width: 28px;
    border-radius: ${(props) => props.theme.borderRadius.full};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: #ffffff;
    background-color: ${(props) => {
        switch (props.$state) {
            case "completed":
                return props.theme.colors.success;
            case "active":
                return props.theme.colors.primary;
            case "pending":
                return props.theme.colors.textMuted;
        }
    }};
    z-index: 1;
`;

const Connector = styled.div<{ $completed: boolean }>`
    flex: 1;
    height: 3px;
    background-color: ${(props) =>
        props.$completed ? props.theme.colors.success : props.theme.colors.border};
    margin: 0 ${(props) => props.theme.spacing.xxs};
`;

const StepContent = styled.div<{ $state: StepState }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: ${(props) => props.theme.spacing.xs};
    text-align: center;
`;

const StepLabel = styled.span<{ $state: StepState }>`
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) =>
        props.$state === "active" ? props.theme.fontWeight.bold : props.theme.fontWeight.normal};
    color: ${(props) => {
        switch (props.$state) {
            case "completed":
                return props.theme.colors.success;
            case "active":
                return props.theme.colors.primary;
            case "pending":
                return props.theme.colors.textMuted;
        }
    }};
`;

const StepDate = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.textSecondary};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;

const BranchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xs};
    margin-top: ${(props) => props.theme.spacing.xs};
`;

const BranchDot = styled.span<{ $color: string }>`
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: ${(props) => props.theme.borderRadius.full};
    background-color: ${(props) =>
        (props.theme.colors as Record<string, string>)[props.$color] ?? props.theme.colors.gray400};
`;

const BranchLabel = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.textSecondary};
`;

const BranchDate = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.textMuted};
    margin-left: ${(props) => props.theme.spacing.xxs};
`;

// --- Component ---

export const OrderStatusStepper = ({ order }: OrderStatusStepperProps) => {
    const { data: logEvents, isError } = useGetOrderLogEventsQuery(
        { orderCode: order.order_code },
        { skip: !order.order_code }
    );

    const { steps, branches } = useMemo(() => {
        // Graceful fallback: if API fails or returns empty, use empty events
        const events = isError || !logEvents || logEvents.length === 0 ? [] : logEvents;
        return classifySteps(order.status, events);
    }, [order.status, logEvents, isError]);

    return (
        <div role="group" aria-label="Progreso de la orden">
            <StepperContainer>
                {steps.map((step, index) => (
                    <StepWrapper
                        key={step.statusValue}
                        aria-current={step.state === "active" ? "step" : undefined}
                    >
                        <StepRow>
                            {index > 0 && (
                                <Connector $completed={step.state === "completed" || step.state === "active"} />
                            )}
                            <StepMarker $state={step.state}>
                                {step.state === "completed" ? "✓" : index + 1}
                            </StepMarker>
                            {index < steps.length - 1 && (
                                <Connector $completed={step.state === "completed"} />
                            )}
                        </StepRow>
                        <StepContent $state={step.state}>
                            <StepLabel $state={step.state}>{step.label}</StepLabel>
                            {step.date && <StepDate>{step.date}</StepDate>}
                        </StepContent>
                        {/* Render branch indicators attached to this step */}
                        {branches
                            .filter((b) => b.attachedToStep === step.statusValue)
                            .map((branch) => (
                                <BranchContainer key={branch.statusValue}>
                                    <BranchDot $color={branch.color} />
                                    <BranchLabel>{branch.label}</BranchLabel>
                                    {branch.date && <BranchDate>{branch.date}</BranchDate>}
                                </BranchContainer>
                            ))}
                    </StepWrapper>
                ))}
            </StepperContainer>
        </div>
    );
};
