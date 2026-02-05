import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type TextVariant = 
  | "body1" 
  | "body2" 
  | "caption" 
  | "overline"
  | "paragraph"
  | "paragraph-sm"
  | "paragraph-lg"
  | "label"
  | "label-sm"
  | "label-lg"
  | "code"
  | "code-sm"
  | "quote"
  | "lead"
  | "muted"
  | "small"
  | "micro"
  | "monospace";

type TextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
type TextWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
type TextColor = 
  | "primary" 
  | "secondary" 
  | "muted" 
  | "success" 
  | "warning" 
  | "error" 
  | "info" 
  | "inverse" 
  | "disabled" 
  | "accent" 
  | "white" 
  | "black" 
  | "gray25" 
  | "gray50" 
  | "gray100" 
  | "gray200" 
  | "gray300" 
  | "gray400" 
  | "gray500" 
  | "gray600" 
  | "gray700" 
  | "gray800" 
  | "gray900" 
  | "gray950";
type TextAlign = "left" | "center" | "right" | "justify";
type TextDecoration = "none" | "underline" | "line-through" | "overline";
type TextTransform = "none" | "uppercase" | "lowercase" | "capitalize";

interface TextProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
    color?: TextColor;
    align?: TextAlign;
    italic?: boolean;
    underline?: boolean;
    lineThrough?: boolean;
    uppercase?: boolean;
    lowercase?: boolean;
    capitalize?: boolean;
    truncate?: boolean;
    multiline?: number; // number of lines before truncation
    letterSpacing?: "tight" | "normal" | "wide";
    lineHeight?: "tight" | "normal" | "relaxed" | "loose" | number;
    opacity?: number; // 0-1
}

const getVariantStyles = (variant: TextVariant) => {
    switch (variant) {
        case "body1":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.5;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "body2":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.43;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "caption":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.33;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "overline":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.2;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: ${props => props.theme.fontWeight.semibold};
            `;
        case "paragraph":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.6;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "paragraph-sm":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.6;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "paragraph-lg":
            return css`
                font-size: ${props => props.theme.fontSize.lg};
                line-height: 1.7;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "label":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.4;
                font-weight: ${props => props.theme.fontWeight.medium};
            `;
        case "label-sm":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.3;
                font-weight: ${props => props.theme.fontWeight.medium};
            `;
        case "label-lg":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.4;
                font-weight: ${props => props.theme.fontWeight.medium};
            `;
        case "code":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.4;
                font-weight: ${props => props.theme.fontWeight.normal};
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            `;
        case "code-sm":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.3;
                font-weight: ${props => props.theme.fontWeight.normal};
                font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            `;
        case "quote":
            return css`
                font-size: ${props => props.theme.fontSize.lg};
                line-height: 1.8;
                font-weight: ${props => props.theme.fontWeight.normal};
                font-style: italic;
                border-left: 4px solid ${props => props.theme.colors.primary};
                padding-left: ${props => props.theme.spacing.md};
            `;
        case "lead":
            return css`
                font-size: ${props => props.theme.fontSize.lg};
                line-height: 1.8;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "muted":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.5;
                font-weight: ${props => props.theme.fontWeight.normal};
                color: ${props => props.theme.colors.textMuted};
                opacity: 0.8;
            `;
        case "small":
            return css`
                font-size: ${props => props.theme.fontSize.xs};
                line-height: 1.3;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "micro":
            return css`
                font-size: 0.625rem;
                line-height: 1.2;
                font-weight: ${props => props.theme.fontWeight.normal};
            `;
        case "monospace":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                line-height: 1.5;
                font-weight: ${props => props.theme.fontWeight.normal};
                font-family: 'Courier New', monospace;
                letter-spacing: 0.05em;
            `;
        default:
            return css`
                font-size: ${props => props.theme.fontSize.base};
                line-height: 1.5;
            `;
    }
};

const getWeightStyles = (weight: TextWeight) => {
    switch (weight) {
        case "thin":
            return css`font-weight: ${props => props.theme.fontWeight.thin};`;
        case "light":
            return css`font-weight: ${props => props.theme.fontWeight.light};`;
        case "normal":
            return css`font-weight: ${props => props.theme.fontWeight.normal};`;
        case "medium":
            return css`font-weight: ${props => props.theme.fontWeight.medium};`;
        case "semibold":
            return css`font-weight: ${props => props.theme.fontWeight.semibold};`;
        case "bold":
            return css`font-weight: ${props => props.theme.fontWeight.bold};`;
        case "extrabold":
            return css`font-weight: ${props => props.theme.fontWeight.extrabold};`;
        case "black":
            return css`font-weight: ${props => props.theme.fontWeight.black};`;
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
        default:
            if (typeof color === 'string') {
                return css`color: ${color};`;
            }
            break;
    }
};

const StyledText = styled.span<TextProps>`
    ${props => props.size ? css`font-size: ${props.theme.fontSize[props.size]};` : getVariantStyles(props.variant || "body2")}
    ${props => getWeightStyles(props.weight || "normal")}
    ${props => getColorStyles(props.color || "primary")}
    
    text-align: ${props => props.align || "left"};
    font-style: ${props => props.italic ? "italic" : "normal"};
    
    ${props => {
        if (props.lineThrough && props.underline) {
            return css`text-decoration: underline line-through;`;
        }
        if (props.lineThrough) {
            return css`text-decoration: line-through;`;
        }
        if (props.underline) {
            return css`text-decoration: underline;`;
        }
        return css`text-decoration: none;`;
    }}
    
    ${props => {
        if (props.uppercase) return css`text-transform: uppercase;`;
        if (props.lowercase) return css`text-transform: lowercase;`;
        if (props.capitalize) return css`text-transform: capitalize;`;
        return css`text-transform: none;`;
    }}

    ${props => props.letterSpacing && css`
        letter-spacing: ${
            props.letterSpacing === "tight" ? "-0.02em" :
            props.letterSpacing === "wide" ? "0.1em" :
            "normal"
        };
    `}

    ${props => props.lineHeight && css`
        line-height: ${
            props.lineHeight === "tight" ? "1.2" :
            props.lineHeight === "normal" ? "1.5" :
            props.lineHeight === "relaxed" ? "1.75" :
            props.lineHeight === "loose" ? "2" :
            props.lineHeight
        };
    `}

    ${props => props.opacity !== undefined && css`
        opacity: ${props.opacity};
    `}
    
    ${props => props.truncate && css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}

    ${props => props.multiline && css`
        display: -webkit-box;
        -webkit-line-clamp: ${props.multiline};
        -webkit-box-orient: vertical;
        overflow: hidden;
    `}
`;

export default function Text(props: TextProps) {
    return <StyledText {...props} />;
}