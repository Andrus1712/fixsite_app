import styled, { css } from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

export type IconButtonVariant = "ghost" | "solid" | "outline";
export type IconButtonSize = "xs" | "sm" | "md" | "lg";
export type IconButtonColor = "primary" | "secondary" | "danger" | "warning" | "success" | "info" | "white" | "neutral";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    size?: IconButtonSize;
    variant?: IconButtonVariant;
    color?: IconButtonColor;
    shape?: "circle" | "rounded";
}

const getVariantStyles = (variant: IconButtonVariant, color: IconButtonColor, theme: any) => {
    const isDarkTheme = theme.colors.background === "#111827"; // Simple check or use a theme flag if available

    const colorMap: Record<IconButtonColor, any> = {
        primary: {
            main: theme.colors.primary,
            hover: theme.colors.primaryDark,
            soft: `${theme.colors.primary}20`,
            text: theme.colors.primary,
        },
        secondary: {
            main: theme.colors.secondary,
            hover: theme.colors.secondaryDark,
            soft: `${theme.colors.secondary}20`,
            text: theme.colors.secondary,
        },
        danger: {
            main: theme.colors.error,
            hover: theme.colors.errorDark,
            soft: `${theme.colors.error}20`,
            text: theme.colors.error,
        },
        warning: {
            main: theme.colors.warning,
            hover: theme.colors.warningDark,
            soft: `${theme.colors.warning}20`,
            text: theme.colors.warning,
        },
        success: {
            main: theme.colors.success,
            hover: theme.colors.successDark,
            soft: `${theme.colors.success}20`,
            text: theme.colors.success,
        },
        info: {
            main: theme.colors.info,
            hover: theme.colors.infoDark,
            soft: `${theme.colors.info}20`,
            text: theme.colors.info,
        },
        white: {
            main: theme.colors.white,
            hover: theme.colors.gray100,
            soft: "rgba(255, 255, 255, 0.2)",
            text: theme.colors.white,
        },
        neutral: {
            main: theme.colors.gray500,
            hover: theme.colors.gray700,
            soft: theme.colors.gray100,
            text: isDarkTheme ? theme.colors.gray300 : theme.colors.gray600,
        },
    };

    const scheme = colorMap[color] || colorMap.primary;

    switch (variant) {
        case "solid":
            return css`
                background-color: ${scheme.main};
                color: ${color === "white" ? theme.colors.primary : theme.colors.white};
                border: 1px solid ${scheme.main};
                &:hover:not(:disabled) {
                    background-color: ${scheme.hover};
                    border-color: ${scheme.hover};
                }
            `;
        case "outline":
            return css`
                background-color: transparent;
                color: ${scheme.text};
                border: 1px solid ${scheme.main};
                &:hover:not(:disabled) {
                    background-color: ${scheme.soft};
                }
            `;
        case "ghost":
        default:
            return css`
                background-color: transparent;
                color: ${scheme.text};
                border: 1px solid transparent;
                &:hover:not(:disabled) {
                    background-color: ${scheme.soft};
                }
            `;
    }
};

const StyledIconButton = styled.button<{
    $size: IconButtonSize;
    $variant: IconButtonVariant;
    $color: IconButtonColor;
    $shape: "circle" | "rounded";
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    outline: none;
    flex-shrink: 0;

    border-radius: ${(props) => (props.$shape === "circle" ? "50%" : props.theme.borderRadius.md)};

    ${(props) => {
        const sizes = {
            xs: css`
                width: 28px;
                height: 28px;
                font-size: 14px;
            `,
            sm: css`
                width: 32px;
                height: 32px;
                font-size: 16px;
            `,
            md: css`
                width: 40px;
                height: 40px;
                font-size: 18px;
            `,
            lg: css`
                width: 48px;
                height: 48px;
                font-size: 20px;
            `,
        };
        return sizes[props.$size];
    }}

    ${(props) => getVariantStyles(props.$variant, props.$color, props.theme)}

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }

    &:focus-visible {
        box-shadow: 0 0 0 2px ${(props) => props.theme.colors.white}, 0 0 0 4px ${(props) => props.theme.colors.primary};
    }
`;

export default function IconButton({
    icon,
    size = "md",
    variant = "ghost",
    color = "neutral",
    shape = "rounded",
    ...props
}: IconButtonProps) {
    return (
        <StyledIconButton
            $size={size}
            $variant={variant}
            $color={color}
            $shape={shape}
            type="button"
            {...props}
        >
            {icon}
        </StyledIconButton>
    );
}
