import styled from "styled-components";

export const TabsContainer = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const TabsNav = styled.nav`
    display: flex;
    gap: ${(props) => props.theme.spacing.xl};
    overflow-x: auto;
    
    &::-webkit-scrollbar {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.gray200};
        border-radius: 4px;
    }
`;

export const TabButton = styled.button<{ $active: boolean }>`
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xxs};
    border-bottom: 2px solid ${(props) => (props.$active ? props.theme.colors.primary : "transparent")};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.textSecondary)};
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        color: ${(props) => (props.$active ? props.theme.colors.primary : props.theme.colors.text)};
    }
`;

export const TabContent = styled.div`
    min-height: 200px;
`;

export const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${(props) => props.theme.spacing.xl};
    padding-top: ${(props) => props.theme.spacing.lg};
    border-top: 1px solid ${(props) => props.theme.colors.border};
`;
