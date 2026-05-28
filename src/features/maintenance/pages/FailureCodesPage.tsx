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
    SearchableSelect,
    Label,
    TextArea,
    Select,
} from "../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import type { ColumnDef } from "@tanstack/react-table";
import {
    useGetFailureCodesPaginatedQuery,
    useCreateFailureCodeMutation,
    useUpdateFailureCodeMutation,
    useDeleteFailureCodeMutation,
    useGetFailureCategoriesQuery,
    useGetFailureSeveritiesQuery,
    useGetDeviceTypesQuery,
    type FailureCode,
} from "../services/FailureCodesApi";
import { FailureCodeSchema, type FailureCodeFormData, failureCodeDefaultValues } from "../schemas";

const FailureCodesPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const [filterCategoryId, setFilterCategoryId] = useState("");
    const [filterDeviceTypeId, setFilterDeviceTypeId] = useState("");
    const [filterSeverityId, setFilterSeverityId] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<FailureCode | null>(null);

    const { data, isLoading } = useGetFailureCodesPaginatedQuery({
        page,
        limit,
        filter: searchValue,
        categoryId: filterCategoryId,
        deviceTypeId: filterDeviceTypeId,
        severityId: filterSeverityId,
    });

    const { data: categories = [] } = useGetFailureCategoriesQuery();
    const { data: severities = [] } = useGetFailureSeveritiesQuery();
    const { data: deviceTypes = [] } = useGetDeviceTypesQuery();

    const [createFailureCode] = useCreateFailureCodeMutation();
    const [updateFailureCode] = useUpdateFailureCodeMutation();
    const [deleteFailureCode] = useDeleteFailureCodeMutation();

    const { showSuccess, showError } = useToast();
    const { showWarning, closeAlert } = useAlert();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FailureCodeFormData>({
        resolver: zodResolver(FailureCodeSchema),
        defaultValues: failureCodeDefaultValues,
    });

    const isActiveValue = watch("isActive");
    const categoryIdValue = watch("categoryId");
    const deviceTypeIdValue = watch("deviceTypeId");
    const severityIdValue = watch("severityId");

    const openCreate = () => {
        setEditingCode(null);
        reset(failureCodeDefaultValues);
        setIsModalOpen(true);
    };

    const openEdit = (code: FailureCode) => {
        setEditingCode(code);
        reset({
            code: code.code,
            name: code.name,
            description: code.description ?? "",
            estimatedRepairMinutes: code.estimatedRepairMinutes,
            isActive: code.isActive,
            categoryId: code.category.id,
            deviceTypeId: code.deviceType.id,
            severityId: code.severity.id,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCode(null);
        reset(failureCodeDefaultValues);
    };

    const onSubmit = async (formData: FailureCodeFormData) => {
        const dto = {
            code: formData.code,
            name: formData.name,
            description: formData.description,
            estimatedRepairMinutes: formData.estimatedRepairMinutes,
            isActive: formData.isActive,
            category: { id: formData.categoryId },
            deviceType: { id: formData.deviceTypeId },
            severity: { id: formData.severityId },
        };

        try {
            if (editingCode) {
                const result = await updateFailureCode({ id: editingCode.id, data: dto });
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al actualizar el código de falla.");
                } else {
                    showSuccess("Código de falla actualizado exitosamente.");
                    closeModal();
                }
            } else {
                const result = await createFailureCode(dto);
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al crear el código de falla.");
                } else {
                    showSuccess("Código de falla creado exitosamente.");
                    closeModal();
                }
            }
        } catch {
            showError("Error inesperado al procesar el código de falla.");
        }
    };

    const handleDelete = (code: FailureCode) => {
        showWarning(
            "Confirmar eliminación",
            `¿Está seguro de eliminar el código "${code.code} - ${code.name}"? Esta acción no se puede deshacer.`,
            [
                { label: "Cancelar", variant: "outline", onClick: closeAlert },
                {
                    label: "Eliminar",
                    variant: "danger",
                    onClick: async () => {
                        closeAlert();
                        try {
                            const result = await deleteFailureCode(code.id);
                            if (result.error) {
                                showError((result.error as any)?.data?.message || "Error al eliminar el código de falla.");
                            } else {
                                showSuccess("Código de falla eliminado exitosamente.");
                            }
                        } catch {
                            showError("Error inesperado al eliminar el código de falla.");
                        }
                    },
                },
            ]
        );
    };

    const columns: ColumnDef<FailureCode>[] = useMemo(
        () => [
            { accessorKey: "code", header: "Código", size: 110 },
            { accessorKey: "name", header: "Nombre" },
            {
                id: "category",
                header: "Categoría",
                size: 140,
                cell: ({ row }) => row.original.category?.name ?? "—",
            },
            {
                id: "deviceType",
                header: "Tipo Dispositivo",
                size: 150,
                cell: ({ row }) => row.original.deviceType?.name ?? "—",
            },
            {
                id: "severity",
                header: "Severidad",
                size: 120,
                cell: ({ row }) => row.original.severity?.name ?? "—",
            },
            {
                accessorKey: "estimatedRepairMinutes",
                header: "Tiempo Est. (min)",
                size: 140,
            },
            {
                accessorKey: "isActive",
                header: "Activo",
                size: 90,
                cell: ({ row }) => (
                    <Badge variant={row.original.isActive ? "success" : "danger"}>
                        {row.original.isActive ? "Activo" : "Inactivo"}
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

    const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));
    const deviceTypeOptions = deviceTypes.map((d) => ({ value: d.id, label: d.name }));
    const severityOptions = severities.map((s) => ({ value: s.id, label: `${s.name} (P${s.priority})` }));

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                $fullWidth
                title="Códigos de Falla"
                subtitle="Catálogo de códigos de falla para mantenimiento"
                headerActions={
                    <Button variant="primary" leftIcon={<FaPlus />} onClick={openCreate}>
                        Nuevo código
                    </Button>
                }
            >
                {/* Filtros */}
                <Flex gap="sm" wrap="wrap" style={{ marginBottom: "1rem" }}>
                    <div style={{ minWidth: 180 }}>
                        <Select
                            placeholder="Todas las categorías"
                            options={[{ value: "", label: "Todas las categorías" }, ...categoryOptions]}
                            value={filterCategoryId}
                            onChange={(e) => { setFilterCategoryId(e.target.value); setPage(1); }}
                        />
                    </div>
                    <div style={{ minWidth: 180 }}>
                        <Select
                            placeholder="Todos los tipos"
                            options={[{ value: "", label: "Todos los tipos" }, ...deviceTypeOptions]}
                            value={filterDeviceTypeId}
                            onChange={(e) => { setFilterDeviceTypeId(e.target.value); setPage(1); }}
                        />
                    </div>
                    <div style={{ minWidth: 180 }}>
                        <Select
                            placeholder="Todas las severidades"
                            options={[{ value: "", label: "Todas las severidades" }, ...severityOptions]}
                            value={filterSeverityId}
                            onChange={(e) => { setFilterSeverityId(e.target.value); setPage(1); }}
                        />
                    </div>
                </Flex>

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
                title={editingCode ? "Editar código de falla" : "Nuevo código de falla"}
                size="lg"
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
                            {editingCode ? "Actualizar" : "Crear"}
                        </Button>
                    </Flex>
                }
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup direction="vertical" gap="md">
                        <Flex gap="md">
                            <Input
                                label="Código"
                                placeholder="Ej: FC-001"
                                fullWidth
                                error={errors.code?.message}
                                {...register("code")}
                            />
                            <Input
                                label="Nombre"
                                placeholder="Nombre del código de falla"
                                fullWidth
                                error={errors.name?.message}
                                {...register("name")}
                            />
                        </Flex>
                        <TextArea
                            label="Descripción (opcional)"
                            placeholder="Descripción detallada de la falla"
                            rows={3}
                            fullWidth
                            error={errors.description?.message}
                            {...register("description")}
                        />
                        <Input
                            label="Tiempo estimado de reparación (minutos)"
                            type="number"
                            placeholder="0"
                            fullWidth
                            error={errors.estimatedRepairMinutes?.message}
                            {...register("estimatedRepairMinutes", { valueAsNumber: true })}
                        />
                        <div>
                            <Label required>Categoría</Label>
                            <SearchableSelect
                                fullWidth
                                options={categoryOptions}
                                value={categoryIdValue > 0 ? categoryIdValue : null}
                                onChange={(val) => setValue("categoryId", Number(val), { shouldValidate: true })}
                                placeholder="Seleccione una categoría"
                                error={errors.categoryId?.message}
                            />
                        </div>
                        <div>
                            <Label required>Tipo de dispositivo</Label>
                            <SearchableSelect
                                fullWidth
                                options={deviceTypeOptions}
                                value={deviceTypeIdValue > 0 ? deviceTypeIdValue : null}
                                onChange={(val) => setValue("deviceTypeId", Number(val), { shouldValidate: true })}
                                placeholder="Seleccione un tipo de dispositivo"
                                error={errors.deviceTypeId?.message}
                            />
                        </div>
                        <div>
                            <Label required>Severidad</Label>
                            <SearchableSelect
                                fullWidth
                                options={severityOptions}
                                value={severityIdValue > 0 ? severityIdValue : null}
                                onChange={(val) => setValue("severityId", Number(val), { shouldValidate: true })}
                                placeholder="Seleccione una severidad"
                                error={errors.severityId?.message}
                            />
                        </div>
                        <Switch
                            label="Activo"
                            checked={isActiveValue}
                            onChange={(e) => setValue("isActive", e.target.checked)}
                        />
                    </FormGroup>
                </form>
            </Modal>
        </Container>
    );
};

export default FailureCodesPage;
