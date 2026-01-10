import { use, useMemo, useState } from "react";
import { Box, Button, ButtonGroup, Container, useToast } from "../../../shared/components";
import DataTable from "../../../shared/components/Tables/Table";
import { useGetModulesQuery, useDeleteModuleMutation } from "../services/modulesApi";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";

export default function ModulesPage() {
    const { data, isLoading } = useGetModulesQuery({});
    const [searchValue, setSearchValue] = useState("");
    const navigator = useNavigate();
    const { showSuccess, showError } = useToast();
    const [deleteModule] = useDeleteModuleMutation();

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
                accessorKey: "icon",
                header: "ICON",
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
                        if (confirm(`¿Está seguro de eliminar el módulo "${row.original.name}"?`)) {
                            try {
                                const result = await deleteModule(row.original.id);
                                if (result.error) {
                                    showError(result.error?.data?.message || "Error al eliminar el módulo");
                                } else {
                                    showSuccess("Módulo eliminado exitosamente");
                                }
                            } catch (error) {
                                showError("Error al eliminar el módulo");
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
                        {hasPermission("module-new") ? (
                            <Button variant="success" rightIcon={<IoMdAdd />} onClick={() => navigator("new")}></Button>
                        ) : null}
                    </ButtonGroup>
                }
                title="Módulos"
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
                    searchPlaceholder="Buscar módulos..."
                />
            </Box>
        </Container>
    );
}
