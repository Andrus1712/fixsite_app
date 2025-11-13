import styled from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    size?: "sm" | "md" | "lg";
    variant?: "ghost" | "solid";
}

const StyledIconButton = styled.button<{ size: "sm" | "md" | "lg"; variant: "ghost" | "solid" }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s;
    cursor: pointer;
    border: none;
    
    ${props => {
        const sizes = {
            sm: "padding: 6px; font-size: 14px;",
            md: "padding: 8px; font-size: 16px;",
            lg: "padding: 12px; font-size: 18px;"
        };
        return sizes[props.size];
    }}
    
    ${props => {
        if (props.variant === "solid") {
            return `
                background-color: #f3f4f6;
                color: #374151;
                
                &:hover:not(:disabled) {
                    background-color: #e5e7eb;
                }
            `;
        } else {
            return `
                background-color: transparent;
                color: #6b7280;
                
                &:hover:not(:disabled) {
                    background-color: #f3f4f6;
                    color: #374151;
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
    ...props 
}: IconButtonProps) {
    return (
        <StyledIconButton size={size} variant={variant} {...props}>
            {icon}
        </StyledIconButton>
    );
}