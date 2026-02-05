import { forwardRef, type InputHTMLAttributes } from "react";
import { ErrorText, HiddenInput, Label, SwitchContainer, SwitchWrapper, Thumb, Track } from "./SwitchStyles";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
    label,
    error,
    size = "md",
    checked,
    disabled,
    ...props
}, ref) => {
    return (
        <SwitchContainer>
            <SwitchWrapper>
                <HiddenInput
                    ref={ref}
                    checked={checked}
                    disabled={disabled}
                    {...props}
                />
                <Track $checked={checked} $size={size} $hasError={!!error}>
                    <Thumb $checked={checked} $size={size} />
                </Track>
                {label && <Label $disabled={disabled}>{label}</Label>}
            </SwitchWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </SwitchContainer>
    );
});

Switch.displayName = "Switch";

export default Switch;
