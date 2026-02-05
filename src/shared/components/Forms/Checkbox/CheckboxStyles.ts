import styled from "styled-components";

export const CheckboxContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const CheckboxWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${(props) => props.theme.spacing.sm};
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const StyledCheckbox = styled.div<{
    $checked?: boolean;
    $indeterminate?: boolean;
    $hasError?: boolean;
}>`
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.$hasError
        ? props.theme.colors.error
        : props.$checked || props.$indeterminate
            ? props.theme.colors.primary
            : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    background-color: ${props => props.$checked || props.$indeterminate
        ? props.theme.colors.primary
        : props.theme.colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    
    &:hover {
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
    
    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.$hasError
        ? props.theme.colors.errorLight
        : props.theme.colors.primaryLight}40;
    }
    
    ${HiddenCheckbox}:disabled + & {
        background-color: ${(props) => props.theme.colors.gray100};
        border-color: ${(props) => props.theme.colors.border};
        cursor: not-allowed;
    }
`;

export const CheckIcon = styled.svg<{ $visible: boolean }>`
    width: 14px;
    height: 14px;
    fill: none;
    stroke: white;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: ${props => props.$visible ? 1 : 0};
    transform: scale(${props => props.$visible ? 1 : 0.5});
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const IndeterminateIcon = styled.div`
    width: 10px;
    height: 2px;
    background-color: white;
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
    margin-left: 28px;
`;
