import styled from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "solid" | "border";
    color?:
        | "primary"
        | "danger"
        | "warning"
        | "success"
        | "info"
        | "neutral"
        | "white"
        | "black"
        | "transparent"
        | "current"
        | "inherit"
        | "initial"
        | "unset"
        | "revert"
        | "revertLayer"
        | "unsetLayer"
        | "inheritLayer"
        | "initialLayer"
        | "revertAll"
        | "unsetAll"
        | "inheritAll"
        | "initialAll"
        | "revertLayers"
        | "unsetLayers"
        | "inheritLayers";
    shape?: "rounded" | "square";
}

const StyledIconButton = styled.button<{
    size: "sm" | "md" | "lg";
    variant: "ghost" | "solid" | "border";
    color: "primary" | "danger" | "warning" | "success" | "info" | "neutral";
    shape: "rounded" | "square";
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid transparent;
    
    ${(props) => (props.shape === "rounded" ? "border-radius: 50%;" : "border-radius: 6px;")}
    
    ${(props) => {
        const sizes = {
            sm: "padding: 6px; font-size: 14px;",
            md: "padding: 8px; font-size: 16px;",
            lg: "padding: 12px; font-size: 18px;",
        };
        return sizes[props.size];
    }}
    
    ${(props) => {
        const colors = {
            primary: { main: "#3b82f6", hover: "#2563eb", light: "#dbeafe", text: "#1e40af" },
            danger: { main: "#ef4444", hover: "#dc2626", light: "#fee2e2", text: "#b91c1c" },
            warning: { main: "#f59e0b", hover: "#d97706", light: "#fef3c7", text: "#92400e" },
            success: { main: "#10b981", hover: "#059669", light: "#d1fae5", text: "#047857" },
            info: { main: "#06b6d4", hover: "#0891b2", light: "#cffafe", text: "#0e7490" },
            neutral: { main: "#6b7280", hover: "#4b5563", light: "#f3f4f6", text: "#374151" },
            white: { main: "#ffffff", hover: "#f3f4f6", light: "#f3f4f6", text: "#374151" },
            black: { main: "#000000", hover: "#374151", light: "#374151", text: "#ffffff" },
            transparent: { main: "transparent", hover: "transparent", light: "transparent", text: "#374151" },
            current: { main: "currentColor", hover: "currentColor", light: "currentColor", text: "#374151" },
            inherit: { main: "inherit", hover: "inherit", light: "inherit", text: "#374151" },
            initial: { main: "initial", hover: "initial", light: "initial", text: "#374151" },
            unset: { main: "unset", hover: "unset", light: "unset", text: "#374151" },
            revert: { main: "revert", hover: "revert", light: "revert", text: "#374151" },
            revertLayer: { main: "revert-layer", hover: "revert-layer", light: "revert-layer", text: "#374151" },
            unsetLayer: { main: "unset-layer", hover: "unset-layer", light: "unset-layer", text: "#374151" },
            inheritLayer: { main: "inherit-layer", hover: "inherit-layer", light: "inherit-layer", text: "#374151" },
            initialLayer: { main: "initial-layer", hover: "initial-layer", light: "initial-layer", text: "#374151" },
            revertAll: { main: "revert-all", hover: "revert-all", light: "revert-all", text: "#374151" },
            unsetAll: { main: "unset-all", hover: "unset-all", light: "unset-all", text: "#374151" },
            inheritAll: { main: "inherit-all", hover: "inherit-all", light: "inherit-all", text: "#374151" },
            initialAll: { main: "initial-all", hover: "initial-all", light: "initial-all", text: "#374151" },
            revertLayers: { main: "revert-layers", hover: "revert-layers", light: "revert-layers", text: "#374151" },
            unsetLayers: { main: "unset-layers", hover: "unset-layers", light: "unset-layers", text: "#374151" },
            inheritLayers: {
                main: "inherit-layers",
                hover: "inherit-layers",
                light: "inherit-layers",
                text: "#374151",
            },
            initialLayers: {
                main: "initial-layers",
                hover: "initial-layers",
                light: "initial-layers",
                text: "#374151",
            },
            revertCommonLayers: {
                main: "revert-common-layers",
                hover: "revert-common-layers",
                light: "revert-common-layers",
                text: "#374151",
            },
            unsetCommonLayers: {
                main: "unset-common-layers",
                hover: "unset-common-layers",
                light: "unset-common-layers",
                text: "#374151",
            },
            inheritCommonLayers: {
                main: "inherit-common-layers",
                hover: "inherit-common-layers",
                light: "inherit-common-layers",
                text: "#374151",
            },
            initialCommonLayers: {
                main: "initial-common-layers",
                hover: "initial-common-layers",
                light: "initial-common-layers",
                text: "#374151",
            },
        };

        const colorScheme = colors[props.color];

        if (props.variant === "solid") {
            return `
                background-color: ${colorScheme.main};
                color: white;
                
                &:hover:not(:disabled) {
                    background-color: ${colorScheme.hover};
                }
            `;
        } else if (props.variant === "border") {
            return `
                background-color: transparent;
                color: ${colorScheme.text};
                border-color: ${colorScheme.main};
                
                &:hover:not(:disabled) {
                    background-color: ${colorScheme.light};
                }
            `;
        } else {
            return `
                background-color: transparent;
                color: ${colorScheme.text};
                
                &:hover:not(:disabled) {
                    background-color: ${colorScheme.light};
                }
            `;
        }
    }}
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

export default function IconButton({
    icon,
    size = "md",
    variant = "ghost",
    color = "neutral",
    shape = "square",
    ...props
}: IconButtonProps) {
    return (
        <StyledIconButton size={size} variant={variant} color={color} shape={shape} {...props}>
            {icon}
        </StyledIconButton>
    );
}
