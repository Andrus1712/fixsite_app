import { forwardRef, type InputHTMLAttributes } from "react";
import { ErrorText, IconContainer, InputContainer, InputWrapper, StyledInput, Label } from "./InputStyles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    variant?: "outlined" | "filled";
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

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
        <InputContainer $fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                {startIcon && <IconContainer $position="start">{startIcon}</IconContainer>}
                <StyledInput
                    ref={ref}
                    $hasError={!!error}
                    $variant={variant}
                    $hasStartIcon={!!startIcon}
                    $hasEndIcon={!!endIcon}
                    {...props}
                />
                {endIcon && <IconContainer $position="end">{endIcon}</IconContainer>}
            </InputWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </InputContainer>
    );
});

Input.displayName = "Input";

export default Input;
