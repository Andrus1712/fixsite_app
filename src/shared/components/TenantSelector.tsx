import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import type { ITenants } from "../../features/permissions/models/Permission";
import {
    changeGlobalMode,
    setCurrentTenant,
} from "../../features/auth/store/authSlice";
import styled from "styled-components";
import {
    useLogoutTenantMutation,
    useSelectTenantMutation,
    useSwitchTenantMutation,
} from "../../features/auth/services/authApi";
import { useNavigate } from "react-router";

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.text};
`;

const DropdownButton = styled.button`
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    border-radius: 6px;
    padding: 8px 12px;
    min-width: 150px;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        border-color: ${(props) => props.theme.colors.primary};
    }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.gray200};
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div<{ $isActive: boolean }>`
    padding: 8px 12px;
    cursor: ${(props) => (props.$isActive ? "default" : "pointer")};
    font-size: 12px;
    background: ${(props) =>
        props.$isActive ? props.theme.colors.gray100 : "transparent"};
    opacity: ${(props) => (props.$isActive ? 0.7 : 1)};

    &:hover {
        background: ${(props) =>
            props.$isActive
                ? props.theme.colors.gray100
                : props.theme.colors.gray100};
    }
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
    transform: ${(props) =>
        props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.2s;
    font-size: 12px;
`;

function TenantSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, currentTenant: currentTenantState } = useAppSelector(
        (state) => state.auth
    );

    const [selectTenant] = useSelectTenantMutation();
    const [switchTenant] = useSwitchTenantMutation();
    const [logoutTenant] = useLogoutTenantMutation();

    const currentTenant = currentTenantState?.name || "Global";
    console.log(currentTenant);

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
            navigator("/app", { replace: true });
        } catch (error) {
            console.error("Error changing tenant:", error);
        }
        setIsOpen(false);
    };

    return (
        <DropdownContainer>
            Sucursal Activa
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                <span>{currentTenant}</span>
                <Arrow $isOpen={isOpen}>▼</Arrow>
            </DropdownButton>
            <DropdownMenu $isOpen={isOpen}>
                <DropdownItem
                    $isActive={!currentTenantState}
                    onClick={() => currentTenantState && handleLogoutTenat()}
                >
                    Global
                </DropdownItem>
                {tenants?.map((t) => {
                    const isActive = currentTenantState?.id === t.id;
                    return (
                        <DropdownItem
                            key={t.id}
                            $isActive={isActive}
                            onClick={() => !isActive && handleChangeTenat(t)}
                        >
                            {t.name}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </DropdownContainer>
    );
}

export default TenantSelector;
