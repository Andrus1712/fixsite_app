import styled from "styled-components";

export const HeaderContent = styled.header`
    height: ${(props) => props.theme.layout.headerHeight};
    position: sticky;
    top: 0;
    width: 100%;
    z-index: ${(props) => props.theme.zIndex.sticky};
    transition: background 300ms ease-out;
    background: linear-gradient(135deg, ${(props) => props.theme.colors.primaryDark} 0%, ${(props) => props.theme.colors.primary} 100%);
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 1.5rem;
    justify-content: space-between;
    box-shadow: ${(props) => props.theme.shadows.md};
`;

export const HeaderBrand = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    color: ${(props) => props.theme.colors.white};
    width: ${(props) => props.theme.layout.sidebarWidth};
    padding-left: 1.5rem;
    flex-shrink: 0;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        width: auto;
        padding-left: 0.5rem;
    }
`;

export const ItemUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.33333rem;
    height: 2.33333rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray500};
    border-radius: 50%;
    transition: background 300ms ease-out;
    &:hover {
        background-color: ${(props) => props.theme.colors.gray300};
    }
`;

export const BurgerButton = styled.button`
    display: block;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.gray700};
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
    }

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
    align-items: center;
    position: relative;
`;

export const UserDropdown = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    width: 260px;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    box-shadow: ${(props) => props.theme.shadows.xl};
    z-index: ${(props) => props.theme.zIndex.dropdown};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    transform: ${(props) => (props.$isOpen ? "translateY(0)" : "translateY(-10px)")};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const UserMenuHeader = styled.div`
    padding: ${(props) => props.theme.spacing.lg} ${(props) => props.theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    background: linear-gradient(
        135deg,
        ${(props) => props.theme.colors.primaryLight} 0%,
        ${(props) => props.theme.colors.primary} 100%
    );
`;

export const UserAvatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${(props) => props.theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: ${(props) => props.theme.shadows.sm};
`;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const UserName = styled.span`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserEmail = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.white};
    opacity: 0.8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const MenuDivider = styled.div`
    height: 1px;
    background-color: ${(props) => props.theme.colors.borderLight};
    margin: ${(props) => props.theme.spacing.xs} 0;
`;

export const LogoutItem = styled.div`
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    cursor: pointer;
    color: ${(props) => props.theme.colors.error};
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    transition: background 0.2s;
    margin-bottom: ${(props) => props.theme.spacing.xs};

    &:hover {
        background-color: ${(props) => props.theme.colors.errorLight};
        color: ${(props) => props.theme.colors.errorDark};
    }
`;