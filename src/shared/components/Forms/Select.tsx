import styled from "styled-components";
import { forwardRef, type SelectHTMLAttributes } from "react";

interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    placeholder?: string;
}

const SelectContainer = styled.div<{ fullWidth?: boolean }>`
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

const SelectWrapper = styled.div`
    position: relative;
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid ${props => props.hasError ? "#ef4444" : "#d1d5db"};
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 44px;
    
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
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
    label,
    error,
    fullWidth,
    options,
    placeholder,
    ...props
}, ref) => {
    return (
        <SelectContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <SelectWrapper>
                <StyledSelect ref={ref} hasError={!!error} {...props}>
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