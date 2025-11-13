import styled from "styled-components";
import { type HTMLAttributes } from "react";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type Gap = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    direction?: FlexDirection;
    justify?: JustifyContent;
    align?: AlignItems;
    wrap?: FlexWrap;
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

const StyledFlex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${props => props.direction || "row"};
    justify-content: ${props => props.justify || "flex-start"};
    align-items: ${props => props.align || "stretch"};
    flex-wrap: ${props => props.wrap || "nowrap"};
    gap: ${props => getGapValue(props.gap || "md")};
    width: ${props => props.fullWidth ? "100%" : "auto"};
    height: ${props => props.fullHeight ? "100%" : "auto"};
`;

export default function Flex(props: FlexProps) {
    return <StyledFlex {...props} />;
}