import styled, { css } from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Tooltip } from "../Tooltip";

export type TableIconButtonSize = "xs" | "sm" | "md";
export type TableIconButtonColor = "primary" | "secondary" | "danger" | "warning" | "success" | "info" | "neutral";

interface TableIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    size?: TableIconButtonSize;
    color?: TableIconButtonColor;
    tooltip?: string;
}

const getColorStyles = (color: TableIconButtonColor, theme: any) => {
    const colorMap: Record<TableIconButtonColor, any> = {
        primary: { main: theme.colors.primary, hover: `${theme.colors.primary}15` },
        secondary: { main: theme.colors.secondary, hover: `${theme.colors.secondary}15` },
        danger: { main: theme.colors.error, hover: `${theme.colors.error}15` },
        warning: { main: theme.colors.warning, hover: `${theme.colors.warning}15` },
        success: { main: theme.colors.success, hover: `${theme.colors.success}15` },
        info: { main: theme.colors.info, hover: `${theme.colors.info}15` },
        neutral: { main: theme.colors.gray600, hover: theme.colors.gray100 },
    };

    const scheme = colorMap[color];

    return css`
        color: ${scheme.main};
        &:hover:not(:disabled) {
            background-color: ${scheme.hover};
        }
    `;
};

const StyledTableIconButton = styled.button<{
    $size: TableIconButtonSize;
    $color: TableIconButtonColor;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    transition: all 0.15s ease;
    cursor: pointer;
    outline: none;
    flex-shrink: 0;

    ${(props) => {
        const sizes = {
            xs: css`
                width: 24px;
                height: 24px;
                font-size: 12px;
            `,
            sm: css`
                width: 28px;
                height: 28px;
                font-size: 14px;
            `,
            md: css`
                width: 32px;
                height: 32px;
                font-size: 16px;
            `,
        };
        return sizes[props.$size];
    }}

    ${(props) => getColorStyles(props.$color, props.theme)}

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    &:active:not(:disabled) {
        transform: scale(0.92);
    }
`;

const TableIconButtonGroup = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 2px;
`;

export function TableIconButton({
    icon,
    size = "sm",
    color = "neutral",
    tooltip,
    ...props
}: TableIconButtonProps) {
    return (
        <Tooltip content={tooltip} position="bottom">
            <StyledTableIconButton
                $size={size}
                $color={color}
                type="button"
                {...props}
            >
                {icon}
            </StyledTableIconButton>
        </Tooltip>
    );
}

TableIconButton.Group = TableIconButtonGroup;

export default TableIconButton;
