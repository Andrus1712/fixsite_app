import styled, { css } from "styled-components";

export const InputContainer = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.$fullWidth ? "100%" : "auto"};
`;

export const Label = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const StyledInput = styled.input<{
    $hasError?: boolean;
    $variant: "outlined" | "filled";
    $hasStartIcon?: boolean;
    $hasEndIcon?: boolean;
}>`
    width: 100%;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.fontSize.sm};
    border-radius: ${(props) => props.theme.borderRadius.md};
    transition: all 0.2s;
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    
    ${props => props.$hasStartIcon && `padding-left: 44px;`}
    ${props => props.$hasEndIcon && `padding-right: 44px;`}
    
    ${props => props.$variant === "outlined" ? css`
        border: 1px solid ${props.$hasError ? props.theme.colors.error : props.theme.colors.border};
        
        &:focus {
            outline: none;
            border-color: ${props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
            box-shadow: 0 0 0 3px ${props.$hasError ? props.theme.colors.errorLight : props.theme.colors.primaryLight}1A;
        }
    ` : css`
        border: none;
        border-bottom: 2px solid ${props.$hasError ? props.theme.colors.error : props.theme.colors.border};
        background-color: ${(props) => props.theme.colors.gray50};
        border-radius: ${(props) => props.theme.borderRadius.md} ${(props) => props.theme.borderRadius.md} 0 0;
        
        &:focus {
            outline: none;
            border-bottom-color: ${props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
            background-color: ${(props) => props.theme.colors.surface};
        }
    `}
    
    &:disabled {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.textDisabled};
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: ${(props) => props.theme.colors.textMuted};
    }
`;

export const IconContainer = styled.div<{ $position: "start" | "end" }>`
    position: absolute;
    ${props => props.$position === "start" ? "left: 14px;" : "right: 14px;"}
    color: ${(props) => props.theme.colors.textMuted};
    display: flex;
    align-items: center;
    pointer-events: none;
    font-size: 1.1rem;
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;
