import { useMemo, useState } from "react";
import { useGetAllBrandsQuery, useDeleteBrandMutation } from "../services/BrandApi";
import { Box, Button, Container, DataTable, LoadingSpinner, useToast } from "../../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../../auth/hooks/useHasPermission";

const BrandPage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading } = useGetAllBrandsQuery({ page, limit, filter: searchValue });
    const navigator = useNavigate();
    const { hasPermission } = useHasPermission();
    const [deleteBrand] = useDeleteBrandMutation();
    const { showSuccess, showError } = useToast();

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Está seguro de que desea eliminar esta marca?")) {
            try {
                const result = await deleteBrand(id);
                if (result.error) {
                    showError(result.error?.data?.message || "Error al eliminar la marca");
                } else {
                    showSuccess("Marca eliminada exitosamente");
                }
            } catch (error) {
                showError("Error al eliminar la marca");
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
                        {hasPermission("brand-edit") && (
                            <Button
                                size="sm"
                                variant="primary"
                                leftIcon={<FaEdit />}
                                onClick={() => navigator(`/app/inventory/brands/${row.original.id}`)}
                            >
                                Editar
                            </Button>
                        )}
                        {hasPermission("brand-delete") && (
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
                title="Marcas"
                bg="white"
                headerActions={
                    <>
                        {hasPermission("brand-new") && (
                            <Button
                                leftIcon={<FaPlus />}
                                variant="success"
                                onClick={() => navigator("/app/inventory/brands/new")}
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
                        maxHeight={500}
                    />
                )}
            </Box>
        </Container>
    );
};

export default BrandPage;
