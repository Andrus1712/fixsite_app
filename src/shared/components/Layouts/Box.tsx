import styled from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type Spacing = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    p?: Spacing; // padding
    m?: Spacing; // margin
    pt?: Spacing;
    pb?: Spacing;
    pl?: Spacing;
    pr?: Spacing;
    mt?: Spacing;
    mb?: Spacing;
    ml?: Spacing;
    mr?: Spacing;
    bg?: string;
    rounded?: boolean;
    shadow?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    title?: string;
    headerActions?: ReactNode;
    subtitle?: string;
}

/* helper */
const getSpacingValue = (spacing: Spacing | undefined) => {
    if (spacing === undefined || spacing === null) return undefined;
    if (typeof spacing === "number") return `${spacing}px`;
    const spacings: Record<Exclude<Spacing, number>, string> = {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
    };
    return spacings[spacing as Exclude<Spacing, number>] ?? "0";
};

/* Styled components using transient props ($...) so react won't forward them to DOM */
const StyledBox = styled.div<{
    $m?: Spacing;
    $mt?: Spacing;
    $mb?: Spacing;
    $ml?: Spacing;
    $mr?: Spacing;
    $bg?: string;
    $rounded?: boolean;
    $shadow?: boolean;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
}>`
    margin: ${(p) => getSpacingValue(p.$m) ?? "0"};
    margin-top: ${(p) =>
        getSpacingValue(p.$mt) ?? getSpacingValue(p.$m) ?? "0"};
    margin-bottom: ${(p) =>
        getSpacingValue(p.$mb) ?? getSpacingValue(p.$m) ?? "0"};
    margin-left: ${(p) =>
        getSpacingValue(p.$ml) ?? getSpacingValue(p.$m) ?? "0"};
    margin-right: ${(p) =>
        getSpacingValue(p.$mr) ?? getSpacingValue(p.$m) ?? "0"};
    background-color: ${(p) => p.$bg ?? "transparent"};
    border-radius: ${(p) => (p.$rounded ? "8px" : "0")};
    box-shadow: ${(p) => (p.$shadow ? "0 1px 3px rgba(0, 0, 0, 0.1)" : "none")};
    width: ${(p) => (p.$fullWidth ? "100%" : "auto")};
    height: ${(p) => (p.$fullHeight ? "100%" : "auto")};
    box-sizing: border-box;
`;

/* Content: compute each padding side — if specific side not provided, fallback to p (general), else 0 */
const Content = styled.div<{
    $p?: Spacing;
    $pt?: Spacing;
    $pb?: Spacing;
    $pl?: Spacing;
    $pr?: Spacing;
}>`
    padding: ${(p) => getSpacingValue(p.$p) ?? "0"};
    padding-top: ${(p) =>
        getSpacingValue(p.$pt) ?? getSpacingValue(p.$p) ?? "0"};
    padding-bottom: ${(p) =>
        getSpacingValue(p.$pb) ?? getSpacingValue(p.$p) ?? "0"};
    padding-left: ${(p) =>
        getSpacingValue(p.$pl) ?? getSpacingValue(p.$p) ?? "0"};
    padding-right: ${(p) =>
        getSpacingValue(p.$pr) ?? getSpacingValue(p.$p) ?? "0"};
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 24px;
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
`;

const Subtitle = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.4;
`;

/* Component: DON'T forward layout props to DOM; map them to transient props ($...) */
export default function Box({
    title,
    headerActions,
    children,
    p,
    pt,
    pb,
    pl,
    pr,
    m,
    mt,
    mb,
    ml,
    mr,
    bg,
    rounded,
    shadow,
    fullWidth,
    fullHeight,
    subtitle,
    ...rest
}: BoxProps) {
    // rest contains only valid HTML props now (id, className, onClick, etc.)
    return (
        <StyledBox
            $m={m}
            $mt={mt}
            $mb={mb}
            $ml={ml}
            $mr={mr}
            $bg={bg}
            $rounded={rounded}
            $shadow={shadow}
            $fullWidth={fullWidth}
            $fullHeight={fullHeight}
            {...(rest as HTMLAttributes<HTMLDivElement>)}
        >
            <Content $p={p} $pt={pt} $pb={pb} $pl={pl} $pr={pr}>
                {(title || headerActions) && (
                    <Header>
                        <TitleSection>
                            {title && <Title>{title}</Title>}
                            {subtitle && <Subtitle>{subtitle}</Subtitle>}
                        </TitleSection>
                        {headerActions && <div>{headerActions}</div>}
                    </Header>
                )}
                {children}
            </Content>
        </StyledBox>
    );
}
