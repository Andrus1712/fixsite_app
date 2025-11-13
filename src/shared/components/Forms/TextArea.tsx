import styled from "styled-components";
import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextAreaContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.fullWidth ? "100%" : "auto"};
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
`;

const StyledTextArea = styled.textarea<{ 
    hasError?: boolean;
    resize: "none" | "vertical" | "horizontal" | "both";
}>`
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid ${props => props.hasError ? "#ef4444" : "#d1d5db"};
    border-radius: 6px;
    background-color: white;
    transition: all 0.2s;
    resize: ${props => props.resize};
    font-family: inherit;
    min-height: 80px;
    
    &:focus {
        outline: none;
        border-color: ${props => props.hasError ? "#ef4444" : "#3b82f6"};
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
    
    &:disabled {
        background-color: #f3f4f6;
        color: #9ca3af;
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    label,
    error,
    fullWidth,
    resize = "vertical",
    ...props
}, ref) => {
    return (
        <TextAreaContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <StyledTextArea
                ref={ref}
                hasError={!!error}
                resize={resize}
                {...props}
            />
            {error && <ErrorText>{error}</ErrorText>}
        </TextAreaContainer>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;