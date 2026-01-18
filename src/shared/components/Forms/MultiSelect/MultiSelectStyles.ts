import styled from "styled-components";

export const MultiSelectContainer = styled.div<{ $fullWidth?: boolean }>`
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

export const SelectedItems = styled.div<{ $hasError?: boolean; $isOpen?: boolean }>`
    min-height: 44px;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    border: 1px solid ${props => props.$hasError ? props.theme.colors.error : props.$isOpen ? props.theme.colors.primary : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => props.theme.colors.surface};
    display: flex;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing.xs};
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: ${props => props.$isOpen ? `0 0 0 3px ${props.theme.colors.primaryLight}1A` : "none"};
    
    &:focus-within {
        border-color: ${props => props.$hasError ? props.theme.colors.error : props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.$hasError ? `${props.theme.colors.errorLight}1A` : `${props.theme.colors.primaryLight}1A`};
    }
`;

export const Tag = styled.span`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;
    padding: 2px 8px;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    display: flex;
    align-items: center;
    gap: 4px;
    animation: fadeIn 0.2s ease;

    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;

export const RemoveButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        opacity: 0.8;
    }
`;

export const Placeholder = styled.span`
    color: ${(props) => props.theme.colors.textMuted};
    font-size: ${(props) => props.theme.fontSize.sm};
`;

export const DropdownList = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.lg};
    z-index: ${(props) => props.theme.zIndex.dropdown};
    max-height: 240px;
    overflow-y: auto;
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

export const DropdownItem = styled.div<{ $isActive: boolean }>`
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSize.sm};
    background-color: ${props => props.$isActive ? props.theme.colors.gray50 : "transparent"};
    color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.text};
    font-weight: ${props => props.$isActive ? props.theme.fontWeight.medium : props.theme.fontWeight.normal};
    
    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
    }
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;
