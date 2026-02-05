import { useMemo, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    Row,
    useAlerts,
} from "../../../shared/components";
import DataTable from "../../../shared/components/Tables/Table";
import { useGetRolesQuery, useDeleteRoleMutation } from "../services/RolesApi";
import { useNavigate } from "react-router";
import { TbArrowAutofitContent } from "react-icons/tb";
import { FaCogs } from "react-icons/fa";
import { MdViewModule } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

export default function RolesPage() {
    const { data, isLoading } = useGetRolesQuery({});
    const [searchValue, setSearchValue] = useState("");
    const navigator = useNavigate();
    const { showSuccess, showError } = useAlerts();
    const [deleteRole] = useDeleteRoleMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "name",
                header: "NAME",
            },
            {
                accessorKey: "description",
                header: "DESCRIPTION",
            },
            {
                accessorKey: "active",
                header: "STATUS",
                cell: ({ row }: { row: any }) =>
                    row.original.active ? "Active" : "Inactive",
            },
            {
                id: "actions",
                header: "ACTIONS",
                cell: ({ row }: { row: any }) => {
                    const handleEdit = () => {
                        navigator(`edit/${row.original.id}`);
                    };

                    const handleDelete = async () => {
                        if (
                            confirm(
                                `¿Está seguro de eliminar el rol "${row.original.name}"?`
                            )
                        ) {
                            try {
                                const result = await deleteRole(
                                    row.original.id
                                );
                                if (result.error) {
                                    showError(
                                        result.error?.data?.message ||
                                            "Error al eliminar el rol"
                                    );
                                } else {
                                    showSuccess("Rol eliminado exitosamente");
                                }
                            } catch (error) {
                                showError("Error al eliminar el rol");
                            }
                        }
                    };

                    return (
                        <div style={{ display: "flex", gap: "8px" }}>
                            {hasPermission("role-edit") &&
                            row.original.name != "Admin" ? (
                                <button
                                    onClick={handleEdit}
                                    style={{
                                        padding: "4px 8px",
                                        backgroundColor: "#3b82f6",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>
                            ) : null}

                            {hasPermission("role-delete") &&
                            row.original.name != "Admin" ? (
                                <button
                                    onClick={handleDelete}
                                    style={{
                                        padding: "4px 8px",
                                        backgroundColor: "#ef4444",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            ) : null}
                        </div>
                    );
                },
            },
        ],
        []
    );
    const { hasPermission } = useHasPermission();

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                headerActions={
                    <ButtonGroup>
                        {hasPermission("permission-index") ? (
                            <Button
                                variant="purple"
                                rightIcon={<FaCogs />}
                                onClick={() => navigator("/app/permission")}
                            >
                                Permisos
                            </Button>
                        ) : null}

                        {hasPermission("module-index") ? (
                            <Button
                                variant="pink"
                                rightIcon={<MdViewModule />}
                                onClick={() => navigator("/app/modules")}
                            >
                                Modulos
                            </Button>
                        ) : null}

                        {hasPermission("component-index") ? (
                            <Button
                                variant="info"
                                rightIcon={<RiListSettingsFill />}
                                onClick={() => navigator("/app/component")}
                            >
                                Componentes
                            </Button>
                        ) : null}
                        {hasPermission("roles-new") ? (
                            <Button
                                variant="primary"
                                rightIcon={<IoMdAdd />}
                                onClick={() => navigator("new")}
                            ></Button>
                        ) : null}
                    </ButtonGroup>
                }
                title="Roles del sistema"
                subtitle="Lista de roles del sistema"
            >
                <DataTable
                    columns={columns}
                    data={data?.data || []}
                    isLoading={isLoading}
                    page={data?.page}
                    total={data?.total}
                    totalPages={data?.totalPages}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    searchPlaceholder="Buscar ordenes..."
                />
            </Box>
        </Container>
    );
}
