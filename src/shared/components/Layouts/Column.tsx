import styled from "styled-components";
import { type HTMLAttributes } from "react";

type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type Gap = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
    justify?: JustifyContent;
    align?: AlignItems;
    gap?: Gap;
    fullWidth?: boolean;
    fullHeight?: boolean;
}

const getGapValue = (gap: Gap) => {
    console.log("T: " + typeof gap);
    
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

const StyledColumn = styled.div<ColumnProps>`
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.justify || "flex-start"};
    align-items: ${props => props.align || "stretch"};
    gap: ${props => getGapValue(props.gap || "md")};
    width: ${props => props.fullWidth ? "100%" : "auto"};
    height: ${props => props.fullHeight ? "100%" : "auto"};
`;

export default function Column(props: ColumnProps) {
    return <StyledColumn {...props} />;
}