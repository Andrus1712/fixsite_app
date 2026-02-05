import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type TextVariant = "body1" | "body2" | "caption" | "overline";
type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type TextWeight = "normal" | "medium" | "semibold" | "bold";
type TextColor = "primary" | "secondary" | "muted" | "success" | "warning" | "error" | "info" | "inverse" | "disabled" | "accent" | "white" | "black" | "gray25" | "gray50" | "gray100" | "gray200" | "gray300" | "gray400" | "gray500" | "gray600" | "gray700" | "gray800" | "gray900" | "gray950";
type TextAlign = "left" | "center" | "right" | "justify";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
    color?: TextColor;
    align?: TextAlign;
    italic?: boolean;
    underline?: boolean;
    uppercase?: boolean;
    truncate?: boolean;
}

const getVariantStyles = (variant: TextVariant) => {
    switch (variant) {
        case "body1":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.5;
            `;
        case "body2":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.43;
            `;
        case "caption":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.33;
            `;
        case "overline":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.2;
                text-transform: uppercase;
                letter-spacing: 0.1em;
            `;
    }
};

const getWeightStyles = (weight: TextWeight) => {
    switch (weight) {
        case "normal":
            return css`font-weight: ${props => props.theme.fontWeight.normal};`;
        case "medium":
            return css`font-weight: ${props => props.theme.fontWeight.medium};`;
        case "semibold":
            return css`font-weight: ${props => props.theme.fontWeight.semibold};`;
        case "bold":
            return css`font-weight: ${props => props.theme.fontWeight.bold};`;
    }
};

const getColorStyles = (color: TextColor) => {
    switch (color) {
        case "primary":
            return css`color: ${props => props.theme.colors.text};`;
        case "secondary":
            return css`color: ${props => props.theme.colors.textSecondary};`;
        case "muted":
            return css`color: ${props => props.theme.colors.textMuted};`;
        case "success":
            return css`color: ${props => props.theme.colors.success};`;
        case "warning":
            return css`color: ${props => props.theme.colors.warning};`;
        case "error":
            return css`color: ${props => props.theme.colors.error};`;
        case "info":
            return css`color: ${props => props.theme.colors.info};`;
        case "inverse":
            return css`color: ${props => props.theme.colors.textInverse};`;
        case "disabled":
            return css`color: ${props => props.theme.colors.textDisabled};`;
        case "accent":
            return css`color: ${props => props.theme.colors.accent};`;
        case "white":
            return css`color: ${props => props.theme.colors.white};`;
        case "black":
            return css`color: ${props => props.theme.colors.black};`;
        case "gray25":
            return css`color: ${props => props.theme.colors.gray25};`;
        case "gray50":
            return css`color: ${props => props.theme.colors.gray50};`;
        case "gray100":
            return css`color: ${props => props.theme.colors.gray100};`;
        case "gray200":
            return css`color: ${props => props.theme.colors.gray200};`;
        case "gray300":
            return css`color: ${props => props.theme.colors.gray300};`;
        case "gray400":
            return css`color: ${props => props.theme.colors.gray400};`;
        case "gray500":
            return css`color: ${props => props.theme.colors.gray500};`;
        case "gray600":
            return css`color: ${props => props.theme.colors.gray600};`;
        case "gray700":
            return css`color: ${props => props.theme.colors.gray700};`;
        case "gray800":
            return css`color: ${props => props.theme.colors.gray800};`;
        case "gray900":
            return css`color: ${props => props.theme.colors.gray900};`;
        case "gray950":
            return css`color: ${props => props.theme.colors.gray950};`;
    }
};

const StyledText = styled.span<TextProps>`
    ${props => props.size ? css`font-size: ${props.theme.fontSize[props.size]};` : getVariantStyles(props.variant || "body2")}
    ${props => getWeightStyles(props.weight || "normal")}
    ${props => getColorStyles(props.color || "primary")}
    
    text-align: ${props => props.align || "left"};
    font-style: ${props => props.italic ? "italic" : "normal"};
    text-decoration: ${props => props.underline ? "underline" : "none"};
    text-transform: ${props => props.uppercase ? "uppercase" : "none"};
    
    ${props => props.truncate && css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}
`;

export default function Text(props: TextProps) {
    return <StyledText {...props} />;
}