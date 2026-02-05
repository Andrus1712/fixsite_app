import styled from "styled-components";

export const RadioContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RadioWrapper = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: ${(props) => props.theme.spacing.sm};
`;

export const HiddenRadio = styled.input.attrs({ type: 'radio' })`
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

export const StyledRadio = styled.div<{
    $checked?: boolean;
    $hasError?: boolean;
}>`
    width: 20px;
    height: 20px;
    border: 2px solid ${props => props.$hasError
        ? props.theme.colors.error
        : props.$checked ? props.theme.colors.primary : props.theme.colors.border};
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.surface};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    
    &:hover {
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
    }
    
    ${HiddenRadio}:focus + & {
        box-shadow: 0 0 0 3px ${props => props.$hasError
        ? props.theme.colors.errorLight
        : props.theme.colors.primaryLight}40;
    }
    
    ${HiddenRadio}:disabled + & {
        background-color: ${(props) => props.theme.colors.gray100};
        border-color: ${(props) => props.theme.colors.border};
        cursor: not-allowed;
    }
`;

export const RadioDot = styled.div<{ $visible: boolean }>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.primary};
    opacity: ${props => props.$visible ? 1 : 0};
    transform: scale(${props => props.$visible ? 1 : 0.5});
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
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

export const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const GroupLabel = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const OptionsContainer = styled.div<{ $direction: "horizontal" | "vertical" }>`
    display: flex;
    flex-direction: ${props => props.$direction === "horizontal" ? "row" : "column"};
    gap: ${props => props.$direction === "horizontal" ? props.theme.spacing.lg : props.theme.spacing.sm};
    flex-wrap: wrap;
`;
