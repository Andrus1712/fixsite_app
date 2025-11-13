import styled, { css } from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    variant?: "outlined" | "filled";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
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

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const StyledInput = styled.input<{ 
    hasError?: boolean; 
    variant: "outlined" | "filled";
    hasStartIcon?: boolean;
    hasEndIcon?: boolean;
}>`
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 6px;
    transition: all 0.2s;
    
    ${props => props.hasStartIcon && "padding-left: 44px;"}
    ${props => props.hasEndIcon && "padding-right: 44px;"}
    
    ${props => props.variant === "outlined" ? css`
        border: 1px solid ${props.hasError ? "#ef4444" : "#d1d5db"};
        background-color: white;
        
        &:focus {
            outline: none;
            border-color: ${props.hasError ? "#ef4444" : "#3b82f6"};
            box-shadow: 0 0 0 3px ${props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
        }
    ` : css`
        border: none;
        border-bottom: 2px solid ${props.hasError ? "#ef4444" : "#d1d5db"};
        background-color: #f9fafb;
        border-radius: 6px 6px 0 0;
        
        &:focus {
            outline: none;
            border-bottom-color: ${props.hasError ? "#ef4444" : "#3b82f6"};
            background-color: white;
        }
    `}
    
    &:disabled {
        background-color: #f3f4f6;
        color: #9ca3af;
        cursor: not-allowed;
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const IconContainer = styled.div<{ position: "start" | "end" }>`
    position: absolute;
    ${props => props.position === "start" ? "left: 12px;" : "right: 12px;"}
    color: #6b7280;
    display: flex;
    align-items: center;
    pointer-events: none;
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    fullWidth,
    variant = "outlined",
    startIcon,
    endIcon,
    ...props
}, ref) => {
    return (
        <InputContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                {startIcon && <IconContainer position="start">{startIcon}</IconContainer>}
                <StyledInput
                    ref={ref}
                    hasError={!!error}
                    variant={variant}
                    hasStartIcon={!!startIcon}
                    hasEndIcon={!!endIcon}
                    {...props}
                />
                {endIcon && <IconContainer position="end">{endIcon}</IconContainer>}
            </InputWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>
    );
});

Input.displayName = "Input";

export default Input;