import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import type { ITenants } from "../../features/permissions/models/Permission";
import { changeGlobalMode, setCurrentTenant } from "../../features/auth/store/authSlice";
import styled from "styled-components";
import {
    useLogoutTenantMutation,
    useSelectTenantMutation,
    useSwitchTenantMutation,
} from "../../features/auth/services/authApi";
import { useNavigate } from "react-router";
import { useGetPermissionsByRoleQuery } from "../../features/permissions/services/permissionApi";
import { FaDatabase } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { TiWorld } from "react-icons/ti";

const TenantSelectorContainer = styled.div<{ $isCollapsed: boolean }>`
    position: relative;
    width: ${(props) => (props.$isCollapsed ? "auto" : "100%")};
    padding: ${(props) => (props.$isCollapsed ? "0" : props.theme.spacing.sm)};
`;

const TenantButton = styled.div<{ $isCollapsed: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$isCollapsed ? "center" : "space-between")};
    width: 100%;
    height: ${(props) => (props.$isCollapsed ? "40px" : "auto")};
    padding: ${(props) => (props.$isCollapsed ? "0" : `${props.theme.spacing.sm} ${props.theme.spacing.md}`)};
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: ${(props) => props.theme.borderRadius.md};
    gap: ${(props) => props.theme.spacing.sm};
    background-color: ${(props) => props.theme.colors.gray100};
    border: none;
    
    &:hover {
        background-color: ${(props) => props.theme.colors.gray200};
    }
`;

const TenantInfo = styled.div<{ $isCollapsed: boolean }>`
    display: flex;
    align-items: center;
    gap: ${(props) => (props.$isCollapsed ? "0" : props.theme.spacing.sm)};
    flex: ${(props) => (props.$isCollapsed ? "0 0 auto" : "100%")};
    justify-content: center;
    width: ${(props) => (props.$isCollapsed ? "100%" : "auto")};
    min-width: 0;
`;

const TenantIcon = styled.div<{ $isCollapsed: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: ${(props) => props.theme.colors.primary};
    font-size: 1.2rem;

    ${(props) => props.$isCollapsed && `
        margin: 0;
        font-size: 1.5rem;
    `}

    svg {
        width: 16px;
        height: 16px;
    }
`;

const TenantText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    flex: 1;
`;

const TenantName = styled.div`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.gray800};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const TenantId = styled.div`
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.normal};
    color: ${(props) => props.theme.colors.gray500};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ArrowButton = styled.button<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: ${(props) => props.theme.colors.gray500};
    padding: 4px;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    transition: all 0.2s ease;
    flex-shrink: 0;
    
    svg {
        width: 16px;
        height: 16px;
        transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
        transition: transform 0.2s ease;
    }
    
    &:hover {
        background-color: ${(props) => props.theme.colors.gray200};
        color: ${(props) => props.theme.colors.gray700};
    }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean; $isCollapsed: boolean }>`
    position: absolute;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.lg};
    z-index: 2000;
    overflow: hidden;
    max-height: ${(props) => (props.$isOpen ? "400px" : "0")};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};

    ${(props) =>
        props.$isCollapsed
            ? `
        top: 0;
        left: calc(100% + 12px);
        width: 260px;
    `
            : `
        top: calc(100% + 4px);
        left: 0;
        right: 0;
    `}
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    cursor: ${(props) => (props.$isActive ? "default" : "pointer")};
    background: ${(props) => (props.$isActive ? props.theme.colors.gray100 : "transparent")};
    transition: background-color 0.15s ease;
    border-left: 3px solid ${(props) => (props.$isActive ? props.theme.colors.primary : "transparent")};
    
    &:hover {
        background-color: ${(props) => (props.$isActive ? props.theme.colors.gray100 : props.theme.colors.gray200)};
    }
    
    &:first-child {
        border-top-left-radius: ${(props) => props.theme.borderRadius.md};
        border-top-right-radius: ${(props) => props.theme.borderRadius.md};
    }
    
    &:last-child {
        border-bottom-left-radius: ${(props) => props.theme.borderRadius.md};
        border-bottom-right-radius: ${(props) => props.theme.borderRadius.md};
    }
`;

const DropdownItemContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${(props) => props.theme.spacing.sm};
`;

const DropdownItemText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
`;

const DropdownItemName = styled.div<{ $isActive: boolean }>`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => (props.$isActive ? props.theme.colors.primary : props.theme.colors.gray800)};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DropdownItemId = styled.div`
    font-size: ${(props) => props.theme.fontSize.xs};
    font-weight: ${(props) => props.theme.fontWeight.normal};
    color: ${(props) => props.theme.colors.gray500};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DatabaseIconSmall = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.primary};
    flex-shrink: 0;
    
    svg {
        width: 14px;
        height: 14px;
    }
`;

function TenantSelector({ isCollapsed = false }: { isCollapsed?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, currentTenant: currentTenantState, currentRole } = useAppSelector((state) => state.auth);

    const [selectTenant] = useSelectTenantMutation();
    const [switchTenant] = useSwitchTenantMutation();
    const [logoutTenant] = useLogoutTenantMutation();

    const { refetch } = useGetPermissionsByRoleQuery(
        {
            roleId: currentRole?.id || 0,
            userId: data?.user?.id || 0,
        },
        {
            skip: !data?.user?.id || !currentRole?.id,
        }
    );

    const currentTenant = currentTenantState?.name || "Global";
    const currentBDName = currentTenantState?.databaseName || "bd_general";

    const tenants = data?.tenants;

    const dispatch = useAppDispatch();
    const navigator = useNavigate();

    const handleChangeTenat = async (tenant: ITenants) => {
        try {
            if (tenant && currentTenant === "Global") {
                await selectTenant({ tenantId: tenant.id }).unwrap();
                dispatch(changeGlobalMode(false));
            } else {
                await switchTenant({ tenantId: tenant.id }).unwrap(); // 0 para modo global
                dispatch(changeGlobalMode(true));
            }
            dispatch(setCurrentTenant({ tenant }));
            refetch();
            navigator("/app", { replace: true });
        } catch (error) {
            console.error("Error changing tenant:", error);
        }
        setIsOpen(false);
    };

    const handleLogoutTenat = async () => {
        try {
            await logoutTenant().unwrap(); // 0 para modo global
            dispatch(changeGlobalMode(true));
            dispatch(setCurrentTenant({ tenant: null }));
            refetch();
            navigator("/app", { replace: true });
        } catch (error) {
            console.error("Error changing tenant:", error);
        }
        setIsOpen(false);
    };

    return (
        <TenantSelectorContainer $isCollapsed={isCollapsed}>
            <TenantButton $isCollapsed={isCollapsed} onClick={() => setIsOpen(!isOpen)}>
                <TenantInfo $isCollapsed={isCollapsed}>
                    <TenantIcon $isCollapsed={isCollapsed}>
                        <TiWorld />
                    </TenantIcon>
                    {!isCollapsed && (
                        <TenantText>
                            <TenantName>{currentTenant}</TenantName>
                            <TenantId>{currentBDName}</TenantId>
                        </TenantText>
                    )}
                </TenantInfo>
                {!isCollapsed && (
                    <ArrowButton $isOpen={isOpen} onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(!isOpen);
                    }}>
                        <IoIosArrowDown />
                    </ArrowButton>
                )}
            </TenantButton>
            <DropdownMenu $isOpen={isOpen} $isCollapsed={isCollapsed}>
                <DropdownItem
                    $isActive={!currentTenantState}
                    onClick={() => currentTenantState && handleLogoutTenat()}
                >
                    <DropdownItemContent>
                        <DropdownItemText>
                            <DropdownItemName $isActive={!currentTenantState}>
                                FixSite General
                            </DropdownItemName>
                            <DropdownItemId>fixsite_global</DropdownItemId>
                        </DropdownItemText>
                        <DatabaseIconSmall>
                            <FaDatabase />
                        </DatabaseIconSmall>
                    </DropdownItemContent>
                </DropdownItem>
                {tenants?.map((t) => {
                    const isActive = currentTenantState?.id === t.id;
                    return (
                        <DropdownItem
                            key={t.id}
                            $isActive={isActive}
                            onClick={() => !isActive && handleChangeTenat(t)}
                        >
                            <DropdownItemContent>
                                <DropdownItemText>
                                    <DropdownItemName $isActive={isActive}>
                                        {t.name}
                                    </DropdownItemName>
                                    <DropdownItemId>{t.databaseName}</DropdownItemId>
                                </DropdownItemText>
                                <DatabaseIconSmall>
                                    <FaDatabase />
                                </DatabaseIconSmall>
                            </DropdownItemContent>
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </TenantSelectorContainer>
    );
}

export default TenantSelector;
