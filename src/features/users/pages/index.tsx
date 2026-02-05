import { useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Container, useToast } from "../../../shared/components";
import DataTable from "../../../shared/components/Tables/Table";
import { useGetUsersQuery, useDeleteUserMutation } from "../services/UsersApi";
import { useNavigate } from "react-router";
import { IoMdAdd } from "react-icons/io";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

export default function UsersPage() {
    const { data, isLoading } = useGetUsersQuery({});
    const [searchValue, setSearchValue] = useState("");
    const navigator = useNavigate();
    const { showSuccess, showError } = useToast();
    const [deleteUser] = useDeleteUserMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "name",
                header: "NOMBRE",
            },
            {
                accessorKey: "email",
                header: "EMAIL",
            },
            {
                accessorKey: "role",
                header: "ROL",
                cell: ({ row }: { row: any }) => row.original.role?.name || "Sin rol",
            },
            {
                accessorKey: "active",
                header: "ESTADO",
                cell: ({ row }: { row: any }) => (row.original.active ? "Activo" : "Inactivo"),
            },
            {
                id: "actions",
                header: "ACCIONES",
                cell: ({ row }: { row: any }) => {
                    const handleEdit = () => {
                        navigator(`edit/${row.original.id}`);
                    };

                    const handleDelete = async () => {
                        if (confirm(`¿Está seguro de eliminar el usuario "${row.original.name}"?`)) {
                            try {
                                const result = await deleteUser(row.original.id);
                                if (result.error) {
                                    showError(result.error?.data?.message || "Error al eliminar el usuario");
                                } else {
                                    showSuccess("Usuario eliminado exitosamente");
                                }
                            } catch (error) {
                                showError("Error al eliminar el usuario");
                            }
                        }
                    };

                    return (
                        <div style={{ display: "flex", gap: "8px" }}>
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
                                Editar
                            </button>
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
                                Eliminar
                            </button>
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
                        {hasPermission("users-new") ? (
                            <Button variant="primary" rightIcon={<IoMdAdd />} onClick={() => navigator("new")}>
                                Nuevo Usuario
                            </Button>
                        ) : null}
                    </ButtonGroup>
                }
                title="Usuarios del sistema"
                subtitle="Lista de usuarios del sistema"
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
                    searchPlaceholder="Buscar usuarios..."
                />
            </Box>
        </Container>
    );
}
