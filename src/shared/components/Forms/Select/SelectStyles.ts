import styled from "styled-components";

export const SelectContainer = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.$fullWidth ? "100%" : "auto"};
`;

export const Label = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const SelectWrapper = styled.div`
    position: relative;
`;

export const StyledSelect = styled.select<{ $hasError?: boolean }>`
    width: 100%;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.fontSize.sm};
    border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
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
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.$hasError ? props.theme.colors.errorLight : props.theme.colors.primaryLight}1A;
    }
    
    &:disabled {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.textDisabled};
        cursor: not-allowed;
    }
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;
