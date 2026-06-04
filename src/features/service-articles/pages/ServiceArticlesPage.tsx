import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

import {
    AlertModal,
    Badge,
    Box,
    Button,
    Container,
    DataTable,
    Flex,
    LoadingSpinner,
    Modal,
    TableIconButton,
    Text,
    useToast,
} from "@/shared/components";
import { useHasPermission } from "@/features/auth/hooks/useHasPermission";
import { useGetServiceByIdQuery } from "@/features/services-catalog/services/ServicesApi";
import {
    useGetServiceArticlesQuery,
    useDeleteServiceArticleMutation,
    type ServiceArticle,
} from "../services/ServiceArticleApi";
import ServiceArticleForm from "../components/ServiceArticleForm";

const DEBOUNCE_MS = 300;

const ServiceArticlesPage = () => {
    const [searchParams] = useSearchParams();
    const serviceId = Number(searchParams.get("service_id")) || 0;

    const { hasPermission } = useHasPermission();
    const { showSuccess, showError } = useToast();

    // Pagination & search state
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<ServiceArticle | null>(null);

    // Delete state
    const [pendingDeleteArticle, setPendingDeleteArticle] = useState<ServiceArticle | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch service info to check requires_articles
    const {
        data: service,
        isLoading: isLoadingService,
    } = useGetServiceByIdQuery(serviceId, { skip: serviceId === 0 });

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchValue);
            setPage(1);
        }, DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [searchValue]);

    // Fetch service articles
    const {
        data: articlesData,
        isLoading: isLoadingArticles,
    } = useGetServiceArticlesQuery(
        { service_id: serviceId, page, limit, filter: debouncedSearch || undefined },
        { skip: serviceId === 0 || service?.requires_articles === false }
    );

    const [deleteServiceArticle] = useDeleteServiceArticleMutation();

    // Handlers
    const openCreate = useCallback(() => {
        setEditingArticle(null);
        setIsModalOpen(true);
    }, []);

    const openEdit = useCallback((article: ServiceArticle) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingArticle(null);
    }, []);

    const handleFormSuccess = useCallback(() => {
        closeModal();
    }, [closeModal]);

    const handleDeleteClick = useCallback((article: ServiceArticle) => {
        setPendingDeleteArticle(article);
    }, []);

    const handleDeleteConfirm = async () => {
        if (!pendingDeleteArticle || isDeleting) return;

        const articleToDelete = pendingDeleteArticle;
        setIsDeleting(true);

        try {
            const result = await deleteServiceArticle(articleToDelete.id);
            if ("error" in result && result.error) {
                const errorData = result.error as { data?: { message?: string } };
                showError(
                    errorData?.data?.message ||
                    "No se pudo completar la eliminación. Intente nuevamente."
                );
            } else {
                showSuccess("Artículo eliminado exitosamente");
            }
        } catch {
            showError("No se pudo completar la eliminación. Intente nuevamente.");
        } finally {
            setIsDeleting(false);
            setPendingDeleteArticle(null);
        }
    };

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    // Columns definition
    const columns: ColumnDef<ServiceArticle>[] = useMemo(
        () => [
            {
                accessorKey: "article_sku",
                header: "SKU",
                size: 120,
            },
            {
                accessorKey: "article_name",
                header: "Artículo",
            },
            {
                accessorKey: "default_quantity",
                header: "Cantidad por defecto",
                size: 160,
            },
            {
                accessorKey: "unit_measurement",
                header: "Unidad de medida",
                size: 150,
            },
            {
                accessorKey: "is_active",
                header: "Estado",
                size: 100,
                cell: ({ row }) => (
                    <Badge variant={row.original.is_active ? "success" : "danger"}>
                        {row.original.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                ),
            },
            {
                id: "actions",
                header: "Acciones",
                size: 80,
                cell: ({ row }) => (
                    <TableIconButton.Group>
                        {hasPermission("service-articles:update") && (
                            <TableIconButton
                                icon={<FaEdit />}
                                color="primary"
                                tooltip="Editar"
                                onClick={() => openEdit(row.original)}
                            />
                        )}
                        {hasPermission("service-articles:delete") && (
                            <TableIconButton
                                icon={<FaTrash />}
                                color="danger"
                                tooltip="Eliminar"
                                onClick={() => handleDeleteClick(row.original)}
                            />
                        )}
                    </TableIconButton.Group>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hasPermission]
    );

    // Loading state while fetching service info
    if (isLoadingService) {
        return <LoadingSpinner />;
    }

    // Service not found or invalid service_id
    if (serviceId === 0 || !service) {
        return (
            <Container size="full" center>
                <Box p="lg" bg="white" rounded shadow $fullWidth>
                    <Text variant="body1" color="muted">
                        No se encontró el servicio especificado.
                    </Text>
                </Box>
            </Container>
        );
    }

    // Service does not require articles
    if (!service.requires_articles) {
        return (
            <Container size="full" center>
                <Box p="lg" bg="white" rounded shadow $fullWidth>
                    <Text variant="body1" color="muted">
                        Este servicio no requiere artículos de recambio
                    </Text>
                </Box>
            </Container>
        );
    }

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                $fullWidth
                title="Artículos de servicio"
                subtitle={`Configuración de artículos para: ${service.description}`}
                headerActions={
                    hasPermission("service-articles:create") ? (
                        <Button variant="primary" leftIcon={<FaPlus />} onClick={openCreate}>
                            Nuevo artículo
                        </Button>
                    ) : undefined
                }
            >
                {isLoadingArticles ? (
                    <LoadingSpinner />
                ) : articlesData?.pagination.total === 0 && !debouncedSearch ? (
                    <Flex justify="center" align="center">
                        <Text variant="body1" color="muted">
                            No hay artículos configurados para este servicio
                        </Text>
                    </Flex>
                ) : (
                    <DataTable
                        columns={columns}
                        data={articlesData?.data ?? []}
                        serverSide
                        page={articlesData?.pagination.page}
                        total={articlesData?.pagination.total}
                        totalPages={articlesData?.pagination.totalPages}
                        initialPageSize={limit}
                        pageSizeOptions={[10, 25, 50, 100]}
                        searchValue={searchValue}
                        onSearchChange={handleSearchChange}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                    />
                )}
            </Box>

            {/* Create / Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingArticle ? "Editar artículo" : "Nuevo artículo"}
                size="md"
            >
                <ServiceArticleForm
                    serviceId={serviceId}
                    editingArticle={editingArticle}
                    onSuccess={handleFormSuccess}
                    onCancel={closeModal}
                />
            </Modal>

            {/* Delete Confirmation */}
            <AlertModal
                isOpen={pendingDeleteArticle !== null}
                onClose={() => setPendingDeleteArticle(null)}
                title="Confirmar eliminación"
                message={`¿Está seguro de eliminar el artículo "${pendingDeleteArticle?.article_name ?? ""}"? Esta acción no se puede deshacer.`}
                type="warning"
                animation="scale"
                buttons={[
                    {
                        label: "Cancelar",
                        variant: "outline",
                        onClick: () => setPendingDeleteArticle(null),
                    },
                    {
                        label: "Eliminar",
                        variant: "danger",
                        icon: <FaTrash />,
                        onClick: handleDeleteConfirm,
                    },
                ]}
            />
        </Container>
    );
};

export default ServiceArticlesPage;
