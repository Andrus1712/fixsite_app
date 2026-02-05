import { useAppSelector, useAppDispatch } from "../store";
import { setCurrentRole } from "../../features/auth/store/authSlice";
import styled from "styled-components";
import { Select } from "./Forms";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
    padding: ${(props) => props.theme.spacing.md};
`;

const SectionTitle = styled.div`
    font-size: 10px;
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

interface RolesSelectorProps {
    onSelect?: () => void;
}

function RolesSelector({ onSelect }: RolesSelectorProps) {
    const { data, currentRole: currentRoleState } = useAppSelector((state) => state.auth);
    const roles = data?.roles;
    const dispatch = useAppDispatch();

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const roleId = Number(e.target.value);
        const selectedRole = roles?.find(r => r.id === roleId);

        if (selectedRole) {
            dispatch(setCurrentRole({ role: selectedRole }));
            onSelect?.();
        }
    };

    if (!roles || roles.length === 0) return null;

    const roleOptions = roles.map(role => ({
        value: role.id,
        label: role.name
    }));

    return (
        <Container>
            <SectionTitle>Cambiar Rol</SectionTitle>
            <Select
                fullWidth
                options={roleOptions}
                value={currentRoleState?.id || ""}
                onChange={handleRoleChange}
                placeholder="Seleccione un rol"
            />
        </Container>
    );
}

export default RolesSelector;
