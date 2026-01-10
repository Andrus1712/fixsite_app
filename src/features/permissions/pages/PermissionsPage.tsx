import { useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Container, useToast } from "../../../shared/components";
import DataTable from "../../../shared/components/Tables/Table";
import { useGetPermissionsAllQuery, useDeletePermissionMutation } from "../services/permissionApi";
import { useNavigate } from "react-router";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

export default function PermissionsPage() {
    const { data, isLoading } = useGetPermissionsAllQuery({});
    const [searchValue, setSearchValue] = useState("");
    const navigator = useNavigate();
    const { showSuccess, showError } = useToast();
    const [deletePermission] = useDeletePermissionMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "key",
                header: "KEY",
            },
            {
                accessorKey: "assignedBy",
                header: "ASSIGNED BY",
            },
            {
                accessorKey: "userId",
                header: "USER ID",
            },
            {
                accessorKey: "component.title",
                header: "COMPONENT",
                cell: ({ row }: { row: any }) => row.original.component?.title || "N/A",
            },
            {
                accessorKey: "component.action",
                header: "ACTION",
                cell: ({ row }: { row: any }) => row.original.component?.action || "N/A",
            },
            {
                accessorKey: "createdAt",
                header: "CREATED AT",
                cell: ({ row }: { row: any }) => new Date(row.original.createdAt).toLocaleDateString(),
            },
            {
                id: "actions",
                header: "ACTIONS",
                cell: ({ row }: { row: any }) => {
                    const handleEdit = () => {
                        navigator(`edit/${row.original.id}`);
                    };

                    const handleDelete = async () => {
                        if (confirm(`¿Está seguro de eliminar este permiso?`)) {
                            try {
                                const result = await deletePermission(row.original.id);
                                if (result.error) {
                                    showError(result.error?.data?.message || "Error al eliminar el permiso");
                                } else {
                                    showSuccess("Permiso eliminado exitosamente");
                                }
                            } catch (error) {
                                showError("Error al eliminar el permiso");
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
                                Edit
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
                                Delete
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
                        <Button variant="secondary" onClick={() => navigator(-1)} leftIcon={<IoMdArrowRoundBack />}>
                            Regresar
                        </Button>
                        {hasPermission("permission-new") ? (
                            <Button variant="success" rightIcon={<IoMdAdd />} onClick={() => navigator("new")}></Button>
                        ) : null}
                    </ButtonGroup>
                }
                title="Permisos"
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
                    searchPlaceholder="Buscar permisos..."
                />
            </Box>
        </Container>
    );
}
