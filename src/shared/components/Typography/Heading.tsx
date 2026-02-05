import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingColor = "primary" | "secondary" | "muted" | "success" | "warning" | "error" | "info" | "inverse" | "accent" | "white" | "black" | "gray25" | "gray50" | "gray100" | "gray200" | "gray300" | "gray400" | "gray500" | "gray600" | "gray700" | "gray800" | "gray900" | "gray950";
type HeadingAlign = "left" | "center" | "right";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    level?: HeadingLevel;
    color?: HeadingColor;
    align?: HeadingAlign;
    truncate?: boolean;
}

const getHeadingStyles = (level: HeadingLevel) => {
    switch (level) {
        case "h1":
            return css`
                font-size: ${props => props.theme.fontSize['4xl']};
                font-weight: ${props => props.theme.fontWeight.bold};
                line-height: 1.25;
            `;
        case "h2":
            return css`
                font-size: ${props => props.theme.fontSize['2xl']};
                font-weight: ${props => props.theme.fontWeight.semibold};
                line-height: 1.33;
            `;
        case "h3":
            return css`
                font-size: ${props => props.theme.fontSize.xl};
                font-weight: ${props => props.theme.fontWeight.semibold};
                line-height: 1.4;
            `;
        case "h4":
            return css`
                font-size: ${props => props.theme.fontSize.lg};
                font-weight: ${props => props.theme.fontWeight.semibold};
                line-height: 1.44;
            `;
        case "h5":
            return css`
                font-size: ${props => props.theme.fontSize.base};
                font-weight: ${props => props.theme.fontWeight.semibold};
                line-height: 1.5;
            `;
        case "h6":
            return css`
                font-size: ${props => props.theme.fontSize.sm};
                font-weight: ${props => props.theme.fontWeight.semibold};
                line-height: 1.57;
            `;
    }
};

const getColorStyles = (color: HeadingColor) => {
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

const StyledHeading = styled.h1<HeadingProps>`
    margin: 0;
    ${props => getHeadingStyles(props.level || "h2")}
    ${props => getColorStyles(props.color || "primary")}
    
    text-align: ${props => props.align || "left"};
    
    ${props => props.truncate && css`
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `}
`;

export default function Heading({ level = "h2", ...props }: HeadingProps) {
    return <StyledHeading as={level} level={level} {...props} />;
}