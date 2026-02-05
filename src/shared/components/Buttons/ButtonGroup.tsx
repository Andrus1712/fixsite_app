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
        /* First and last button: handles both direct buttons and buttons wrapped by a wrapper (eg Tooltip) */
        & > button:first-child,
        & > *:first-child button {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
        }
        
        & > button:last-child,
        & > *:last-child button {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
        }
        
        & > button:not(:first-child):not(:last-child),
        & > *:not(:first-child):not(:last-child) button {
            border-radius: 0;
        }
        
        & > button:not(:first-child),
        & > *:not(:first-child) button {
            margin-left: -1px;
        }
    ` : `
        & > button:first-child,
        & > *:first-child button {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }
        
        & > button:last-child,
        & > *:last-child button {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        }
        
        & > button:not(:first-child):not(:last-child),
        & > *:not(:first-child):not(:last-child) button {
            border-radius: 0;
        }
        
        & > button:not(:first-child),
        & > *:not(:first-child) button {
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