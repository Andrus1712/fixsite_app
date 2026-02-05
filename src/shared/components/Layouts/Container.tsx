import styled from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";
import { type SpacingKey } from "./Row";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    $size?: ContainerSize;
    size?: ContainerSize;
    $padding?: SpacingKey | number | string;
    padding?: SpacingKey | number | string;
    $center?: boolean;
    center?: boolean;
    title?: string;
    headerActions?: ReactNode;
}

const getSizeValue = (size: ContainerSize | undefined, theme: any) => {
    const sizes = {
        sm: theme.breakpoints.sm,
        md: theme.breakpoints.md,
        lg: theme.breakpoints.lg,
        xl: theme.breakpoints.xl,
        full: "100%",
    };
    return sizes[size || "lg"];
};

const getPaddingValue = (padding: SpacingKey | number | string | undefined, theme: any) => {
    if (padding === undefined) return theme.spacing.md;
    if (typeof padding === "number") return `${padding}px`;
    if (theme.spacing[padding as SpacingKey]) return theme.spacing[padding as SpacingKey];
    return padding;
};

const StyledContainer = styled.div<{ $size?: ContainerSize; $center?: boolean }>`
    width: 100%;
    max-width: ${(props) => getSizeValue(props.$size, props.theme)};
    margin: ${(props) => (props.$center !== false ? "0 auto" : "0")};
    display: flex;
    flex-direction: column;
    min-width: 0; /* Prevent horizontal collapse in flex containers */
`;

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: ${(props) => props.theme.spacing.md};
    border-bottom: 1px solid ${(props) => props.theme.colors.borderLight};
    margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Title = styled.h2`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.xl};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.text};
`;

const Content = styled.div<{ $padding?: SpacingKey | number | string }>`
    padding: ${(props) => getPaddingValue(props.$padding, props.theme)};
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    overflow-x: auto; /* Allow horizontal scroll for wide content like tables/tabs */
    
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        padding: ${(props) => props.theme.spacing.sm};
    }
`;

export default function Container({
    title,
    headerActions,
    children,
    $size, size,
    $padding, padding,
    $center, center,
    ...props
}: ContainerProps) {
    return (
        <StyledContainer
            $size={$size || size}
            $center={$center !== undefined ? $center : (center !== undefined ? center : true)}
            {...props}
        >
            <Content $padding={$padding || padding}>
                {title && (
                    <ContainerHeader>
                        <Title>{title}</Title>
                        {headerActions && <div>{headerActions}</div>}
                    </ContainerHeader>
                )}
                {children}
            </Content>
        </StyledContainer>
    );
}