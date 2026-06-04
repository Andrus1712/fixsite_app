import { Link } from "react-router";
import styled from "styled-components";
import { Badge, Flex, Text } from "@/shared/components";

type MaterialIssueStatus = "DRAFT" | "PENDING" | "APPROVED";

interface OrderServicePart {
    article_id: number;
    article_name: string;
    sku: string;
    quantity: number;
    store_name: string;
}

interface OrderServicePartsProps {
    parts: OrderServicePart[];
    materialIssueId: number | null;
    materialIssueStatus: MaterialIssueStatus | null;
}

const PartsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
`;

const PartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.borderLight};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.surface};
`;

const PartDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xxs};
  min-width: 0;
  flex: 1;
`;

const PartMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
  flex-shrink: 0;
`;

const BadgeLink = styled(Link)`
  text-decoration: none;
`;

const STATUS_VARIANT_MAP: Record<MaterialIssueStatus, "info" | "warning" | "success"> = {
    DRAFT: "info",
    PENDING: "warning",
    APPROVED: "success",
};

const STATUS_LABEL_MAP: Record<MaterialIssueStatus, string> = {
    DRAFT: "Borrador",
    PENDING: "Pendiente",
    APPROVED: "Aprobado",
};

const OrderServiceParts = ({
    parts,
    materialIssueId,
    materialIssueStatus,
}: OrderServicePartsProps) => {
    const hasParts = parts && parts.length > 0;

    return (
        <PartsListContainer>
            <Flex justify="space-between" align="center" gap="sm">
                <Text variant="label" weight="semibold">
                    Partes consumidas
                </Text>

                {materialIssueId !== null && materialIssueStatus !== null && (
                    <BadgeLink to={`/app/material-issues/${materialIssueId}`}>
                        <Badge variant={STATUS_VARIANT_MAP[materialIssueStatus]}>
                            {STATUS_LABEL_MAP[materialIssueStatus]}
                        </Badge>
                    </BadgeLink>
                )}
            </Flex>

            {!hasParts ? (
                <Text variant="body2" color="muted">
                    No se han consumido partes para este servicio
                </Text>
            ) : (
                parts.map((part) => (
                    <PartItem key={part.article_id}>
                        <PartDetails>
                            <Text variant="body2" weight="medium">
                                {part.article_name}
                            </Text>
                            <Text variant="caption" color="muted">
                                SKU: {part.sku} · Almacén: {part.store_name}
                            </Text>
                        </PartDetails>
                        <PartMeta>
                            <Text variant="body2" weight="semibold">
                                {part.quantity}
                            </Text>
                        </PartMeta>
                    </PartItem>
                ))
            )}
        </PartsListContainer>
    );
};

export default OrderServiceParts;
