import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Accordion, AlertModal, DataTable, Flex, Text, Tooltip } from "../../../shared/components";
import { useDeleteOrderServiceMutation, useGetOrderServiceQuery } from "../services/OrdersServicesApi";
import type { OrderService } from "../models/OrderServiceModel";
import IconButton from "../../../shared/components/Buttons/IconButton";
import { FaTrash } from "react-icons/fa";
import { useAlert } from "../../../shared/components";

interface OrderServicesAccordionContentProps {
    orderId: number;
    orderCode?: string;
}

const formatCurrency = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(num);
};

const formatMinutes = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
};

export const OrderServicesAccordionContent = ({ orderId, orderCode }: OrderServicesAccordionContentProps) => {
    const { data, isLoading, isError } = useGetOrderServiceQuery({ order_id: orderId });
    const [deleteOrderService] = useDeleteOrderServiceMutation();
    const { showError } = useAlert();

    const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);

    const handleDeleteConfirm = async () => {
        if (pendingDeleteId === null) return;
        try {
            await deleteOrderService({ order_service_id: pendingDeleteId, order_id: orderId, order_code: orderCode }).unwrap();
        } catch {
            showError("Error", "No se pudo eliminar el servicio. Intenta nuevamente.", [
                { label: "Cerrar", onClick: () => { } },
            ]);
        } finally {
            setPendingDeleteId(null);
        }
    };

    const columns = useMemo<ColumnDef<OrderService>[]>(
        () => [
            {
                accessorKey: "service.code",
                header: "Código",
                size: 900,
            },
            {
                accessorKey: "service.description",
                header: "Descripción",
                size: 900,
            },
            {
                header: "Fallas solucionadas",
                cell: ({ row }) => {
                    return row.original.issues?.map((issue, index) => (
                        <Flex key={index} $align="center" style={{ gap: "4px" }}>
                            <Text variant="body2">•</Text>
                            <Text variant="body2">{issue.failure_code ?? issue.title}</Text>
                        </Flex>
                    ));
                }
            },
            {
                accessorKey: "service.base_price",
                header: "Precio Base",
                size: 130,
                cell: ({ getValue }) => formatCurrency(getValue<number>()),
            },
            {
                accessorKey: "price",
                header: "Precio Aplicado",
                size: 140,
                cell: ({ getValue }) => formatCurrency(getValue<string>()),
            },
            {
                accessorKey: "estimated_minutes",
                header: "Tiempo Est.",
                size: 110,
                cell: ({ getValue }) => formatMinutes(getValue<number>()),
            },
            {
                accessorKey: "notes",
                header: "Notas",
                size: 900,
                cell: ({ getValue }) => {
                    const val = getValue<string | null>();
                    return val ? (
                        <Text variant="body2">{val}</Text>
                    ) : (
                        <Text variant="body2" color="muted">—</Text>
                    );
                },
            },
            {
                id: "actions",
                header: "Acciones",
                size: 90,
                cell: ({ row }) => (
                    <Tooltip position="bottom" content="Eliminar servicio">
                        <IconButton
                            variant="ghost"
                            color="danger"
                            icon={<FaTrash />}
                            size="xs"
                            onClick={() => setPendingDeleteId(row.original.id)}
                        />
                    </Tooltip>
                ),
            },
        ],
        []
    );

    if (isError) {
        return (
            <Flex $justify="center" $align="center" style={{ padding: "16px" }}>
                <Text variant="body2" color="error">
                    Error al cargar los servicios. Intenta nuevamente.
                </Text>
            </Flex>
        );
    }

    if (!isLoading && (!data?.data || data.data.length === 0)) {
        return (
            <Text variant="body2" color="muted">
                No se han registrado servicios efectuados para esta orden.
            </Text>
        );
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data ?? []}
                initialPageSize={10}
            />
            <AlertModal
                isOpen={pendingDeleteId !== null}
                onClose={() => setPendingDeleteId(null)}
                title="Eliminar servicio"
                message="¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer."
                type="warning"
                animation="scale"
                buttons={[
                    { label: "Cancelar", variant: "outline", onClick: () => setPendingDeleteId(null) },
                    { label: "Eliminar", variant: "danger", icon: <FaTrash />, onClick: handleDeleteConfirm },
                ]}
            />
        </>
    );
};

export default OrderServicesAccordionContent;

// ─── Acordeón completo con badge dinámico ────────────────────────────────────

interface OrderServicesAccordionProps {
    orderId: number;
    orderCode?: string;
    onNewService?: () => void;
}

export const OrderServicesAccordion = ({ orderId, orderCode }: OrderServicesAccordionProps) => {
    const { data } = useGetOrderServiceQuery({ order_id: orderId });
    const total = data?.total ?? 0;

    return (
        <Accordion
            title="Servicios Efectuados"
            defaultExpanded
            badge={{ text: String(total), variant: total > 0 ? "info" : "default" }}
        >
            <OrderServicesAccordionContent orderId={orderId} orderCode={orderCode} />
        </Accordion>
    );
};
