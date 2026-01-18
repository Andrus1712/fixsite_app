import { forwardRef, type InputHTMLAttributes } from "react";
import { CheckboxContainer, CheckboxWrapper, HiddenCheckbox, StyledCheckbox, CheckIcon, IndeterminateIcon, Label, ErrorText } from "./CheckboxStyles";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string | React.ReactNode;
    error?: string;
    indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
    label,
    error,
    indeterminate,
    checked,
    disabled,
    ...props
}, ref) => {
    return (
        <CheckboxContainer>
            <CheckboxWrapper>
                <HiddenCheckbox
                    ref={ref}
                    checked={checked}
                    disabled={disabled}
                    {...props}
                />
                <StyledCheckbox
                    $checked={checked}
                    $indeterminate={indeterminate}
                    $hasError={!!error}
                >
                    {indeterminate ? (
                        <IndeterminateIcon />
                    ) : (
                        <CheckIcon $visible={!!checked} viewBox="0 0 24 24">
                            <path d="M20 6L9 17L4 12" />
                        </CheckIcon>
                    )}
                </StyledCheckbox>
                {label && (
                    typeof label === 'string' ? (
                        <Label $disabled={disabled}>{label}</Label>
                    ) : (
                        label
                    )
                )}
            </CheckboxWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </CheckboxContainer>
    );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
