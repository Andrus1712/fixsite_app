import styled from "styled-components";
import { type HTMLAttributes } from "react";
import { type JustifyContent, type AlignItems, type Gap, type SpacingKey } from "./Row";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    $direction?: FlexDirection;
    direction?: FlexDirection;
    $justify?: JustifyContent;
    justify?: JustifyContent;
    $align?: AlignItems;
    align?: AlignItems;
    $wrap?: FlexWrap;
    wrap?: FlexWrap;
    $gap?: Gap;
    gap?: Gap;
    $flex?: string | number;
    flexProp?: string | number;
    $fullWidth?: boolean;
    fullWidth?: boolean;
    $fullHeight?: boolean;
    fullHeight?: boolean;
}

const getSpacing = (gap: Gap | undefined, theme: any) => {
    if (gap === undefined) return theme.spacing.md;
    if (typeof gap === "number") return `${gap}px`;
    if (theme.spacing[gap as SpacingKey]) return theme.spacing[gap as SpacingKey];
    return gap;
};

const StyledFlex = styled.div<{
    $direction?: FlexDirection;
    $justify?: JustifyContent;
    $align?: AlignItems;
    $wrap?: FlexWrap;
    $gap?: Gap;
    $flex?: string | number;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
}>`
    display: flex;
    flex-direction: ${(props) => props.$direction || "row"};
    justify-content: ${(props) => props.$justify || "flex-start"};
    align-items: ${(props) => props.$align || "stretch"};
    flex-wrap: ${(props) => props.$wrap || "nowrap"};
    gap: ${(props) => getSpacing(props.$gap, props.theme)};
    flex: ${(props) => props.$flex || "initial"};
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
    height: ${(props) => (props.$fullHeight ? "100%" : "auto")};
`;

export default function Flex({
    $direction, direction,
    $justify, justify,
    $align, align,
    $wrap, wrap,
    $gap, gap,
    $flex, flexProp,
    $fullWidth, fullWidth,
    $fullHeight, fullHeight,
    children,
    ...props
}: FlexProps) {
    return (
        <StyledFlex
            $direction={$direction || direction}
            $justify={$justify || justify}
            $align={$align || align}
            $wrap={$wrap || wrap}
            $gap={$gap || gap}
            $flex={$flex || flexProp}
            $fullWidth={$fullWidth !== undefined ? $fullWidth : fullWidth}
            $fullHeight={$fullHeight !== undefined ? $fullHeight : fullHeight}
            {...props}
        >
            {children}
        </StyledFlex>
    );
}