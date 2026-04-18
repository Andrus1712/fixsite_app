import React from "react";
import { Row, Text, Badge, ImageGallery, Flex } from "../../../../shared/components";
import type { Issue } from "../../models/ApiModel";

export interface ReportedFailuresProps {
    failures: Issue[];
    onEditFailure?: (failure: Issue) => void;
    onConfigureFailure?: (failure: Issue) => void;
    className?: string;
}

const getPriorityColor = (priority: string): any => {
    switch (priority.toLowerCase()) {
        case "crítica": case "high": return "danger";
        case "medium": return "warning";
        case "low": return "info";
        default: return "default";
    }
};

const getTypeColor = (type: string): any => {
    switch (type.toLowerCase()) {
        case "hardware": return "default";
        case "software": case "network": return "default";
        default: return "default";
    }
};

/** Contenido interno de una falla para usar dentro del Accordion */
export const FailureAccordionContent: React.FC<{ failure: Issue; }> = ({ failure }) => (
    <div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <Badge variant={getPriorityColor(failure.failure_severities_name || failure.issue_priority_description)}>
                {failure.failure_severities_name || failure.issue_priority_description}
            </Badge>
            <Badge variant="default">
                {failure.failure_categories_name || failure.issue_type_description}
            </Badge>
        </div>

        <Flex direction="column" gap={"lg"}>
            {failure.failure_codes_description && (
                <Text variant="body2" color="black" style={{ lineHeight: 1.6 }}>
                    {failure.failure_codes_description} - {failure.issue_name}
                </Text>
            )}

            {failure.issue_files && failure.issue_files.length > 0 && (
                <ImageGallery
                    images={failure.issue_files}
                    thumbnailSize={120}
                    modalSize="lg"
                    showCounter={true}
                />
            )}
        </Flex>

        {(failure.issue_reported_date || failure.issue_reported_by) && (
            <Row
                $align="center"
                $justify="space-between"
                $wrap
                style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb' }}
            >
                {failure.issue_reported_date && (
                    <Text variant="caption" color="muted">
                        Reportado el: {failure.issue_reported_date} {failure.issue_reported_time}
                    </Text>
                )}
                {failure.issue_reported_by && (
                    <Text variant="caption" color="muted">
                        Por: {failure.issue_reported_by}
                    </Text>
                )}
            </Row>
        )}
    </div>
);

/** @deprecated Usar Accordion + FailureAccordionContent directamente */
export const ReportedFailures: React.FC<ReportedFailuresProps> = ({ failures, onEditFailure, onConfigureFailure, className }) => (
    <div className={className}>
        {failures?.map((failure) => (
            <FailureAccordionContent key={failure.id} failure={failure} />
        ))}
    </div>
);
