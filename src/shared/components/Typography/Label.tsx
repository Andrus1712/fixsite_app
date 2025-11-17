import styled, { css } from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type LabelSize = "sm" | "md" | "lg";
type LabelColor = "primary" | "secondary" | "muted" | "success" | "warning" | "error" | "info" | "white" | "black" | "gray25" | "gray50" | "gray100" | "gray200" | "gray300" | "gray400" | "gray500" | "gray600" | "gray700" | "gray800" | "gray900" | "gray950";
type LabelWeight = "normal" | "medium" | "semibold" | "bold";

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
    size?: LabelSize;
    color?: LabelColor;
    weight?: LabelWeight;
    uppercase?: boolean;
    required?: boolean;
}

const getSizeStyles = (size: LabelSize) => {
    switch (size) {
        case "sm":
            return css`
                font-size: 12px;
                line-height: 1.33;
            `;
        case "md":
            return css`
                font-size: 14px;
                line-height: 1.43;
            `;
        case "lg":
            return css`
                font-size: 16px;
                line-height: 1.5;
            `;
    }
};

const getWeightStyles = (weight: LabelWeight) => {
    switch (weight) {
        case "normal":
            return css`font-weight: 400;`;
        case "medium":
            return css`font-weight: 500;`;
        case "semibold":
            return css`font-weight: 600;`;
        case "bold":
            return css`font-weight: 700;`;
    }
};

const getColorStyles = (color: LabelColor) => {
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

const StyledLabel = styled.label<LabelProps>`
    display: block;
    margin-bottom: 4px;
    
    ${props => getSizeStyles(props.size || "md")}
    ${props => getWeightStyles(props.weight || "medium")}
    ${props => getColorStyles(props.color || "primary")}
    
    text-transform: ${props => props.uppercase ? "uppercase" : "none"};
    
    ${props => props.uppercase && css`
        letter-spacing: 0.05em;
    `}
`;

const RequiredAsterisk = styled.span`
    color: #ef4444;
    margin-left: 2px;
`;

export default function Label({ children, required, ...props }: LabelProps) {
    return (
        <StyledLabel {...props}>
            {children}
            {required && <RequiredAsterisk>*</RequiredAsterisk>}
        </StyledLabel>
    );
}