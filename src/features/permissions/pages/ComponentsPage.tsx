import { useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Container, useToast } from "../../../shared/components";
import DataTable from "../../../shared/components/Tables/Table";
import { useGetComponentsQuery, useDeleteComponentMutation } from "../services/componentsApi";
import { useNavigate } from "react-router";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { useHasPermission } from "../../auth/hooks/useHasPermission";

export default function ComponentsPage() {
    const { data, isLoading } = useGetComponentsQuery({});
    const [searchValue, setSearchValue] = useState("");
    const navigator = useNavigate();
    const { showSuccess, showError } = useToast();
    const [deleteComponent] = useDeleteComponentMutation();

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "title",
                header: "TITLE",
            },
            {
                accessorKey: "componentKey",
                header: "KEY",
            },
            {
                accessorKey: "action",
                header: "ACTION",
            },
            {
                accessorKey: "path",
                header: "PATH",
            },
            {
                accessorKey: "showMenu",
                header: "SHOW MENU",
                cell: ({ row }: { row: any }) => (row.original.showMenu ? "Yes" : "No"),
            },
            {
                accessorKey: "active",
                header: "STATUS",
                cell: ({ row }: { row: any }) => (row.original.active ? "Active" : "Inactive"),
            },
            {
                id: "actions",
                header: "ACTIONS",
                cell: ({ row }: { row: any }) => {
                    const handleEdit = () => {
                        navigator(`edit/${row.original.id}`);
                    };

                    const handleDelete = async () => {
                        if (confirm(`¿Está seguro de eliminar el componente "${row.original.title}"?`)) {
                            try {
                                const result = await deleteComponent(row.original.id);
                                if (result.error) {
                                    showError(result.error?.data?.message || "Error al eliminar el componente");
                                } else {
                                    showSuccess("Componente eliminado exitosamente");
                                }
                            } catch (error) {
                                showError("Error al eliminar el componente");
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
                        {hasPermission("component-new") ? (
                            <Button variant="success" rightIcon={<IoMdAdd />} onClick={() => navigator("new")}></Button>
                        ) : null}
                    </ButtonGroup>
                }
                title="Componentes"
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
                    searchPlaceholder="Buscar componentes..."
                />
            </Box>
        </Container>
    );
}
