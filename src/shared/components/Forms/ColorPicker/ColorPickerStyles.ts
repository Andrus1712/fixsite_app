import styled from "styled-components";

export const PickerContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
`;

export const Label = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const SelectedColorDisplay = styled.div<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    border: 1px solid ${(props) => props.$isOpen ? props.theme.colors.primary : props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.surface};
    min-height: 44px;
    transition: all 0.2s ease;
    box-shadow: ${(props) => props.$isOpen ? `0 0 0 3px ${props.theme.colors.primaryLight}1A` : "none"};

    &:hover {
        border-color: ${(props) => props.theme.colors.primary};
    }
`;

export const ColorCircle = styled.div<{ $color: string; $size?: string }>`
    width: ${(props) => props.$size || "20px"};
    height: ${(props) => props.$size || "20px"};
    border-radius: 50%;
    background-color: ${(props) => props.$color};
    border: 1px solid ${(props) => props.theme.colors.border};
    flex-shrink: 0;
`;

export const ColorName = styled.span`
    flex: 1;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.text};
`;

export const Chevron = styled.span<{ $isOpen: boolean }>`
    font-size: 10px;
    color: ${(props) => props.theme.colors.textMuted};
    transition: transform 0.2s ease;
    transform: rotate(${(props) => props.$isOpen ? "180deg" : "0deg"});
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background-color: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.lg};
    z-index: ${(props) => props.theme.zIndex.dropdown};
    max-height: 240px;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.gray200};
        border-radius: 4px;
    }
`;

export const ColorOptionItem = styled.div<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    cursor: pointer;
    background-color: ${(props) => props.$isActive ? props.theme.colors.gray50 : "transparent"};
    transition: background 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
    }
`;
