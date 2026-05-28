import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Container,
    DataTable,
    Flex,
    TableIconButton,
    useAlert,
    useToast,
    Badge,
    SearchableSelect,
} from "../../../shared/components";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import type { ColumnDef } from "@tanstack/react-table";
import {
    useGetServiceOrderTypesPaginatedQuery,
    useDeleteServiceOrderTypeMutation,
    useGetOrderTypesListQuery,
    type ServiceOrderType,
} from "../services/ServiceOrderTypesApi";
import { useGetAllServicesQuery } from "../services/ServicesApi";
import { useNavigate } from "react-router";

const ServiceOrderTypesPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filterServiceId, setFilterServiceId] = useState("");
    const [filterOrderTypeId, setFilterOrderTypeId] = useState("");

    const { data } = useGetServiceOrderTypesPaginatedQuery({
        page,
        limit,
        serviceId: filterServiceId,
        orderTypeId: filterOrderTypeId,
    });

    const { data: services = [] } = useGetAllServicesQuery();
    const { data: orderTypes = [] } = useGetOrderTypesListQuery();

    const [deleteServiceOrderType] = useDeleteServiceOrderTypeMutation();

    const { showSuccess, showError } = useToast();
    const { showWarning, closeAlert } = useAlert();

    const handleDelete = (record: ServiceOrderType) => {
        showWarning(
            "Confirmar eliminación",
            `¿Está seguro de eliminar la vinculación "${record.service.description} — ${record.orderType.descripcion}"? Esta acción no se puede deshacer.`,
            [
                { label: "Cancelar", variant: "outline", onClick: closeAlert },
                {
                    label: "Eliminar",
                    variant: "danger",
                    onClick: async () => {
                        closeAlert();
                        try {
                            const result = await deleteServiceOrderType(record.id);
                            if (result.error) {
                                showError((result.error as any)?.data?.message || "Error al eliminar el registro.");
                            } else {
                                showSuccess("Registro eliminado exitosamente.");
                            }
                        } catch {
                            showError("Error inesperado al eliminar el registro.");
                        }
                    },
                },
            ]
        );
    };

    const columns: ColumnDef<ServiceOrderType>[] = useMemo(
        () => [
            {
                id: "service",
                header: "Servicio",
                cell: ({ row }) => `[${row.original.service.code}] ${row.original.service.description}`,
            },
            {
                id: "orderType",
                header: "Tipo de Orden",
                size: 160,
                cell: ({ row }) => `[${row.original.orderType.codigo}] ${row.original.orderType.descripcion}`,
            },
            {
                id: "issue",
                header: "Falla asociada",
                size: 160,
                cell: ({ row }) =>
                    row.original.failureCode
                        ? `[${row.original.failureCode.code}] ${row.original.failureCode.description}`
                        : "—",
            },
            {
                accessorKey: "precio",
                header: "Precio",
                size: 120,
                cell: ({ row }) =>
                    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(
                        row.original.price
                    ),
            },
            {
                accessorKey: "estimatedMinutes",
                header: "Tiempo Est. (min)",
                size: 140,
            },
            {
                accessorKey: "activo",
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
                            onClick={() => navigate(`edit/${row.original.id}`)}
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
        [navigate]
    );

    const serviceOptions = services.map((s) => ({ value: s.id, label: `[${s.code}] ${s.description}` }));
    const orderTypeOptions = orderTypes.map((o) => ({ value: o.id, label: `[${o.codigo}] ${o.descripcion}` }));

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                $fullWidth
                title="Servicios por Tipo de Orden"
                subtitle="Vinculación de servicios con tipos de orden de trabajo"
                headerActions={
                    <Button variant="primary" leftIcon={<FaPlus />} onClick={() => navigate("new")}>
                        Nueva vinculación
                    </Button>
                }
            >
                {/* Filtros */}
                <Flex gap="sm" wrap="wrap" style={{ marginBottom: "1rem" }}>
                    <div style={{ minWidth: 220 }}>
                        <SearchableSelect
                            placeholder="Filtrar por servicio"
                            options={[{ value: "", label: "Todos los servicios" }, ...serviceOptions]}
                            value={filterServiceId || null}
                            onChange={(val) => { setFilterServiceId(val ? String(val) : ""); setPage(1); }}
                            allowClear
                        />
                    </div>
                    <div style={{ minWidth: 220 }}>
                        <SearchableSelect
                            placeholder="Filtrar por tipo de orden"
                            options={[{ value: "", label: "Todos los tipos" }, ...orderTypeOptions]}
                            value={filterOrderTypeId || null}
                            onChange={(val) => { setFilterOrderTypeId(val ? String(val) : ""); setPage(1); }}
                            allowClear
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
                    onPageChange={setPage}
                    onPageSizeChange={setLimit}
                />
            </Box>
        </Container>
    );
};

export default ServiceOrderTypesPage;
