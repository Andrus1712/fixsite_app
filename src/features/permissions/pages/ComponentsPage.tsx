import { useMemo, useState } from "react";
import {
    Badge,
    Box,
    Button,
    ButtonGroup,
    Container,
    DataTable,
    LoadingSpinner,
    Text,
    useToast,
} from "../../../shared/components";
import { useGetComponentsQuery, useDeleteComponentMutation } from "../services/componentsApi";
import { useNavigate } from "react-router";
import { IoMdAdd, IoMdArrowRoundBack } from "react-icons/io";
import { useHasPermission } from "../../auth/hooks/useHasPermission";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ComponentsPage() {
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [limit, setLimit] = useState(10);
    const navigator = useNavigate();
    const { showSuccess, showError } = useToast();
    const [deleteComponent] = useDeleteComponentMutation();
    const { data, isLoading } = useGetComponentsQuery({
        page,
        limit,
        filter: searchValue,
    });
    console.log(data);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "title",
                header: "TITLE PAGE",
            },
            {
                accessorKey: "label",
                header: "LABEL MENU",
            },
            {
                accessorKey: "componentKey",
                header: "KEY",
            },
            {
                accessorKey: "option",
                header: "OPTION",
            },
            {
                accessorKey: "action",
                header: "ACTION",
            },
            {
                accessorKey: "path",
                header: "PATH",
                cell: ({ row }: { row: any }) => {
                    return (
                        <Badge variant="default">
                            <Text variant="code-sm">{row.original.path}</Text>
                        </Badge>
                    );
                },
            },
            {
                accessorKey: "showMenu",
                header: "SHOW MENU",
                cell: ({ row }: { row: any }) =>
                    row.original.showMenu ? <FaCheck color="green" /> : <FaTimes color="red" />,
            },
            {
                accessorKey: "type",
                header: "TYPE",
                cell: ({ row }: { row: any }) => {
                    if (row.original.type == "G") {
                        return <Text variant="label-sm" truncate>Global</Text>;
                    } else {
                        return <Text variant="label-sm" truncate>Tenant</Text>;
                    }
                },
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
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <DataTable
                        data={data?.data || []}
                        columns={columns}
                        initialPageSize={limit ?? 25}
                        pageSizeOptions={[10, 25, 50, 100]}
                        serverSide={true}
                        page={data?.page}
                        total={data?.total}
                        totalPages={data?.totalPages}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                        maxHeight={500}
                    />
                )}
            </Box>
        </Container>
    );
}
