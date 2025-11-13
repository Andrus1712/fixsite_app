import styled from "styled-components";
import { type ReactNode } from "react";

interface ButtonGroupProps {
    children: ReactNode;
    orientation?: "horizontal" | "vertical";
    spacing?: "sm" | "md" | "lg";
}

const StyledButtonGroup = styled.div<{ orientation: "horizontal" | "vertical"; spacing: "sm" | "md" | "lg" }>`
    display: flex;
    flex-direction: ${props => props.orientation === "vertical" ? "column" : "row"};
    gap: ${props => {
        const gaps = { sm: "4px", md: "8px", lg: "12px" };
        return gaps[props.spacing];
    }};
    
    ${props => props.orientation === "horizontal" ? `
        & > button:first-child {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        
        & > button:last-child {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        
        & > button:not(:first-child):not(:last-child) {
            border-radius: 0;
        }
        
        & > button:not(:first-child) {
            margin-left: -1px;
        }
    ` : `
        & > button:first-child {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        
        & > button:last-child {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        
        & > button:not(:first-child):not(:last-child) {
            border-radius: 0;
        }
        
        & > button:not(:first-child) {
            margin-top: -1px;
        }
    `}
`;

export default function ButtonGroup({ 
    children, 
    orientation = "horizontal", 
    spacing = "md" 
}: ButtonGroupProps) {
    return (
        <StyledButtonGroup orientation={orientation} spacing={spacing}>
            {children}
        </StyledButtonGroup>
    );
}