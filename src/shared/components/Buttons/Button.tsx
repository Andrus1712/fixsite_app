import styled, { css } from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "outline" | "warning" | "info" | "dark" | "light" | "purple" | "pink" | "indigo";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    width?: string | number;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const getVariantStyles = (variant: ButtonVariant) => {
    switch (variant) {
        case "primary":
            return css`
                background-color: #3b82f6;
                color: white;
                border: 1px solid #3b82f6;
                
                &:hover:not(:disabled) {
                    background-color: #2563eb;
                    border-color: #2563eb;
                }
            `;
        case "secondary":
            return css`
                background-color: #6b7280;
                color: white;
                border: 1px solid #6b7280;
                
                &:hover:not(:disabled) {
                    background-color: #4b5563;
                    border-color: #4b5563;
                }
            `;
        case "danger":
            return css`
                background-color: #ef4444;
                color: white;
                border: 1px solid #ef4444;
                
                &:hover:not(:disabled) {
                    background-color: #dc2626;
                    border-color: #dc2626;
                }
            `;
        case "success":
            return css`
                background-color: #10b981;
                color: white;
                border: 1px solid #10b981;
                
                &:hover:not(:disabled) {
                    background-color: #059669;
                    border-color: #059669;
                }
            `;
        case "outline":
            return css`
                background-color: transparent;
                color: #374151;
                border: 1px solid #d1d5db;
                
                &:hover:not(:disabled) {
                    background-color: #f9fafb;
                    border-color: #9ca3af;
                }
            `;
        case "warning":
            return css`
                background-color: #f59e0b;
                color: white;
                border: 1px solid #f59e0b;
                
                &:hover:not(:disabled) {
                    background-color: #d97706;
                    border-color: #d97706;
                }
            `;
        case "info":
            return css`
                background-color: #06b6d4;
                color: white;
                border: 1px solid #06b6d4;
                
                &:hover:not(:disabled) {
                    background-color: #0891b2;
                    border-color: #0891b2;
                }
            `;
        case "dark":
            return css`
                background-color: #1f2937;
                color: white;
                border: 1px solid #1f2937;
                
                &:hover:not(:disabled) {
                    background-color: #111827;
                    border-color: #111827;
                }
            `;
        case "light":
            return css`
                background-color: #f9fafb;
                color: #374151;
                border: 1px solid #e5e7eb;
                
                &:hover:not(:disabled) {
                    background-color: #f3f4f6;
                    border-color: #d1d5db;
                }
            `;
        case "purple":
            return css`
                background-color: #8b5cf6;
                color: white;
                border: 1px solid #8b5cf6;
                
                &:hover:not(:disabled) {
                    background-color: #7c3aed;
                    border-color: #7c3aed;
                }
            `;
        case "pink":
            return css`
                background-color: #ec4899;
                color: white;
                border: 1px solid #ec4899;
                
                &:hover:not(:disabled) {
                    background-color: #db2777;
                    border-color: #db2777;
                }
            `;
        case "indigo":
            return css`
                background-color: #6366f1;
                color: white;
                border: 1px solid #6366f1;
                
                &:hover:not(:disabled) {
                    background-color: #4f46e5;
                    border-color: #4f46e5;
                }
            `;
        default:
            return css``;
    }
};

const getSizeStyles = (size: ButtonSize) => {
    switch (size) {
        case "sm":
            return css`
                padding: 6px 12px;
                font-size: 12px;
                border-radius: 4px;
            `;
        case "md":
            return css`
                padding: 8px 16px;
                font-size: 14px;
                border-radius: 6px;
            `;
        case "lg":
            return css`
                padding: 12px 24px;
                font-size: 16px;
                border-radius: 8px;
            `;
        default:
            return css``;
    }
};

const StyledButton = styled.button<ButtonProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-weight: 500;
    transition: all 0.2s;
    cursor: pointer;
    width: ${props => {
        if (props.fullWidth) return "100%";
        if (props.width) return typeof props.width === 'number' ? `${props.width}px` : props.width;
        return "auto";
    }};
    
    ${props => getVariantStyles(props.variant || "primary")}
    ${props => getSizeStyles(props.size || "md")}
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const Spinner = styled.div`
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

export default function Button({ 
    children, 
    loading, 
    disabled, 
    leftIcon,
    rightIcon,
    ...props 
}: ButtonProps) {
    return (
        <StyledButton disabled={disabled || loading} {...props}>
            {loading && <Spinner />}
            {!loading && leftIcon && leftIcon}
            {children}
            {!loading && rightIcon && rightIcon}
        </StyledButton>
    );
}