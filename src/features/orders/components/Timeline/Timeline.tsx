import React from "react";
import { Card, Text, Badge, Row, Column } from "../../../../shared/components";
import {
    IoCheckmarkCircle,
    IoTime,
    IoWarning,
    IoInformationCircle,
    IoPerson,
    IoBuild,
    IoDocumentText,
    IoCloseCircle,
    IoPlayCircle,
    IoPauseCircle,
} from "react-icons/io5";
import styled from "styled-components";

export interface TimelineEvent {
    id: string;
    title: string;
    description?: string;
    timestamp: string;
    type: "created" | "updated" | "assigned" | "status_change" | "comment" | "repair" | "completed" | "cancelled" | "custom";
    status?: "success" | "warning" | "error" | "info" | "default";
    user?: string;
    metadata?: Record<string, any>;
    icon?: React.ReactNode;
}

export interface TimelineProps {
    events: TimelineEvent[];
    className?: string;
    showConnector?: boolean;
    size?: "sm" | "md" | "lg";
}

const TimelineContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const TimelineItem = styled.div<{ size: "sm" | "md" | "lg" }>`
    display: flex;
    gap: 16px;
    position: relative;

    &:not(:last-child) {
        padding-bottom: 16px;
    }
`;

const TimelineConnector = styled.div<{ showConnector: boolean }>`
    position: absolute;
    left: 20px;
    top: 40px;
    bottom: -16px;
    width: 2px;
    background: linear-gradient(to bottom, #e5e7eb 0%, #e5e7eb 50%, transparent 50%);
    background-size: 2px 8px;

    ${({ showConnector }) =>
        !showConnector &&
        `
        display: none;
    `}
`;

const TimelineIcon = styled.div<{ status: "success" | "warning" | "error" | "info" | "default" }>`
    position: relative;
    z-index: 2;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 3px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    ${({ status }) => {
        switch (status) {
            case "success":
                return `
                    background: #10B981;
                    color: white;
                `;
            case "warning":
                return `
                    background: #F59E0B;
                    color: white;
                `;
            case "error":
                return `
                    background: #EF4444;
                    color: white;
                `;
            case "info":
                return `
                    background: #3B82F6;
                    color: white;
                `;
            default:
                return `
                    background: #6B7280;
                    color: white;
                `;
        }
    }}
`;

const TimelineContent = styled.div`
    flex: 1;
    min-width: 0;
`;

const TimelineCard = styled(Card)`
    padding: 20px;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
`;

const TimelineHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 8px;
`;

const TimelineTitle = styled.div`
    flex: 1;
    min-width: 0;
`;

const TimelineMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
`;

const TimelineTimestamp = styled(Text)`
    font-size: 12px;
    color: #6b7280;
    white-space: nowrap;
`;

const TimelineUser = styled(Text)`
    font-size: 12px;
    color: #6b7280;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const TimelineDescription = styled.div`
    margin-top: 8px;
`;

const TimelineMetadata = styled.div`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e5e7eb;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

const MetadataItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #6b7280;
`;

const getEventIcon = (type: TimelineEvent["type"]): React.ReactNode => {
    switch (type) {
        case "created":
            return <IoDocumentText size={20} />;
        case "updated":
            return <IoInformationCircle size={20} />;
        case "assigned":
            return <IoPerson size={20} />;
        case "status_change":
            return <IoTime size={20} />;
        case "comment":
            return <IoInformationCircle size={20} />;
        case "repair":
            return <IoBuild size={20} />;
        case "completed":
            return <IoCheckmarkCircle size={20} />;
        case "cancelled":
            return <IoCloseCircle size={20} />;
        default:
            return <IoInformationCircle size={20} />;
    }
};

const getEventStatus = (type: TimelineEvent["type"]): TimelineEvent["status"] => {
    switch (type) {
        case "created":
            return "info";
        case "completed":
            return "success";
        case "cancelled":
            return "error";
        case "repair":
            return "warning";
        default:
            return "default";
    }
};

const formatTimestamp = (timestamp: string): string => {
    try {
        const date = new Date(timestamp);
        return date.toLocaleString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return timestamp;
    }
};

export const Timeline: React.FC<TimelineProps> = ({
    events,
    className,
    showConnector = true,
    size = "md",
}) => {
    if (!events || events.length === 0) {
        return (
            <Card size="full" variant="outlined" padding="large">
                <Text variant="body1" color="muted" style={{ textAlign: "center" }}>
                    No hay eventos en el historial
                </Text>
            </Card>
        );
    }

    const sortedEvents = [...events].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <TimelineContainer className={className}>
            {sortedEvents.map((event, index) => (
                <TimelineItem key={event.id} size={size}>
                    <TimelineIcon status={event.status || getEventStatus(event.type)}>
                        {event.icon || getEventIcon(event.type)}
                    </TimelineIcon>

                    {showConnector && index < sortedEvents.length - 1 && (
                        <TimelineConnector showConnector={showConnector} />
                    )}

                    <TimelineContent>
                        <TimelineCard size="full" variant="outlined" padding="medium">
                            <TimelineHeader>
                                <TimelineTitle>
                                    <Text variant="body1" weight="semibold">
                                        {event.title}
                                    </Text>
                                </TimelineTitle>

                                <TimelineMeta>
                                    <TimelineTimestamp variant="caption" color="muted">
                                        {formatTimestamp(event.timestamp)}
                                    </TimelineTimestamp>
                                    {event.user && (
                                        <TimelineUser variant="caption" color="muted">
                                            <IoPerson size={12} />
                                            {event.user}
                                        </TimelineUser>
                                    )}
                                </TimelineMeta>
                            </TimelineHeader>

                            {event.description && (
                                <TimelineDescription>
                                    <Text variant="body2" color="muted" style={{ lineHeight: 1.5 }}>
                                        {event.description}
                                    </Text>
                                </TimelineDescription>
                            )}

                            {event.metadata && Object.keys(event.metadata).length > 0 && (
                                <TimelineMetadata>
                                    {Object.entries(event.metadata).map(([key, value]) => (
                                        <MetadataItem key={key}>
                                            <Text variant="caption" weight="medium" color="muted">
                                                {key}:
                                            </Text>
                                            <Badge variant="default" size="sm">
                                                {String(value)}
                                            </Badge>
                                        </MetadataItem>
                                    ))}
                                </TimelineMetadata>
                            )}
                        </TimelineCard>
                    </TimelineContent>
                </TimelineItem>
            ))}
        </TimelineContainer>
    );
};