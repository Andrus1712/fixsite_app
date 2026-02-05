import styled from "styled-components";

export const TextAreaContainer = styled.div<{ $fullWidth?: boolean }>`
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

export const StyledTextArea = styled.textarea<{
    $hasError?: boolean;
    $resize: "none" | "vertical" | "horizontal" | "both";
}>`
    width: 100%;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.fontSize.sm};
    border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    transition: all 0.2s;
    resize: ${props => props.$resize};
    font-family: inherit;
    min-height: 100px;
    
    &:focus {
        outline: none;
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.$hasError ? props.theme.colors.errorLight : props.theme.colors.primaryLight}1A;
    }
    
    &:disabled {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.textDisabled};
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: ${(props) => props.theme.colors.textMuted};
    }
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;
