import { useState, useEffect } from "react";
import styled from "styled-components";
import { Checkbox, FormGroup } from "./Forms";

interface Permission {
    c_label: string;
    c_title: string;
    c_option: string;
    c_action: string;
    c_showMenu: boolean;
    c_active: boolean;
    c_type: string;
    permission_id: number;
    componentId: number;
    module_name: string;
}

interface PermissionsSelectorProps {
    permissions: Record<string, Permission[]>;
    selectedPermissions?: number[];
    onChange?: (selectedIds: number[]) => void;
}

const ModuleContainer = styled.div`
    margin-bottom: 24px;
`;

const ModuleHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
`;

const ModuleTitle = styled.h4`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
`;

const PermissionsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 8px;
    margin-left: 26px;
`;

const PermissionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const ActionBadge = styled.span<{ type: string }>`
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
    text-transform: uppercase;
    background-color: ${(props) =>
        props.type === "G" ? "#dbeafe" : "#fef3c7"};
    color: ${(props) => (props.type === "G" ? "#1e40af" : "#92400e")};
`;

const MenuBadge = styled.span<{ showMenu: boolean }>`
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
    text-transform: uppercase;
    background-color: ${(props) => (props.showMenu ? "#dcfce7" : "#f3f4f6")};
    color: ${(props) => (props.showMenu ? "#166534" : "#6b7280")};
`;

export default function PermissionsSelector({
    permissions,
    selectedPermissions = [],
    onChange,
}: PermissionsSelectorProps) {
    const [selected, setSelected] = useState<Set<number>>(
        new Set(selectedPermissions)
    );

    useEffect(() => {
        setSelected(new Set(selectedPermissions));
    }, [selectedPermissions]);

    const handleModuleToggle = (
        modulePermissions: Permission[],
        checked: boolean
    ) => {
        const newSelected = new Set(selected);

        modulePermissions.forEach((permission) => {
            if (checked) {
                newSelected.add(permission.permission_id);
            } else {
                newSelected.delete(permission.permission_id);
            }
        });

        setSelected(newSelected);
        onChange?.(Array.from(newSelected));
    };

    const handlePermissionToggle = (permissionId: number, checked: boolean) => {
        const newSelected = new Set(selected);

        if (checked) {
            newSelected.add(permissionId);
        } else {
            newSelected.delete(permissionId);
        }

        setSelected(newSelected);
        onChange?.(Array.from(newSelected));
    };

    const isModuleFullySelected = (modulePermissions: Permission[]) => {
        return modulePermissions.every((p) => selected.has(p.permission_id));
    };

    const isModulePartiallySelected = (modulePermissions: Permission[]) => {
        return (
            modulePermissions.some((p) => selected.has(p.permission_id)) &&
            !modulePermissions.every((p) => selected.has(p.permission_id))
        );
    };

    if (!permissions) return null;

    return (
        <FormGroup
            title="Permisos"
            description="Seleccione los permisos para este rol"
        >
            {Object.entries(permissions).map(
                ([moduleName, modulePermissions]) => (
                    <ModuleContainer key={moduleName}>
                        <ModuleHeader>
                            <Checkbox
                                checked={isModuleFullySelected(
                                    modulePermissions
                                )}
                                indeterminate={isModulePartiallySelected(
                                    modulePermissions
                                )}
                                onChange={(e) =>
                                    handleModuleToggle(
                                        modulePermissions,
                                        e.target.checked
                                    )
                                }
                            />
                            <ModuleTitle>{moduleName}</ModuleTitle>
                        </ModuleHeader>

                        <PermissionsList>
                            {modulePermissions.map((permission) => (
                                <PermissionItem key={permission.permission_id}>
                                    <Checkbox
                                        checked={selected.has(
                                            permission.permission_id
                                        )}
                                        onChange={(e) =>
                                            handlePermissionToggle(
                                                permission.permission_id,
                                                e.target.checked
                                            )
                                        }
                                        label={
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "6px",
                                                }}
                                            >
                                                {permission.c_title}{" "}
                                                {permission.c_showMenu ? (
                                                    <MenuBadge
                                                        showMenu={
                                                            permission.c_showMenu
                                                        }
                                                    >
                                                        M
                                                    </MenuBadge>
                                                ) : null}
                                                <ActionBadge
                                                    type={permission.c_type}
                                                >
                                                    {permission.c_action}
                                                </ActionBadge>
                                            </div>
                                        }
                                    />
                                </PermissionItem>
                            ))}
                        </PermissionsList>
                    </ModuleContainer>
                )
            )}
        </FormGroup>
    );
}
