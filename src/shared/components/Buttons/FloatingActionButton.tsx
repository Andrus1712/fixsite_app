import styled from "styled-components";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface FloatingActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode;
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    size?: "md" | "lg";
}

const StyledFAB = styled.button<{ 
    position: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    size: "md" | "lg";
}>`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    transition: all 0.2s;
    z-index: 1000;
    
    ${props => {
        const sizes = {
            md: "width: 56px; height: 56px; font-size: 20px;",
            lg: "width: 64px; height: 64px; font-size: 24px;"
        };
        return sizes[props.size];
    }}
    
    ${props => {
        const positions = {
            "bottom-right": "bottom: 24px; right: 24px;",
            "bottom-left": "bottom: 24px; left: 24px;",
            "top-right": "top: 24px; right: 24px;",
            "top-left": "top: 24px; left: 24px;"
        };
        return positions[props.position];
    }}
    
    &:hover:not(:disabled) {
        background-color: #2563eb;
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    
    &:active {
        transform: scale(0.95);
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
    
    &:focus {
        outline: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
`;

export default function FloatingActionButton({ 
    icon, 
    position = "bottom-right", 
    size = "md", 
    ...props 
}: FloatingActionButtonProps) {
    return (
        <StyledFAB position={position} size={size} {...props}>
            {icon}
        </StyledFAB>
    );
}