import React from "react";
import { Card, Row, Text, Badge, ImageGallery } from "../../../../shared/components";
import { DropdownButton } from "../../../../shared/components/Buttons";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { HiDotsVertical } from "react-icons/hi";
import { IoPencil } from "react-icons/io5";
import { BsNut } from "react-icons/bs";
import styled from "styled-components";
import type { Issue } from "../../models/ApiModel";

export interface ReportedFailuresProps {
    failures: Issue[];
    onEditFailure?: (failure: Issue) => void;
    onConfigureFailure?: (failure: Issue) => void;
    className?: string;
}

const FailureCard = styled(Card)`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FailureHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FailureTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const FailureTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

const FailureBadges = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FailureDescription = styled.div`
  margin: 16px 0;
`;

const FailureImages = styled.div`
  margin-top: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
`;

const getPriorityColor = (priority: string): any => {
    switch (priority.toLowerCase()) {
        case "critical":
            return "danger";
        case "high":
            return "danger";
        case "medium":
            return "warning";
        case "low":
            return "info";
        default:
            return "default";
    }
};


const getTypeColor = (type: string): any => {
    switch (type.toLowerCase()) {
        case "hardware":
            return "warning";
        case "software":
            return "info";
        case "network":
            return "info";
        case "other":
            return "default";
        default:
            return "default";
    }
};

export const ReportedFailures: React.FC<ReportedFailuresProps> = ({
    failures,
    onEditFailure,
    onConfigureFailure,
    className,
}) => {
    if (!failures || failures.length === 0) {
        return (
            <Card size="full" variant="outlined" className={className}>
                <EmptyState>
                    <Text variant="body1" color="muted">
                        No se han reportado fallas para esta orden
                    </Text>
                </EmptyState>
            </Card>
        );
    }

    return (
        <div className={className}>
            {failures.map((failure) => (
                <FailureCard key={failure.id} size="full" variant="outlined" padding="medium">
                    <FailureHeader>
                        <FailureTitleRow>
                            <FailureTitle>
                                <TbAlertOctagonFilled
                                    size={20}
                                    color={failure.issue_priority_description.toLowerCase() === "critical" ? "#ef4444" : "#f59e0b"}
                                />
                                <Text variant="body1" weight="semibold" style={{ flex: 1 }}>
                                    {failure.failure_codes_code || failure.id} - {failure.failure_codes_name || failure.issue_name}
                                </Text>
                            </FailureTitle>
                            <DropdownButton
                                items={[
                                    {
                                        label: "Acciones",
                                        options: [
                                            {
                                                id: "edit",
                                                label: "Editar",
                                                onClick: () => onEditFailure?.(failure),
                                                icon: <IoPencil />,
                                            },
                                            {
                                                id: "configure",
                                                label: "Configuración",
                                                icon: <BsNut />,
                                                onClick: () => onConfigureFailure?.(failure),
                                            },
                                        ],
                                    },
                                ]}
                                rightIcon={<HiDotsVertical />}
                                size="sm"
                            />
                        </FailureTitleRow>
                        <FailureBadges>
                            <Badge variant={getTypeColor(failure.failure_categories_name || failure.issue_type_description)}>{failure.failure_categories_name || failure.issue_type_description}</Badge>
                            <Badge variant={getPriorityColor(failure.failure_severities_name || failure.issue_priority_description)}>{failure.failure_severities_name || failure.issue_priority_description}</Badge>
                            {/* Assuming there is no status field in the new Issue interface, we use a placeholder or check if it exists */}
                            <Badge variant="info">Reportada</Badge>
                        </FailureBadges>
                    </FailureHeader>

                    <FailureDescription>
                        <Text variant="body2" color="muted" style={{ lineHeight: 1.6 }}>
                            {failure.failure_codes_description}
                        </Text>
                    </FailureDescription>

                    {failure.issue_files && failure.issue_files.length > 0 && (
                        <FailureImages>
                            <ImageGallery
                                images={failure.issue_files}
                                thumbnailSize={120}
                                modalSize="lg"
                                showCounter={true}
                            />
                        </FailureImages>
                    )}

                    {(failure.issue_reported_date || failure.issue_reported_by) && (
                        <Row
                            $align="center"
                            $justify="space-between"
                            style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #e5e7eb" }}
                        >
                            <div>
                                {failure.issue_reported_date && (
                                    <Text variant="caption" color="muted">
                                        Reportado el: {failure.issue_reported_date} {failure.issue_reported_time}
                                    </Text>
                                )}
                            </div>
                            <div>
                                {failure.issue_reported_by && (
                                    <Text variant="caption" color="muted">
                                        Por: {failure.issue_reported_by}
                                    </Text>
                                )}
                            </div>
                        </Row>
                    )}
                </FailureCard>
            ))}
        </div>
    );
};
