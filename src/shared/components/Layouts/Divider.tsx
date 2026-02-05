import styled from "styled-components";

interface DividerProps {
    orientation?: "horizontal" | "vertical";
    color?: string;
    thickness?: number;
    margin?: "xs" | "sm" | "md" | "lg" | "xl" | number;
    width?: string | number;
    opacity?: number;
    gradient?: boolean;
}

const getMarginValue = (margin: "xs" | "sm" | "md" | "lg" | "xl" | number) => {
    if (typeof margin === "number") return `${margin}px`;
    const margins = {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px"
    };
    return margins[margin] || "16px";
};

const StyledDivider = styled.div<DividerProps>`
    opacity: ${props => props.opacity || 0.6};
    border-radius: ${props => (props.thickness || 1) / 2}px;
    transition: opacity 0.2s ease;
    
    ${props => props.gradient 
        ? `background: linear-gradient(90deg, transparent, ${props.color || "#e5e7eb"}, transparent);`
        : `background-color: ${props.color || "#e5e7eb"};`
    }
    
    ${props => props.orientation === "vertical" 
        ? `
            width: ${props.thickness || 1}px;
            height: ${typeof props.width === 'number' ? `${props.width}px` : props.width || '100%'};
            margin: 0 ${getMarginValue(props.margin || "md")};
        `
        : `
            height: ${props.thickness || 1}px;
            width: ${typeof props.width === 'number' ? `${props.width}px` : props.width || '100%'};
            margin: ${getMarginValue(props.margin || "md")} 0;
        `
    }
`;

export default function Divider({ 
    orientation = "horizontal", 
    color = "#e5e7eb", 
    thickness = 1, 
    margin = "md",
    width,
    opacity = 0.6,
    gradient = false
}: DividerProps) {
    return (
        <StyledDivider 
            orientation={orientation} 
            color={color} 
            thickness={thickness} 
            margin={margin}
            width={width}
            opacity={opacity}
            gradient={gradient}
        />
    );
}