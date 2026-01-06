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
import { Column, Flex, Row } from "./Layouts";
import { Text } from "./Typography";
import { useGetPermissionsByRoleQuery } from "../../features/permissions/services/permissionApi";
import { FaDatabase } from "react-icons/fa";
import { VscDebugDisconnect } from "react-icons/vsc";
import { IconButton } from "./Buttons";
import { IoIosArrowDown } from "react-icons/io";
import { TiWorld } from "react-icons/ti";

const TenantSelectorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: ${(props) => props.theme.spacing.md};
    gap: 10px;
`;

const DataBaseInfo = styled.div`
    position: relative;
    align-items: center;
    width: 100%;
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.md};
    background-color: #f0fcf3;
    border-radius: 8px;
    border: 1px solid #baf7cf;
    gap: 5px;
    cursor: pointer;
`;

const PointStatus = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #23c45e;
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 110%;
    left: 0;
    right: 0;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    width: 100%;
    
    transition: 
        opacity 0.3s ease-in-out, 
        max-height 0.3s ease-in-out, 
        padding 0.3s ease-in-out;

    opacity: ${(props) => (props.$isOpen ? 1 : 0)}; /* 100% visible o totalmente transparente */
    max-height: ${(props) => (props.$isOpen ? "300px" : "0")}; /* Define una altura máxima para la transición */
    
    overflow: hidden; 
    
    pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    cursor: ${(props) => (props.$isActive ? "default" : "pointer")};
    font-size: 14px;
    background: ${(props) => (props.$isActive ? props.theme.colors.gray100 : "transparent")};
    opacity: ${(props) => (props.$isActive ? 0.7 : 1)};

    &:hover {
        background: ${(props) => (props.$isActive ? props.theme.colors.gray100 : props.theme.colors.gray100)};
        color: ${(props) => (props.$isActive ? null : props.theme.colors.primaryHover)};
    }
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s;
    font-size: 14px;
`;

const DatabaseIcon = styled.div`
    transition: all 0.2s ease;
    cursor: pointer;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        .database-icon {
            display: none;
        }
        .disconnect-icon {
            display: block;
        }
    }
    
    .disconnect-icon {
        display: none;
    }
`;

function TenantSelector() {
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
        <TenantSelectorContainer>
            <Text variant="caption" weight="semibold" uppercase color="gray400">
                Sucursal
            </Text>
            <DataBaseInfo>
                <Flex direction="row" align="center" justify="space-between" gap={"xs"} className="tenantselector">
                    <Row $gap={"md"} $align="center" $justify="space-between">
                        <TiWorld />
                        <Flex direction="column" align="flex-start" justify="flex-start" gap={1}>
                            <Text truncate variant="body2" weight="semibold" color="primary">
                                {currentTenant}
                            </Text>
                            <Text truncate weight="normal" color="gray400">
                                ID: {currentBDName}
                            </Text>
                        </Flex>
                    </Row>
                    <Row $gap={"xs"} $align="center" $justify="space-between">
                        <DatabaseIcon>
                            <IconButton
                                variant="ghost"
                                icon={
                                    <>
                                        <FaDatabase className="database-icon" color="#23c45e" />
                                        <VscDebugDisconnect
                                            className="disconnect-icon"
                                            color="#EF4444"
                                            title="Desconectar"
                                        />
                                    </>
                                }
                            />
                        </DatabaseIcon>
                        <Arrow $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                            <IconButton variant="ghost" icon={<IoIosArrowDown />} />
                        </Arrow>
                    </Row>
                </Flex>
                <DropdownMenu $isOpen={isOpen}>
                    <DropdownItem
                        $isActive={!currentTenantState}
                        onClick={() => currentTenantState && handleLogoutTenat()}
                    >
                        <Flex direction="row" align="center" justify="space-between">
                            <Column gap={"xs"}>
                                <Text weight="semibold" color="primary">
                                    FixSite General
                                </Text>
                                <Text weight="normal" color="muted">
                                    ID: fixsite_global
                                </Text>
                            </Column>
                            <FaDatabase />
                        </Flex>
                    </DropdownItem>
                    {tenants?.map((t) => {
                        const isActive = currentTenantState?.id === t.id;
                        return (
                            <DropdownItem
                                key={t.id}
                                $isActive={isActive}
                                onClick={() => !isActive && handleChangeTenat(t)}
                            >
                                <Flex direction="row" align="center" justify="space-between">
                                    <Column gap={"xs"}>
                                        <Text weight="semibold" color="primary">
                                            {t.name}
                                        </Text>
                                        <Text weight="normal" color="muted">
                                            {t.databaseName}
                                        </Text>
                                    </Column>
                                    <FaDatabase />
                                </Flex>
                            </DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </DataBaseInfo>
        </TenantSelectorContainer>
    );
}

export default TenantSelector;
