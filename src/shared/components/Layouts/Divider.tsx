import styled from "styled-components";

interface DividerProps {
    orientation?: "horizontal" | "vertical";
    color?: string;
    thickness?: number;
    margin?: "xs" | "sm" | "md" | "lg" | "xl" | number;
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
    background-color: ${props => props.color || "#e5e7eb"};
    
    ${props => props.orientation === "vertical" 
        ? `
            width: ${props.thickness || 1}px;
            height: 100%;
            margin: 0 ${getMarginValue(props.margin || "md")};
        `
        : `
            height: ${props.thickness || 1}px;
            width: 100%;
            margin: ${getMarginValue(props.margin || "md")} 0;
        `
    }
`;

export default function Divider({ 
    orientation = "horizontal", 
    color = "#e5e7eb", 
    thickness = 1, 
    margin = "md" 
}: DividerProps) {
    return <StyledDivider orientation={orientation} color={color} thickness={thickness} margin={margin} />;
}