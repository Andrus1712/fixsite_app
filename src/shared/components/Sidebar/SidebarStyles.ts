import { NavLink } from "react-router";
import styled from "styled-components";

export const SidebarContainer = styled.div<{ $isOpen: boolean; $isCollapsed: boolean; $isDesktop: boolean }>`
    background: ${(props) => props.theme.colors.gray25};
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: ${(props) => (props.$isCollapsed ? props.theme.layout.sidebarCollapsedWidth : props.theme.layout.sidebarWidth)};
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${(props) => props.theme.shadows.lg};
    border-right: 1px solid ${(props) => props.theme.colors.borderLight};
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    overflow: ${(props) => (props.$isCollapsed ? "visible" : "hidden")};

    ${(props) => !props.$isOpen && props.$isDesktop && !props.$isCollapsed && `
        display: none;
    `}

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        width: ${(props) => props.theme.layout.sidebarWidth};
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    }
`;

export const SidebarItems = styled.div<{ $isCollapsed?: boolean }>`
    display: flex;
    flex-direction: column;
    overflow-y: ${(props) => (props.$isCollapsed ? "visible" : "auto")};
    overflow-x: visible;
    flex: 1;
    width: 100%;
    padding: ${(props) => props.theme.spacing.md} 0;
    
    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.gray300};
        border-radius: ${(props) => props.theme.borderRadius.full};
        
        &:hover {
            background: ${(props) => props.theme.colors.gray400};
        }
    }
`;

export const ModuleContainer = styled.div`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.xxs};
    
    &:last-child {
        margin-bottom: ${(props) => props.theme.spacing.md};
    }
`;

export const SidebarLabel = styled.label`
    color: inherit;
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    cursor: pointer;
    transition: color 0.2s ease;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    
    svg {
        width: 100%;
        height: 100%;
    }
`;

export const SidebarItem = styled(NavLink) <{ $isCollapsed: boolean }>`
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    margin: 0 ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
    text-decoration: none;
    color: ${(props) => props.theme.colors.gray700};
    width: calc(100% - ${(props) => props.theme.spacing.md});
    gap: ${(props) => props.theme.spacing.md};
    border-radius: ${(props) => props.theme.borderRadius.md};
    position: relative;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    font-weight: ${(props) => props.theme.fontWeight.normal};
    justify-content: ${(props) => (props.$isCollapsed ? "center" : "flex-start")};

    ${IconWrapper} {
        color: ${(props) => props.theme.colors.gray500};
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
        color: ${(props) => props.theme.colors.primaryDark};
        transform: translateX(${(props) => (props.$isCollapsed ? "0" : "2px")});

        ${SidebarLabel} {
            color: ${(props) => props.theme.colors.primaryDark};
        }

        ${IconWrapper} {
            color: ${(props) => props.theme.colors.primary};
            transform: scale(1.05);
        }
    }

    &.active {
        background: linear-gradient(135deg, ${(props) => props.theme.colors.primaryLight}15 0%, ${(props) => props.theme.colors.primary}15 100%);
        color: ${(props) => props.theme.colors.primaryDark};
        font-weight: ${(props) => props.theme.fontWeight.semibold};

        ${SidebarLabel} {
            color: ${(props) => props.theme.colors.primaryDark};
        }

        ${IconWrapper} {
            color: ${(props) => props.theme.colors.primary};
        }

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 60%;
            background: linear-gradient(180deg, ${(props) => props.theme.colors.primary} 0%, ${(props) => props.theme.colors.primaryDark} 100%);
            border-radius: 0 ${(props) => props.theme.borderRadius.md} ${(props) => props.theme.borderRadius.md} 0;
        }
    }
`;

export const ModuleLabel = styled.div`
    color: ${(props) => props.theme.colors.gray500};
    font-size: ${(props) => props.theme.fontSize.xs};
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    margin: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.xxs};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    /* background-color: ${(props) => props.theme.colors.gray50}; */
    /* border-left: 3px solid ${(props) => props.theme.colors.gray300}; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;