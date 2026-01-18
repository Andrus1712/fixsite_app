import styled from "styled-components";

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SwitchWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${(props) => props.theme.spacing.sm};
`;

export const HiddenInput = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const Track = styled.div<{
    $checked?: boolean;
    $size: "sm" | "md" | "lg";
    $hasError?: boolean;
}>`
    position: relative;
    border-radius: ${(props) => props.theme.borderRadius.full};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    
    ${props => {
        const sizes = {
            sm: "width: 32px; height: 18px;",
            md: "width: 44px; height: 24px;",
            lg: "width: 56px; height: 32px;"
        };
        return sizes[props.$size];
    }}
    
    background-color: ${props => {
        if (props.$hasError) return props.theme.colors.error;
        return props.$checked ? props.theme.colors.primary : props.theme.colors.gray300;
    }};
    
    ${HiddenInput}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.$hasError
        ? props.theme.colors.errorLight
        : props.theme.colors.primaryLight}40;
    }
    
    ${HiddenInput}:disabled + & {
        background-color: ${(props) => props.theme.colors.gray100};
        cursor: not-allowed;
    }
`;

export const Thumb = styled.div<{
    $checked?: boolean;
    $size: "sm" | "md" | "lg";
}>`
    position: absolute;
    top: 2px;
    background-color: white;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${(props) => props.theme.shadows.sm};
    
    ${props => {
        const sizes = {
            sm: { size: "14px", translate: "14px" },
            md: { size: "20px", translate: "20px" },
            lg: { size: "28px", translate: "24px" }
        };
        const config = sizes[props.$size];
        return `
            width: ${config.size};
            height: ${config.size};
            left: 2px;
            transform: translateX(${props.$checked ? config.translate : "0"});
        `;
    }}
`;

export const Label = styled.span<{ $disabled?: boolean }>`
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${props => props.$disabled ? props.theme.colors.textDisabled : props.theme.colors.text};
    user-select: none;
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;
