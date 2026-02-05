import styled from "styled-components";
import { type HTMLAttributes } from "react";
import { type Gap, type SpacingKey } from "./Row";

export type GridColumnsValue = number | "auto" | string;

export interface ResponsiveGridColumns {
    xs?: GridColumnsValue;
    sm?: GridColumnsValue;
    md?: GridColumnsValue;
    lg?: GridColumnsValue;
    xl?: GridColumnsValue;
    "2xl"?: GridColumnsValue;
}

export type GridColumns = GridColumnsValue | ResponsiveGridColumns;

export interface ResponsiveGap {
    xs?: Gap;
    sm?: Gap;
    md?: Gap;
    lg?: Gap;
    xl?: Gap;
    "2xl"?: Gap;
}

export type GridGap = Gap | ResponsiveGap;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
    $columns?: GridColumns;
    columns?: GridColumns;
    $rows?: GridColumns;
    rows?: GridColumns;
    $gap?: GridGap;
    gap?: GridGap;
    $fullWidth?: boolean;
    fullWidth?: boolean;
    $fullHeight?: boolean;
    fullHeight?: boolean;
    $align?: string;
    align?: string;
    $justify?: string;
    justify?: string;
}

const getSpacingValue = (gap: Gap | undefined, theme: any) => {
    if (gap === undefined) return theme.spacing.md;
    if (typeof gap === "number") return `${gap}px`;
    if (theme.spacing[gap as SpacingKey]) return theme.spacing[gap as SpacingKey];
    return gap;
};

const getColumnsStyleValue = (columns: GridColumnsValue | undefined) => {
    if (columns === undefined) return undefined;
    if (columns === "auto") return "repeat(auto-fit, minmax(200px, 1fr))";
    if (typeof columns === "number") return `repeat(${columns}, 1fr)`;
    return columns;
};

const getResponsiveStyles = (
    prop: any,
    theme: any,
    cssProperty: string,
    getValueFn: (val: any, theme?: any) => string | undefined
) => {
    if (!prop) return "";

    const keys = ["xs", "sm", "md", "lg", "xl", "2xl"];
    const isResponsive =
        typeof prop === "object" &&
        prop !== null &&
        !prop._styled &&
        keys.some(key => key in prop);

    if (!isResponsive) {
        const value = getValueFn(prop, theme);
        return value ? `${cssProperty}: ${value};` : "";
    }

    // It is a responsive object
    let styles = "";
    const breakpoints = theme.breakpoints;
    const keyList = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

    keyList.forEach((key) => {
        const value = (prop as any)[key];
        if (value !== undefined) {
            const cssValue = getValueFn(value, theme);
            if (cssValue) {
                if (key === "xs") {
                    styles += `${cssProperty}: ${cssValue};`;
                } else {
                    styles += `
                        @media (min-width: ${breakpoints[key]}) {
                            ${cssProperty}: ${cssValue};
                        }
                    `;
                }
            }
        }
    });

    return styles;
};

const StyledGrid = styled.div<{
    $columns?: GridColumns;
    $rows?: GridColumns;
    $gap?: GridGap;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
    $align?: string;
    $justify?: string;
}>`
    display: grid;
    
    ${(props) => getResponsiveStyles(props.$columns, props.theme, "grid-template-columns", getColumnsStyleValue)}
    ${(props) => getResponsiveStyles(props.$rows, props.theme, "grid-template-rows", getColumnsStyleValue)}
    ${(props) => getResponsiveStyles(props.$gap, props.theme, "gap", getSpacingValue)}

    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
    height: ${(props) => (props.$fullHeight ? "100%" : "auto")};
    align-items: ${(props) => props.$align || "stretch"};
    justify-content: ${(props) => props.$justify || "stretch"};
`;

export default function Grid({
    $columns, columns,
    $rows, rows,
    $gap, gap,
    $fullWidth, fullWidth,
    $fullHeight, fullHeight,
    $align, align,
    $justify, justify,
    children,
    ...props
}: GridProps) {
    return (
        <StyledGrid
            $columns={$columns || columns}
            $rows={$rows || rows}
            $gap={$gap || gap}
            $fullWidth={$fullWidth !== undefined ? $fullWidth : fullWidth}
            $fullHeight={$fullHeight !== undefined ? $fullHeight : fullHeight}
            $align={$align || align}
            $justify={$justify || justify}
            {...props}
        >
            {children}
        </StyledGrid>
    );
}