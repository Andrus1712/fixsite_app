import { Link } from "react-router";
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
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.sm};
`;

export const ModuleContainer = styled.div`
    width: 100%;
`;


export const SidebarItem = styled(Link)`
    display: flex;
    justify-content: left;
    align-items: center;
    padding: ${(props) => props.theme.spacing.md};
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
    width: 100%;
    gap: 10px;
    border-radius: 10px;
    &:hover {
        background-color: ${(props) => props.theme.colors.primaryLight};
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