import styled from "styled-components";
import { type SpacingKey } from "./Row";

export type SpacerSize = SpacingKey | number | string;

export interface SpacerProps {
    $size?: SpacerSize;
    size?: SpacerSize;
    $horizontal?: boolean;
    horizontal?: boolean;
}

const getSizeValue = (size: SpacerSize | undefined, theme: any) => {
    if (size === undefined) return theme.spacing.md;
    if (typeof size === "number") return `${size}px`;
    if (theme.spacing[size as SpacingKey]) return theme.spacing[size as SpacingKey];
    return size;
};

const StyledSpacer = styled.div<{ $size?: SpacerSize; $horizontal?: boolean }>`
    flex-shrink: 0;
    ${(props) =>
        props.$horizontal
            ? `width: ${getSizeValue(props.$size, props.theme)}; height: 1px;`
            : `height: ${getSizeValue(props.$size, props.theme)}; width: 1px;`}
`;

export default function Spacer({
    $size, size = "md",
    $horizontal, horizontal = false
}: SpacerProps) {
    return (
        <StyledSpacer
            $size={$size || size}
            $horizontal={$horizontal !== undefined ? $horizontal : horizontal}
        />
    );
}