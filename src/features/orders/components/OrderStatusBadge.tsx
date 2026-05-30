import styled from "styled-components";
import { getStatusConfig } from "../constants/orderStatusConfig";

interface OrderStatusBadgeProps {
    status: number;
    size?: "sm" | "md";
}

const StyledBadge = styled.span<{ $bgColor: string; $size: "sm" | "md" }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: #FFFFFF;
    border-radius: ${(props) => props.theme.borderRadius.full};
    background-color: ${(props) =>
        (props.theme.colors as Record<string, string>)[props.$bgColor] ?? props.theme.colors.gray400};
    font-size: ${(props) =>
        props.$size === "sm" ? props.theme.fontSize.xs : props.theme.fontSize.sm};
    padding: ${(props) =>
        props.$size === "sm"
            ? `${props.theme.spacing.xxs} ${props.theme.spacing.sm}`
            : `${props.theme.spacing.xs} ${props.theme.spacing.md}`};
`;

export const OrderStatusBadge = ({ status, size = "md" }: OrderStatusBadgeProps) => {
    const config = getStatusConfig(status);

    return (
        <StyledBadge
            $bgColor={config.color}
            $size={size}
            aria-label={config.label}
        >
            {config.label}
        </StyledBadge>
    );
};
