import styled from "styled-components";
import { type HTMLAttributes } from "react";
import { type JustifyContent, type AlignItems, type Gap, type SpacingKey } from "./Row";

export interface ColumnProps extends HTMLAttributes<HTMLDivElement> {
    $justify?: JustifyContent;
    justify?: JustifyContent;
    $align?: AlignItems;
    align?: AlignItems;
    $gap?: Gap;
    gap?: Gap;
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

const StyledColumn = styled.div<{
    $justify?: JustifyContent;
    $align?: AlignItems;
    $gap?: Gap;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
}>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) => props.$justify || "flex-start"};
    align-items: ${(props) => props.$align || "stretch"};
    gap: ${(props) => getSpacing(props.$gap, props.theme)};
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
    height: ${(props) => (props.$fullHeight ? "100%" : "auto")};
`;

export default function Column({
    $justify, justify,
    $align, align,
    $gap, gap,
    $fullWidth, fullWidth,
    $fullHeight, fullHeight,
    children,
    ...props
}: ColumnProps) {
    return (
        <StyledColumn
            $justify={$justify || justify}
            $align={$align || align}
            $gap={$gap || gap}
            $fullWidth={$fullWidth !== undefined ? $fullWidth : fullWidth}
            $fullHeight={$fullHeight !== undefined ? $fullHeight : fullHeight}
            {...props}
        >
            {children}
        </StyledColumn>
    );
}