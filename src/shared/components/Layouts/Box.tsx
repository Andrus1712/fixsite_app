import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";
import { type SpacingKey } from "./Row";

export type SpacingValue = SpacingKey | number | string;

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
    $p?: SpacingValue; p?: SpacingValue;
    $m?: SpacingValue; m?: SpacingValue;
    $pt?: SpacingValue; pt?: SpacingValue;
    $pb?: SpacingValue; pb?: SpacingValue;
    $pl?: SpacingValue; pl?: SpacingValue;
    $pr?: SpacingValue; pr?: SpacingValue;
    $mt?: SpacingValue; mt?: SpacingValue;
    $mb?: SpacingValue; mb?: SpacingValue;
    $ml?: SpacingValue; ml?: SpacingValue;
    $mr?: SpacingValue; mr?: SpacingValue;
    $bg?: string; bg?: string;
    $rounded?: boolean | string; rounded?: boolean | string;
    $shadow?: boolean | string; shadow?: boolean | string;
    $fullWidth?: boolean; fullWidth?: boolean;
    $fullHeight?: boolean; fullHeight?: boolean;
    $border?: string; border?: string;
    $flex?: string | number; flexProp?: string | number;
    title?: string;
    headerActions?: ReactNode;
    subtitle?: string | ReactNode;
    showDivider?: boolean;
}

const getSpacingValue = (spacing: SpacingValue | undefined, theme: any) => {
    if (spacing === undefined || spacing === null) return undefined;
    if (typeof spacing === "number") return `${spacing}px`;
    if (theme.spacing[spacing as SpacingKey]) return theme.spacing[spacing as SpacingKey];
    return spacing;
};

const StyledBox = styled.div<{
    $m?: SpacingValue;
    $mt?: SpacingValue;
    $mb?: SpacingValue;
    $ml?: SpacingValue;
    $mr?: SpacingValue;
    $bg?: string;
    $rounded?: boolean | string;
    $shadow?: boolean | string;
    $fullWidth?: boolean;
    $fullHeight?: boolean;
    $border?: string;
    $flex?: string | number;
}>`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    
    margin: ${(p) => getSpacingValue(p.$m, p.theme) ?? "0"};
    ${(p) => p.$mt && `margin-top: ${getSpacingValue(p.$mt, p.theme)};`}
    ${(p) => p.$mb && `margin-bottom: ${getSpacingValue(p.$mb, p.theme)};`}
    ${(p) => p.$ml && `margin-left: ${getSpacingValue(p.$ml, p.theme)};`}
    ${(p) => p.$mr && `margin-right: ${getSpacingValue(p.$mr, p.theme)};`}
    
    background-color: ${(p) => p.$bg ?? "transparent"};
    border-radius: ${(p) =>
        typeof p.$rounded === "string" ? p.$rounded :
            p.$rounded ? p.theme.borderRadius.lg : "0"
    };
    box-shadow: ${(p) =>
        typeof p.$shadow === "string" ? p.$shadow :
            p.$shadow ? p.theme.shadows.md : "none"
    };
    border: ${(p) => p.$border ?? "none"};
    
    width: ${(p) => (p.$fullWidth ? "100%" : "auto")};
    height: ${(p) => (p.$fullHeight ? "100%" : "auto")};
    flex: ${(p) => p.$flex ?? "initial"};
`;

const Content = styled.div<{
    $p?: SpacingValue;
    $pt?: SpacingValue;
    $pb?: SpacingValue;
    $pl?: SpacingValue;
    $pr?: SpacingValue;
}>`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;

    padding: ${(p) => getSpacingValue(p.$p, p.theme) ?? "0"};
    ${(p) => p.$pt && `padding-top: ${getSpacingValue(p.$pt, p.theme)};`}
    ${(p) => p.$pb && `padding-bottom: ${getSpacingValue(p.$pb, p.theme)};`}
    ${(p) => p.$pl && `padding-left: ${getSpacingValue(p.$pl, p.theme)};`}
    ${(p) => p.$pr && `padding-right: ${getSpacingValue(p.$pr, p.theme)};`}
`;

const Header = styled.div<{ $showDivider?: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: ${(p) => p.theme.spacing.md};
    padding-bottom: ${(p) => p.theme.spacing.md};
    margin-bottom: ${(p) => p.theme.spacing.lg};
    ${(p) => p.$showDivider && css`
        border-bottom: 1px solid ${p.theme.colors.borderLight};
    `}
    
    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
        flex-direction: column;
        align-items: stretch;
    }
`;

const TitleSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(p) => p.theme.spacing.xxs};
`;

const Title = styled.h3`
    margin: 0;
    font-size: ${(p) => p.theme.fontSize.lg};
    font-weight: ${(p) => p.theme.fontWeight.semibold};
    color: ${(p) => p.theme.colors.text};
`;

const Subtitle = styled.div`
    margin: 0;
    font-size: ${(p) => p.theme.fontSize.sm};
    color: ${(p) => p.theme.colors.textSecondary};
    line-height: 1.5;
`;

export default function Box({
    title, headerActions, subtitle, showDivider = true,
    $p, p, $pt, pt, $pb, pb, $pl, pl, $pr, pr,
    $m, m, $mt, mt, $mb, mb, $ml, ml, $mr, mr,
    $bg, bg, $rounded, rounded, $shadow, shadow,
    $fullWidth, fullWidth, $fullHeight, fullHeight,
    $border, border, $flex, flexProp,
    children,
    ...rest
}: BoxProps) {
    return (
        <StyledBox
            $m={$m || m} $mt={$mt || mt} $mb={$mb || mb} $ml={$ml || ml} $mr={$mr || mr}
            $bg={$bg || bg}
            $rounded={$rounded !== undefined ? $rounded : rounded}
            $shadow={$shadow !== undefined ? $shadow : shadow}
            $fullWidth={$fullWidth !== undefined ? $fullWidth : fullWidth}
            $fullHeight={$fullHeight !== undefined ? $fullHeight : fullHeight}
            $border={$border || border}
            $flex={$flex || flexProp}
            {...rest}
        >
            <Content
                $p={$p || p} $pt={$pt || pt} $pb={$pb || pb} $pl={$pl || pl} $pr={$pr || pr}
            >
                {(title || headerActions || subtitle) && (
                    <Header $showDivider={showDivider}>
                        <TitleSection>
                            {title && <Title>{title}</Title>}
                            {subtitle && (
                                <Subtitle>
                                    {typeof subtitle === "string" ? subtitle : subtitle}
                                </Subtitle>
                            )}
                        </TitleSection>
                        {headerActions && <div>{headerActions}</div>}
                    </Header>
                )}
                {children}
            </Content>
        </StyledBox>
    );
}
