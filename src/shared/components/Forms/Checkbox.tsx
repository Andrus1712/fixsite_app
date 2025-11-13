import styled from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string | React.ReactNode;
    error?: string;
    indeterminate?: boolean;
}

const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const StyledCheckbox = styled.div<{ 
    checked?: boolean; 
    indeterminate?: boolean;
    hasError?: boolean;
}>`
    width: 18px;
    height: 18px;
    border: 2px solid ${props => props.hasError ? "#ef4444" : props.checked || props.indeterminate ? "#3b82f6" : "#d1d5db"};
    border-radius: 4px;
    background-color: ${props => props.checked || props.indeterminate ? "#3b82f6" : "white"};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
    
    &:hover {
        border-color: ${props => props.hasError ? "#ef4444" : "#3b82f6"};
    }
    
    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
    
    ${HiddenCheckbox}:disabled + & {
        background-color: #f3f4f6;
        border-color: #d1d5db;
        cursor: not-allowed;
    }
`;

const CheckIcon = styled.svg<{ visible: boolean }>`
    width: 12px;
    height: 12px;
    fill: white;
    opacity: ${props => props.visible ? 1 : 0};
    transition: opacity 0.2s;
`;

const IndeterminateIcon = styled.div`
    width: 8px;
    height: 2px;
    background-color: white;
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
                    checked={checked} 
                    indeterminate={indeterminate}
                    hasError={!!error}
                >
                    {indeterminate ? (
                        <IndeterminateIcon />
                    ) : (
                        <CheckIcon visible={!!checked}>
                            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </CheckIcon>
                    )}
                </StyledCheckbox>
                {label && (
                    typeof label === 'string' ? (
                        <Label disabled={disabled}>{label}</Label>
                    ) : (
                        <div>{label}</div>
                    )
                )}
            </CheckboxWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </CheckboxContainer>
    );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;