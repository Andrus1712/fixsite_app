import { forwardRef, type SelectHTMLAttributes } from "react";
import { ErrorText, Label, SelectContainer, SelectWrapper, StyledSelect } from "./SelectStyles";

interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    fullWidth,
    options,
    placeholder,
    ...props
}, ref) => {
    return (
        <SelectContainer $fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <SelectWrapper>
                <StyledSelect ref={ref} $hasError={!!error} {...props}>
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </option>
                    ))}
                </StyledSelect>
            </SelectWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </SelectContainer>
    );
});

Select.displayName = "Select";

export default Select;
