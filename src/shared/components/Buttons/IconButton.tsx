import styled from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "solid" | "border";
    color?: "primary" | "danger" | "warning" | "success" | "info" | "neutral";
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
    
    ${props => props.shape === "rounded" ? "border-radius: 50%;" : "border-radius: 6px;"}
    
    ${props => {
        const sizes = {
            sm: "padding: 6px; font-size: 14px;",
            md: "padding: 8px; font-size: 16px;",
            lg: "padding: 12px; font-size: 18px;"
        };
        return sizes[props.size];
    }}
    
    ${props => {
        const colors = {
            primary: { main: "#3b82f6", hover: "#2563eb", light: "#dbeafe", text: "#1e40af" },
            danger: { main: "#ef4444", hover: "#dc2626", light: "#fee2e2", text: "#b91c1c" },
            warning: { main: "#f59e0b", hover: "#d97706", light: "#fef3c7", text: "#92400e" },
            success: { main: "#10b981", hover: "#059669", light: "#d1fae5", text: "#047857" },
            info: { main: "#06b6d4", hover: "#0891b2", light: "#cffafe", text: "#0e7490" },
            neutral: { main: "#6b7280", hover: "#4b5563", light: "#f3f4f6", text: "#374151" }
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
        <StyledIconButton 
            size={size} 
            variant={variant} 
            color={color}
            shape={shape}
            {...props}
        >
            {icon}
        </StyledIconButton>
    );
}