import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type SubtitleVariant = "subtitle1" | "subtitle2";
type SubtitleColor = "primary" | "secondary" | "muted" | "success" | "warning" | "error" | "info" | "white" | "black" | "gray25" | "gray50" | "gray100" | "gray200" | "gray300" | "gray400" | "gray500" | "gray600" | "gray700" | "gray800" | "gray900" | "gray950";
type SubtitleAlign = "left" | "center" | "right";

interface SubtitleProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
    variant?: SubtitleVariant;
    color?: SubtitleColor;
    align?: SubtitleAlign;
    truncate?: boolean;
}

const getVariantStyles = (variant: SubtitleVariant) => {
    switch (variant) {
        case "subtitle1":
            return css`
                font-size: 16px;
                font-weight: 500;
                line-height: 1.5;
            `;
        case "subtitle2":
            return css`
                font-size: 14px;
                font-weight: 500;
                line-height: 1.43;
            `;
    }
};

const getColorStyles = (color: SubtitleColor) => {
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

const StyledSubtitle = styled.p<SubtitleProps>`
    margin: 0;
    ${props => getVariantStyles(props.variant || "subtitle1")}
    ${props => getColorStyles(props.color || "secondary")}
    
    text-align: ${props => props.align || "left"};
    
    ${props => props.truncate && css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}
`;

export default function Subtitle(props: SubtitleProps) {
    return <StyledSubtitle {...props} />;
}