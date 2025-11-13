import styled from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
}

interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    direction?: "horizontal" | "vertical";
}

const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RadioWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const StyledRadio = styled.div<{ 
    checked?: boolean;
    hasError?: boolean;
}>`
    width: 18px;
    height: 18px;
    border: 2px solid ${props => props.hasError ? "#ef4444" : props.checked ? "#3b82f6" : "#d1d5db"};
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
    
    &:hover {
        border-color: ${props => props.hasError ? "#ef4444" : "#3b82f6"};
    }
    
    ${HiddenRadio}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
    
    ${HiddenRadio}:disabled + & {
        background-color: #f3f4f6;
        border-color: #d1d5db;
        cursor: not-allowed;
    }
`;

const RadioDot = styled.div<{ visible: boolean }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #3b82f6;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
`;

const Label = styled.span<{ disabled?: boolean }>`
    font-size: 14px;
    color: ${props => props.disabled ? "#9ca3af" : "#374151"};
    user-select: none;
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
    margin-left: 26px;
`;

const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const GroupLabel = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
`;

const OptionsContainer = styled.div<{ direction: "horizontal" | "vertical" }>`
    display: flex;
    flex-direction: ${props => props.direction === "horizontal" ? "row" : "column"};
    gap: ${props => props.direction === "horizontal" ? "16px" : "8px"};
    flex-wrap: wrap;
`;

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
    label,
    error,
    checked,
    disabled,
    ...props
}, ref) => {
    return (
        <RadioContainer>
            <RadioWrapper>
                <HiddenRadio
                    ref={ref}
                    checked={checked}
                    disabled={disabled}
                    {...props}
                />
                <StyledRadio checked={checked} hasError={!!error}>
                    <RadioDot visible={!!checked} />
                </StyledRadio>
                {label && <Label disabled={disabled}>{label}</Label>}
            </RadioWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </RadioContainer>
    );
});

Radio.displayName = "Radio";

export function RadioGroup({
    name,
    options,
    value,
    onChange,
    label,
    error,
    direction = "vertical"
}: RadioGroupProps) {
    return (
        <GroupContainer>
            {label && <GroupLabel>{label}</GroupLabel>}
            <OptionsContainer direction={direction}>
                {options.map((option) => (
                    <Radio
                        key={option.value}
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange?.(option.value)}
                        label={option.label}
                        disabled={option.disabled}
                    />
                ))}
            </OptionsContainer>
            {error && <ErrorText style={{ marginLeft: 0 }}>{error}</ErrorText>}
        </GroupContainer>
    );
}

export default Radio;