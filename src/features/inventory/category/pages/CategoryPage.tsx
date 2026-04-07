import { useMemo, useState } from "react";
import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from "../services/CategoryApi";
import { Box, Button, Container, DataTable, LoadingSpinner, useToast } from "../../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../../auth/hooks/useHasPermission";

const CategoryPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading } = useGetAllCategoriesQuery({ page, limit, filter: searchValue });
    const navigator = useNavigate();
    const { hasPermission } = useHasPermission();
    const [deleteCategory] = useDeleteCategoryMutation();
    const { showSuccess, showError } = useToast();

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Está seguro de que desea eliminar esta categoría?")) {
            try {
                const result = await deleteCategory(id);
                if (result.error) {
                    showError(result.error?.data?.message || "Error al eliminar la categoría");
                } else {
                    showSuccess("Categoría eliminada exitosamente");
                }
            } catch (error) {
                showError("Error al eliminar la categoría");
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "#",
            },
            {
                accessorKey: "name",
                header: "Nombre",
            },
            {
                accessorKey: "created_at",
                header: "Creado",
            },
            {
                id: "actions",
                header: "Acciones",
                cell: ({ row }: any) => (
                    <div style={{ display: "flex", gap: "8px" }}>
                        {hasPermission("category-edit") && (
                            <Button
                                size="sm"
                                variant="primary"
                                leftIcon={<FaEdit />}
                                onClick={() => navigator(`/app/categories/${row.original.id}`)}
                            >
                                Editar
                            </Button>
                        )}
                        {hasPermission("category-delete") && (
                            <Button
                                size="sm"
                                variant="danger"
                                leftIcon={<FaTrash />}
                                onClick={() => handleDelete(row.original.id)}
                            >
                                Eliminar
                            </Button>
                        )}
                    </div>
                ),
            },
        ],
        [hasPermission, navigator]
    );

    return (
        <Container size="full" center>
            <Box
                $p="lg"
                $shadow
                rounded
                $fullWidth
                title="Categorías"
                bg="white"
                headerActions={
                    <>
                        {hasPermission("category-new") && (
                            <Button
                                leftIcon={<FaPlus />}
                                variant="success"
                                onClick={() => navigator("/app/inventory/categories/new")}
                            >
                                Nuevo
                            </Button>
                        )}
                    </>
                }
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
                        page={data?.pagination.page}
                        total={data?.pagination.total}
                        totalPages={data?.pagination.totalPages}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                    />
                )}
            </Box>
        </Container>
    );
};

export default CategoryPage;
