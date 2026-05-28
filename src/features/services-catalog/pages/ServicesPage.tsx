import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Container,
    DataTable,
    Flex,
    Input,
    Modal,
    Switch,
    TableIconButton,
    useAlert,
    useToast,
    Badge,
    FormGroup,
} from "../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import type { ColumnDef } from "@tanstack/react-table";
import {
    useGetAllServicesPaginatedQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
    type Service,
} from "../services/ServicesApi";
import { ServiceSchema, type ServiceFormData, serviceDefaultValues } from "../schemas";

const ServicesPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const { data, isLoading } = useGetAllServicesPaginatedQuery({ page, limit, filter: searchValue });
    const [createService] = useCreateServiceMutation();
    const [updateService] = useUpdateServiceMutation();
    const [deleteService] = useDeleteServiceMutation();

    const { showSuccess, showError } = useToast();
    const { showWarning, closeAlert } = useAlert();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: serviceDefaultValues,
    });

    const activoValue = watch("is_active");

    const openCreate = () => {
        setEditingService(null);
        reset(serviceDefaultValues);
        setIsModalOpen(true);
    };

    const openEdit = (service: Service) => {
        setEditingService(service);
        reset({
            code: service.code,
            description: service.description,
            base_price: service.base_price,
            is_active: service.is_active,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
        reset(serviceDefaultValues);
    };

    const onSubmit = async (formData: ServiceFormData) => {
        try {
            if (editingService) {
                const result = await updateService({ id: editingService.id, data: formData });
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al actualizar el servicio.");
                } else {
                    showSuccess("Servicio actualizado exitosamente.");
                    closeModal();
                }
            } else {
                const result = await createService(formData);
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al crear el servicio.");
                } else {
                    showSuccess("Servicio creado exitosamente.");
                    closeModal();
                }
            }
        } catch {
            showError("Error inesperado al procesar el servicio.");
        }
    };

    const handleDelete = (service: Service) => {
        showWarning(
            "Confirmar eliminación",
            `¿Está seguro de eliminar el servicio "${service.description}"? Esta acción no se puede deshacer.`,
            [
                { label: "Cancelar", variant: "outline", onClick: closeAlert },
                {
                    label: "Eliminar",
                    variant: "danger",
                    onClick: async () => {
                        closeAlert();
                        try {
                            const result = await deleteService(service.id);
                            if (result.error) {
                                showError((result.error as any)?.data?.message || "Error al eliminar el servicio.");
                            } else {
                                showSuccess("Servicio eliminado exitosamente.");
                            }
                        } catch {
                            showError("Error inesperado al eliminar el servicio.");
                        }
                    },
                },
            ]
        );
    };

    const columns: ColumnDef<Service>[] = useMemo(
        () => [
            {
                accessorKey: "code",
                header: "Código",
                size: 120,
            },
            {
                accessorKey: "description",
                header: "Descripción",
            },
            {
                accessorKey: "base_price",
                header: "Precio Base",
                size: 130,
                cell: ({ row }) =>
                    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                        row.original.base_price
                    ),
            },
            {
                accessorKey: "is_active",
                header: "Activo",
                size: 90,
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
                        <TableIconButton
                            icon={<FaEdit />}
                            color="primary"
                            tooltip="Editar"
                            onClick={() => openEdit(row.original)}
                        />
                        <TableIconButton
                            icon={<FaTrash />}
                            color="danger"
                            tooltip="Eliminar"
                            onClick={() => handleDelete(row.original)}
                        />
                    </TableIconButton.Group>
                ),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                $fullWidth
                title="Servicios"
                subtitle="Catálogo de servicios disponibles"
                headerActions={
                    <Button variant="primary" leftIcon={<FaPlus />} onClick={openCreate}>
                        Nuevo servicio
                    </Button>
                }
            >
                <DataTable
                    columns={columns}
                    data={data?.data ?? []}
                    serverSide
                    page={data?.page}
                    total={data?.total}
                    totalPages={data?.totalPages}
                    initialPageSize={limit}
                    pageSizeOptions={[10, 25, 50, 100]}
                    searchValue={searchValue}
                    onSearchChange={(val) => { setSearchValue(val); setPage(1); }}
                    onPageChange={setPage}
                    onPageSizeChange={setLimit}
                />
            </Box>

            {/* Modal crear / editar */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingService ? "Editar servicio" : "Nuevo servicio"}
                size="md"
                footer={
                    <Flex justify="flex-end" gap="sm">
                        <Button variant="outline" onClick={closeModal}>
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            loading={isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {editingService ? "Actualizar" : "Crear"}
                        </Button>
                    </Flex>
                }
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup direction="vertical" gap="md">
                        <Input
                            label="Código"
                            placeholder="Ej: SRV-001"
                            fullWidth
                            error={errors.code?.message}
                            {...register("code")}
                        />
                        <Input
                            label="Descripción"
                            placeholder="Descripción del servicio"
                            fullWidth
                            error={errors.description?.message}
                            {...register("description")}
                        />
                        <Input
                            label="Precio base"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            fullWidth
                            error={errors.base_price?.message}
                            {...register("base_price", { valueAsNumber: true })}
                        />
                        <Switch
                            label="Activo"
                            checked={activoValue}
                            onChange={(e) => setValue("is_active", e.target.checked)}
                        />
                    </FormGroup>
                </form>
            </Modal>
        </Container>
    );
};

export default ServicesPage;
