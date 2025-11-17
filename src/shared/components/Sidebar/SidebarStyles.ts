import { NavLink } from "react-router";
import styled from "styled-components";

export const SidebarContainer = styled.div<{ $isOpen: boolean; }>`
    background: ${(props) => props.theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100vh;
    width: 100%;
    transition: transform 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});

    @media (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 280px;
        transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    }
`;

export const SidebarHeader = styled.div`
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    height: 3.3333rem;
    display: flex;
    align-items: center;
    width: 100%;
    background: ${(props) => props.theme.colors.primaryDark};
    /* padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.xs}; */
`;

export const SidebarItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    flex: 1;
    width: 100%;
    margin-top: ${(props) => props.theme.spacing.xs};
    /* padding: ${(props) => props.theme.spacing.md}; */
`;

export const ModuleContainer = styled.div`
    width: 100%;
    margin-bottom: ${(props) => props.theme.spacing.sm};
`;


export const SidebarItem = styled(NavLink)`
    display: flex;
    justify-content: left;
    align-items: center;
    padding: ${(props) => props.theme.spacing.md};
    margin-bottom: ${(props) => props.theme.spacing.xs};
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    gap: 10px;
    border-radius: 5px;
    position: relative;
    
    &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
    }
    
    &.active {
        background-color: ${(props) => props.theme.colors.primaryLight};
        
        &::after {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background-color: ${(props) => props.theme.colors.warning};
            border-radius: 2px 0 0 2px;
        }
    }
`;

export const ModuleLabel = styled.div`
    color: ${(props) => props.theme.colors.textMuted};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.sm};
    font-weight: 600;
`;