import styled from "styled-components";

export const SelectContainer = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.$fullWidth ? "100%" : "auto"};
    position: relative;
`;

export const Label = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const InputWrapper = styled.div`
    position: relative;
`;

export const StyledSearchInput = styled.input<{ $hasError?: boolean; $hasValue?: boolean }>`
    width: 100%;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    font-size: ${(props) => props.theme.fontSize.sm};
    border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    transition: all 0.2s;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: ${props => props.$hasValue ? "72px" : "44px"};
    
    &:focus {
        outline: none;
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.$hasError ? props.theme.colors.errorLight : props.theme.colors.primaryLight}1A;
    }

    &::placeholder {
        color: ${(props) => props.theme.colors.textMuted};
    }
`;

export const ClearButton = styled.button`
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    color: ${(props) => props.theme.colors.textMuted};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    
    &:hover {
        color: ${(props) => props.theme.colors.text};
    }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.lg};
    max-height: 240px;
    overflow-y: auto;
    z-index: ${(props) => props.theme.zIndex.dropdown};
    margin: 0;
    padding: 0;
    list-style: none;
    display: ${props => props.$isOpen ? "block" : "none"};
    animation: slideDown 0.2s ease;

    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.gray200};
        border-radius: 4px;
    }
`;

export const DropdownItem = styled.li<{ $active: boolean; $disabled?: boolean }>`
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    font-size: ${(props) => props.theme.fontSize.sm};
    background-color: ${props => props.$active ? props.theme.colors.gray50 : "transparent"};
    color: ${props => props.$disabled ? props.theme.colors.textDisabled : props.$active ? props.theme.colors.primary : props.theme.colors.text};
    font-weight: ${props => props.$active ? props.theme.fontWeight.medium : props.theme.fontWeight.normal};
    transition: background 0.2s;
    
    &:hover {
        background-color: ${props => props.$disabled ? "transparent" : props.theme.colors.gray100};
    }
`;

export const LoadingItem = styled.li`
    padding: ${(props) => props.theme.spacing.md};
    text-align: center;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: ${(props) => props.theme.fontSize.sm};
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;

export const NoOptions = styled.li`
    padding: ${(props) => props.theme.spacing.md};
    text-align: center;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: ${(props) => props.theme.fontSize.sm};
`;
