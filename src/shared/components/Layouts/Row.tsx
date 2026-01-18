import styled from "styled-components";
import { type HTMLAttributes } from "react";

export type JustifyContent = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
export type AlignItems = "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
export type SpacingKey = "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
export type Gap = SpacingKey | number | string;

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
    $justify?: JustifyContent;
    justify?: JustifyContent;
    $align?: AlignItems;
    align?: AlignItems;
    $gap?: Gap;
    gap?: Gap;
    $wrap?: boolean;
    wrap?: boolean;
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

const StyledRow = styled.div<{
    $justify?: JustifyContent;
    $align?: AlignItems;
    $gap?: Gap;
    $wrap?: boolean;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
}>`
    display: flex;
    flex-direction: row;
    justify-content: ${(props) => props.$justify || "flex-start"};
    align-items: ${(props) => props.$align || "center"};
    flex-wrap: ${(props) => (props.$wrap ? "wrap" : "nowrap")};
    gap: ${(props) => getSpacing(props.$gap, props.theme)};
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
    height: ${(props) => (props.$fullHeight ? "100%" : "auto")};
`;

export default function Row({
    $justify, justify,
    $align, align,
    $gap, gap,
    $wrap, wrap,
    $fullWidth, fullWidth,
    $fullHeight, fullHeight,
    children,
    ...props
}: RowProps) {
    return (
        <StyledRow
            $justify={$justify || justify}
            $align={$align || align}
            $gap={$gap || gap}
            $wrap={$wrap !== undefined ? $wrap : wrap}
            $fullWidth={$fullWidth !== undefined ? $fullWidth : fullWidth}
            $fullHeight={$fullHeight !== undefined ? $fullHeight : fullHeight}
            {...props}
        >
            {children}
        </StyledRow>
    );
}