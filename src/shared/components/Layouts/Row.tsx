import styled from "styled-components";
import { type HTMLAttributes } from "react";

type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type Gap = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface RowProps extends HTMLAttributes<HTMLDivElement> {
    justify?: JustifyContent;
    align?: AlignItems;
    gap?: Gap;
    wrap?: boolean;
    fullWidth?: boolean;
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

const StyledRow = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.justify || "flex-start"};
    align-items: ${props => props.align || "stretch"};
    flex-wrap: ${props => props.wrap ? "wrap" : "nowrap"};
    gap: ${props => getGapValue(props.gap || "md")};
    width: ${props => props.fullWidth ? "100%" : "auto"};
`;

export default function Row(props: RowProps) {
    return <StyledRow {...props} />;
}