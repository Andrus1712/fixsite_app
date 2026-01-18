import styled from "styled-components";
import { type SpacingKey } from "./Row";

export interface DividerProps {
    $orientation?: "horizontal" | "vertical";
    orientation?: "horizontal" | "vertical";
    $color?: string;
    color?: string;
    $thickness?: number;
    thickness?: number;
    $margin?: SpacingKey | number | string;
    margin?: SpacingKey | number | string;
    $width?: string | number;
    width?: string | number;
    $opacity?: number;
    opacity?: number;
    $gradient?: boolean;
    gradient?: boolean;
}

const getMarginValue = (margin: SpacingKey | number | string | undefined, theme: any) => {
    if (margin === undefined) return theme.spacing.md;
    if (typeof margin === "number") return `${margin}px`;
    if (theme.spacing[margin as SpacingKey]) return theme.spacing[margin as SpacingKey];
    return margin;
};

const StyledDivider = styled.div<{
    $orientation?: "horizontal" | "vertical";
    $color?: string;
    $thickness?: number;
    $margin?: SpacingKey | number | string;
    $width?: string | number;
    $opacity?: number;
    $gradient?: boolean;
}>`
    opacity: ${(props) => props.$opacity ?? 0.6};
    border-radius: ${(props) => (props.$thickness || 1) / 2}px;
    flex-shrink: 0;
    
    ${(props) =>
        props.$gradient
            ? `background: linear-gradient(90deg, transparent, ${props.$color || props.theme.colors.border}, transparent);`
            : `background-color: ${props.$color || props.theme.colors.border};`}
    
    ${(props) =>
        props.$orientation === "vertical"
            ? `
            width: ${props.$thickness || 1}px;
            height: ${typeof props.$width === "number" ? `${props.$width}px` : props.$width || "100%"};
            margin: 0 ${getMarginValue(props.$margin, props.theme)};
        `
            : `
            height: ${props.$thickness || 1}px;
            width: ${typeof props.$width === "number" ? `${props.$width}px` : props.$width || "100%"};
            margin: ${getMarginValue(props.$margin, props.theme)} 0;
        `}
`;

export default function Divider({
    $orientation, orientation = "horizontal",
    $color, color,
    $thickness, thickness = 1,
    $margin, margin = "md",
    $width, width,
    $opacity, opacity = 0.6,
    $gradient, gradient = false,
}: DividerProps) {
    return (
        <StyledDivider
            $orientation={$orientation || orientation}
            $color={$color || color}
            $thickness={$thickness || thickness}
            $margin={$margin || margin}
            $width={$width || width}
            $opacity={$opacity !== undefined ? $opacity : opacity}
            $gradient={$gradient !== undefined ? $gradient : gradient}
        />
    );
}