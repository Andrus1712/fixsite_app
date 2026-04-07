import { useMemo, useState } from "react";
import { useGetAllArticlesQuery, useDeleteArticleMutation } from "../services/ArticleApi";
import { Box, Button, Container, DataTable, Flex, LoadingSpinner, TableIconButton, useToast } from "../../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useHasPermission } from "../../../auth/hooks/useHasPermission";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";

const ArticlePage = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const { data, isLoading } = useGetAllArticlesQuery({ page, limit, filter: searchValue });
    const navigator = useNavigate();
    const { hasPermission } = useHasPermission();
    const [deleteArticle] = useDeleteArticleMutation();
    const { showSuccess, showError } = useToast();

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Está seguro de que desea eliminar este artículo?")) {
            try {
                const result = await deleteArticle(id);
                if (result.error) {
                    showError(result.error?.data?.message || "Error al eliminar el artículo");
                } else {
                    showSuccess("Artículo eliminado exitosamente");
                }
            } catch (error) {
                showError("Error al eliminar el artículo");
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
                accessorKey: "sku",
                header: "SKU",
            },
            {
                accessorKey: "name",
                header: "Nombre",
            },
            {
                accessorKey: "description",
                header: "Descripción",
            },
            {
                accessorKey: "category_id",
                header: "Categoría",
            },
            {
                accessorKey: "brand_id",
                header: "Marca",
            },
            {
                accessorKey: "unit_measurement",
                header: "Unidad",
            },
            {
                accessorKey: "active",
                header: "Activo",
            },
            {
                id: "actions",
                header: "Acciones",
                cell: ({ row }: any) => (
                    <Flex align="center" gap={"xs"}>
                        {/* <ButtonGroup orientation="horizontal" spacing="md"> */}
                        {hasPermission("article-edit") && (
                            // <Button
                            //     size="sm"
                            //     variant="primary"
                            //     leftIcon={<FaEdit />}
                            //     onClick={() => navigator(`/app/articles/edit/${row.original.id}`)}
                            //     fullWidth
                            // />
                            <TableIconButton size="md" tooltip="Editar" icon={<FaEdit />} onClick={() => navigator(`/app/articles/edit/${row.original.id}`)} />
                        )}
                        {hasPermission("article-delete") && (
                            // <Button
                            //     size="sm"
                            //     variant="danger"
                            //     leftIcon={<FaTrash />}
                            //     onClick={() => handleDelete(row.original.id)}
                            //     fullWidth
                            // />
                            <TableIconButton size="md" tooltip="Eliminar" icon={<FaTrash />} color="danger" onClick={() => handleDelete(row.original.id)} />
                        )}
                        {/* </ButtonGroup> */}
                    </Flex>
                ),
                size: 90
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
                title="Artículos"
                bg="white"
                headerActions={
                    <>
                        {hasPermission("article-new") && (
                            <Button
                                leftIcon={<FaPlus />}
                                variant="success"
                                onClick={() => navigator("/app/articles/new")}
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

export default ArticlePage;
