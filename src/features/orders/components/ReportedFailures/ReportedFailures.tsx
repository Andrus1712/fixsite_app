import React from "react";
import { Row, Text, Badge, ImageGallery, Flex } from "../../../../shared/components";
import type { OrderIssue } from "../../models/OrderModel";

export interface ReportedFailuresProps {
    failures: OrderIssue[];
    className?: string;
}

const getSeverityVariant = (severity: string | undefined): "danger" | "warning" | "info" | "default" => {
    if (!severity) return "default";
    switch (severity.toLowerCase()) {
        case "crítica":
        case "critica":
            return "danger";
        case "alta":
            return "warning";
        case "media":
            return "info";
        default:
            return "default";
    }
};

/** Contenido interno de una falla para usar dentro del Accordion */
export const FailureAccordionContent: React.FC<{ failure: OrderIssue }> = ({ failure }) => {
    const attachment: {} = (failure.attachments ?? [])
        .map((att) => {
            const image: Partial<{ url: string }> = att;
            return image.url;
        })
        .filter((url): url is string => !!url);

    return (
        <div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {failure.severity && (
                    <Badge variant={getSeverityVariant(failure.severity)}>
                        {failure.severity}
                    </Badge>
                )}
                {failure.category && (
                    <Badge variant="default">
                        {failure.category}
                    </Badge>
                )}
            </div>

            <Flex direction="column" gap={"lg"}>
                {failure.failure_code_description && (
                    <Text variant="body2" color="black" style={{ lineHeight: 1.6 }}>
                        {failure.failure_code_description} - {failure.title}
                    </Text>
                )}

                {failure.attachments && failure.attachments.length > 0 &&
                    (
                        <ImageGallery
                            images={attachment}
                            thumbnailSize={120}
                            modalSize="lg"
                            showCounter={true}
                        />
                    )
                }
            </Flex>

            {(failure.reported_date || failure.reported_by) && (
                <Row
                    $align="center"
                    $justify="space-between"
                    $wrap
                    style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e5e7eb' }}
                >
                    {failure.reported_date && (
                        <Text variant="caption" color="muted">
                            Reportado el: {failure.reported_date}
                        </Text>
                    )}
                    {failure.reported_by && (
                        <Text variant="caption" color="muted">
                            Por: {failure.reported_by}
                        </Text>
                    )}
                </Row>
            )}
        </div>
    )
};

/** @deprecated Usar Accordion + FailureAccordionContent directamente */
export const ReportedFailures: React.FC<ReportedFailuresProps> = ({ failures, className }) => (
    <div className={className}>
        {failures?.map((failure) => (
            <FailureAccordionContent key={failure.id} failure={failure} />
        ))}
    </div>
);
