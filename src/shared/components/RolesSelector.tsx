import { useState } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../store";
import { setCurrentRole } from "../../features/auth/store/authSlice";

import type { IRoles } from "../../features/permissions/models/Permission";

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
    cursor: ${(props) => props.$isActive ? 'default' : 'pointer'};
    font-size: 12px;
    background: ${(props) => props.$isActive ? props.theme.colors.gray100 : 'transparent'};
    opacity: ${(props) => props.$isActive ? 0.7 : 1};

    &:hover {
        background: ${(props) => props.$isActive ? props.theme.colors.gray100 : props.theme.colors.gray100};
    }
`;

const Arrow = styled.span<{ $isOpen: boolean }>`
    transform: ${(props) =>
        props.$isOpen ? "rotate(180deg)" : "rotate(0deg)"};
    transition: transform 0.2s;
    font-size: 12px;
`;

function RolesSelector() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, currentRole: currentRoleState } = useAppSelector(
        (state) => state.auth
    );

    const currentRole = currentRoleState?.name || "Sin rol";
    const roles = data?.roles;

    const dispatch = useAppDispatch();

    const handleChangeRol = (role: IRoles) => {
        dispatch(setCurrentRole({ role }));
        setIsOpen(false);
    };

    return (
        <DropdownContainer>
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>
                <span>{currentRole}</span>
                <Arrow $isOpen={isOpen}>▼</Arrow>
            </DropdownButton>
            <DropdownMenu $isOpen={isOpen}>
                {roles?.map((role) => {
                    const isActive = currentRoleState?.id === role.id;
                    return (
                        <DropdownItem 
                            key={role.id} 
                            $isActive={isActive}
                            onClick={() => !isActive && handleChangeRol(role)}
                        >
                            {role.name}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </DropdownContainer>
    );
}

export default RolesSelector;
