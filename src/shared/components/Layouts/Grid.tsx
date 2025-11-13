import styled from "styled-components";
import { type HTMLAttributes } from "react";

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto" | "1fr" | string;
type Gap = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface GridProps extends HTMLAttributes<HTMLDivElement> {
    columns?: GridColumns;
    rows?: GridColumns;
    gap?: Gap;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

const getGapValue = (gap: Gap) => {
    if (typeof gap === "number") return `${gap}px`;
    const gaps = {
        xs: "4px",
        sm: "8px",
        md: "16px", 
        lg: "24px",
        xl: "32px"
    };
    return gaps[gap] || "16px";
};

const getColumnsValue = (columns: GridColumns) => {
    if (columns === "auto") return "repeat(auto-fit, minmax(200px, 1fr))";
    if (typeof columns === "string") return columns;
    return `repeat(${columns}, 1fr)`;
};

const StyledGrid = styled.div<GridProps>`
    display: grid;
    grid-template-columns: ${props => getColumnsValue(props.columns || "auto")};
    grid-template-rows: ${props => props.rows ? getColumnsValue(props.rows) : "auto"};
    gap: ${props => getGapValue(props.gap || "md")};
    width: ${props => props.fullWidth ? "100%" : "auto"};
    height: ${props => props.fullHeight ? "100%" : "auto"};
`;

export default function Grid(props: GridProps) {
    return <StyledGrid {...props} />;
}