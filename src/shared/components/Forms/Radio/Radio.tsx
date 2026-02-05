import { forwardRef, type InputHTMLAttributes } from "react";
import {
    ErrorText,
    GroupContainer,
    GroupLabel,
    HiddenRadio,
    Label,
    OptionsContainer,
    RadioContainer,
    RadioDot,
    RadioWrapper,
    StyledRadio
} from "./RadioStyles";

export interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
}

export interface RadioGroupProps {
    name: string;
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    direction?: "horizontal" | "vertical";
}

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
                <StyledRadio $checked={checked} $hasError={!!error}>
                    <RadioDot $visible={!!checked} />
                </StyledRadio>
                {label && <Label $disabled={disabled}>{label}</Label>}
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
            <OptionsContainer $direction={direction}>
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
