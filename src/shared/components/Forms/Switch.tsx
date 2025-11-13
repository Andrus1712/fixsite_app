import styled from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string;
    error?: string;
    size?: "sm" | "md" | "lg";
}

const SwitchContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SwitchWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 8px;
`;

const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const Track = styled.div<{ 
    checked?: boolean;
    size: "sm" | "md" | "lg";
    hasError?: boolean;
}>`
    position: relative;
    border-radius: 9999px;
    transition: all 0.2s;
    flex-shrink: 0;
    
    ${props => {
        const sizes = {
            sm: "width: 32px; height: 18px;",
            md: "width: 44px; height: 24px;",
            lg: "width: 56px; height: 32px;"
        };
        return sizes[props.size];
    }}
    
    background-color: ${props => {
        if (props.hasError) return "#ef4444";
        return props.checked ? "#3b82f6" : "#d1d5db";
    }};
    
    ${HiddenInput}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
    
    ${HiddenInput}:disabled + & {
        background-color: #f3f4f6;
        cursor: not-allowed;
    }
`;

const Thumb = styled.div<{ 
    checked?: boolean;
    size: "sm" | "md" | "lg";
}>`
    position: absolute;
    top: 2px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    ${props => {
        const sizes = {
            sm: { size: "14px", translate: "16px" },
            md: { size: "20px", translate: "22px" },
            lg: { size: "28px", translate: "26px" }
        };
        const config = sizes[props.size];
        return `
            width: ${config.size};
            height: ${config.size};
            left: 2px;
            transform: translateX(${props.checked ? config.translate : "0"});
        `;
    }}
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
`;

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
                <Track checked={checked} size={size} hasError={!!error}>
                    <Thumb checked={checked} size={size} />
                </Track>
                {label && <Label disabled={disabled}>{label}</Label>}
            </SwitchWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </SwitchContainer>
    );
});

Switch.displayName = "Switch";

export default Switch;