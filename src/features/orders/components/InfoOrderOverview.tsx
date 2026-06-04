import dayjs from "dayjs";
import styled from "styled-components";
import {
    Box,
    Button,
    ButtonGroup,
    Column,
    Divider,
    DropdownButton,
    Flex,
    Grid,
    Modal,
    SearchableSelect,
    Table,
    Text,
    Tooltip,
    useAlert,
    useToast,
} from "../../../shared/components";
import type { OrderIssue, Notes, WorkOrder } from "../models/OrderModel";
import { useMemo, useState, useCallback } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { HiDotsVertical } from "react-icons/hi";
import { IoPrint } from "react-icons/io5";
import { FaCopy, FaEdit, FaFileInvoiceDollar, FaTools, FaTrash } from "react-icons/fa";
import { useGetAllTechnicniansQuery } from "../../technician/services/TechnicianApi";
import { useAssignOrderToTechnicianMutation, useUnassignOrderTechnicianMutation, useCreateOrderIssueMutation, useUpdateOrderIssueMutation, useDeleteOrderIssueMutation } from "../services/orderApi";
import { Link } from "react-router";
import { AiFillTool } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import FixIssueModal from "./FixIssueModal";
import { NewIssueModal } from "./NewIssueModal";
import { Accordion, AccordionItem } from "../../../shared/components";
import { FailureAccordionContent } from "./ReportedFailures";
import IconButton from "../../../shared/components/Buttons/IconButton";
import { OrderServicesAccordion } from "../../orders-services/components/OrderServicesAccordionContent";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderStatusStepper } from "./OrderStatusStepper";
import { ConfirmStatusChangeModal } from "./ConfirmStatusChangeModal";
import { OrderDeviceCard } from "./OrderDeviceCard";
import { OrderCustomerCard } from "./OrderCustomerCard";
import { useOrderStatusActions } from "../hooks/useOrderStatusActions";
import { InvoiceModal } from "./Invoice";

// ─── Styled Components ────────────────────────────────────────────────────────

const PageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
`;

const OrderHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    box-shadow: ${(props) => props.theme.shadows.sm};
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.md};
    flex-wrap: wrap;
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    flex-wrap: wrap;
`;

const OrderCode = styled.span`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.bold};
    color: ${(props) => props.theme.colors.text};
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.xs};
`;

const CopyIcon = styled(FaCopy)`
    cursor: pointer;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: ${(props) => props.theme.fontSize.sm};
    transition: color 0.15s ease;

    &:hover {
        color: ${(props) => props.theme.colors.primary};
    }
`;

const StepperSection = styled.div`
    background: ${(props) => props.theme.colors.surface};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
    box-shadow: ${(props) => props.theme.shadows.sm};
`;

const SidePanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
`;

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface DropdownMenuOption {
    id: string;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isDanger?: boolean;
    icon?: React.ReactNode;
}

interface DropdownMenuSection {
    label?: string;
    options: DropdownMenuOption[];
}

const getStatusTextVariant = (status: string): string => {
    switch (status?.toLowerCase()) {
        case "pending": return "Pendiente";
        case "resolved": return "Resuelta";
        case "rejected": return "Cancelada";
        default: return "NaN";
    }
};

const getStatusVariant = (status: string): "warning" | "success" | "danger" | "default" => {
    switch (status?.toLowerCase()) {
        case "pending": return "warning";
        case "resolved": return "success";
        case "rejected": return "danger";
        default: return "default";
    }
};

// ─── Component ────────────────────────────────────────────────────────────────

export const InfoOrderOverview = ({ data }: { data: WorkOrder }) => {
    const { showSuccess, showError } = useToast();
    const { showWarning, closeAlert } = useAlert();
    const [showModalSetTechnician, setShowModalSetTechnician] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | number | null>(null);
    const [selectedIssuesId, setSelectedIssueId] = useState<OrderIssue[] | null>(null);
    const [showFixIssueModal, setShowFixIssueModal] = useState(false);
    const [showNewIssueModal, setShowNewIssueModal] = useState(false);
    const [issueToEdit, setIssueToEdit] = useState<OrderIssue | null>(null);
    const [pendingTransition, setPendingTransition] = useState<{ targetStatus: number } | null>(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

    const { statusOptions } = useOrderStatusActions(data);

    const [assignOrderToTechnician, { isLoading: isAssigning }] = useAssignOrderToTechnicianMutation();
    const [unassignOrderTechnician] = useUnassignOrderTechnicianMutation();
    const [createOrderIssue, { isLoading: isCreatingIssue }] = useCreateOrderIssueMutation();
    const [updateOrderIssue, { isLoading: isUpdatingIssue }] = useUpdateOrderIssueMutation();
    const [deleteOrderIssue] = useDeleteOrderIssueMutation();

    const { data: technicians, isLoading } = useGetAllTechnicniansQuery(
        { filter: searchValue, limit: "todos" },
        { skip: !showModalSetTechnician }
    );

    const columns = useMemo<ColumnDef<Notes>[]>(
        () => [
            { accessorKey: "content", header: "NOTA" },
            { accessorKey: "author", header: "AUTOR" },
            {
                accessorKey: "timestamp",
                header: "FECHA",
                cell: ({ row }) => dayjs(row.original.timestamp).format("DD/MM/YYYY HH:mm"),
            },
        ],
        []
    );

    const handleUnassignTechnician = useCallback(() => {
        showWarning(
            "Desasignar técnico",
            `¿Estás seguro de desasignar a ${data.technician?.name ?? "el técnico"} de esta orden?`,
            [
                { label: "Cancelar", variant: "outline", onClick: closeAlert },
                {
                    label: "Desasignar",
                    variant: "danger",
                    onClick: async () => {
                        closeAlert();
                        try {
                            await unassignOrderTechnician({ order_code: data.order_code }).unwrap();
                            showSuccess("Técnico desasignado correctamente");
                        } catch {
                            showError("Error al desasignar técnico. Intenta nuevamente.", "Error");
                        }
                    },
                },
            ]
        );
    }, [data.order_code, data.technician?.name, showWarning, closeAlert, unassignOrderTechnician, showSuccess, showError]);

    const acciones = useMemo<DropdownMenuOption[] | DropdownMenuSection[]>(() => {
        // ─── Sección: Técnico ─────────────────────────────────────────────────
        const technicianOptions: DropdownMenuOption[] = [];

        if (data.assigned_technician_id == null) {
            technicianOptions.push({
                id: "assign_technician",
                label: "Asignar Técnico",
                onClick: () => setShowModalSetTechnician(true),
            });
        }

        const UNASSIGNABLE_STATUSES = new Set([1, 2]);
        if (data.assigned_technician_id != null && UNASSIGNABLE_STATUSES.has(data.status)) {
            technicianOptions.push({
                id: "unassign_technician",
                label: "Desasignar Técnico",
                onClick: handleUnassignTechnician,
                isDanger: true,
            });
        }

        // ─── Sección: Estado ──────────────────────────────────────────────────
        const statusTransitionOptions: DropdownMenuOption[] = statusOptions
            .filter((opt) => !opt.isDanger)
            .map((opt) => ({
                id: opt.id,
                label: opt.label,
                onClick: () => setPendingTransition({ targetStatus: opt.targetStatus }),
                disabled: opt.disabled,
            }));

        // ─── Sección: Facturación ─────────────────────────────────────────────
        const billingOptions: DropdownMenuOption[] = [
            {
                id: "presupuesto",
                label: "Hacer Presupuesto",
                onClick: () => showSuccess("Presupuesto creado"),
            },
        ];

        // ─── Sección: Administración ──────────────────────────────────────────
        const adminOptions: DropdownMenuOption[] = [
            { id: "edit", label: "Editar Orden", onClick: () => showSuccess("Orden editada") },
        ];

        // Cancelar orden (extraída de statusOptions, es isDanger y solo admin)
        const cancelOption = statusOptions.find((opt) => opt.isDanger);
        if (cancelOption) {
            adminOptions.push({
                id: cancelOption.id,
                label: cancelOption.label,
                onClick: () => setPendingTransition({ targetStatus: cancelOption.targetStatus }),
                disabled: cancelOption.disabled,
                isDanger: true,
            });
        }

        // ─── Construir secciones (solo incluir las que tengan opciones) ───────
        const sections: DropdownMenuSection[] = [];

        if (technicianOptions.length > 0) {
            sections.push({ label: "Técnico", options: technicianOptions });
        }
        if (statusTransitionOptions.length > 0) {
            sections.push({ label: "Estado", options: statusTransitionOptions });
        }
        sections.push({ label: "Facturación", options: billingOptions });
        sections.push({ label: "Administración", options: adminOptions });

        return sections;
    }, [data.assigned_technician_id, data.status, showSuccess, statusOptions, handleUnassignTechnician]);

    const reportedFailures = data.issues;

    const asignarTecnico = async () => {
        if (!selectedTechnicianId) {
            showError("Selecciona un técnico antes de asignar", "Error");
            return;
        }
        try {
            await assignOrderToTechnician({
                order_code: data.order_code,
                technician_id: Number(selectedTechnicianId),
            }).unwrap();
            setShowModalSetTechnician(false);
            showSuccess("Técnico asignado correctamente");
        } catch (err) {
            console.error("Error asignando técnico:", err);
            showError("Error al asignar técnico. Intenta nuevamente.", "Error");
        }
    };

    const handleFixOneIssue = (issue: OrderIssue) => {
        setSelectedIssueId([issue]);
        setShowFixIssueModal(true);
    };

    const handleEditIssue = (issue: OrderIssue) => {
        console.log(issue);

        setIssueToEdit(issue);
        setShowNewIssueModal(true);
    };

    const handleDeleteIssue = (issue: OrderIssue) => {
        showWarning(
            "Eliminar falla",
            `¿Estás seguro de eliminar la falla "${issue.failure_code_name || issue.title}"? Esta acción no se puede deshacer.`,
            [
                { label: "Cancelar", variant: "outline", onClick: closeAlert },
                {
                    label: "Eliminar",
                    variant: "danger",
                    onClick: async () => {
                        closeAlert();
                        try {
                            await deleteOrderIssue({
                                issue_id: issue.id,
                                order_code: data.order_code,
                            }).unwrap();
                            showSuccess("Falla eliminada correctamente");
                        } catch {
                            showError("Error al eliminar la falla. Intenta nuevamente.", "Error");
                        }
                    },
                },
            ]
        );
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(data.order_code);
        showSuccess("Código copiado");
    };

    return (
        <PageWrapper>
            {/* ─── Order Header: Code + Badge + Actions ─── */}
            <OrderHeader>
                <HeaderLeft>
                    <OrderCode>
                        {data.order_code}
                        <CopyIcon onClick={handleCopyCode} title="Copiar código" />
                    </OrderCode>
                    <OrderStatusBadge status={data.status} />
                    <Text variant="body2" color="muted">
                        {data.order_type_name}
                    </Text>
                </HeaderLeft>
                <HeaderRight>
                    {data.status === 6 && (
                        <Button
                            variant="primary"
                            leftIcon={<FaFileInvoiceDollar />}
                            size="sm"
                            onClick={() => setShowInvoiceModal(true)}
                        >
                            Ver factura
                        </Button>
                    )}
                    <Button variant="secondary" leftIcon={<IoPrint />} size="sm">
                        Etiqueta
                    </Button>
                    <DropdownButton
                        label="Acciones"
                        variant="indigo"
                        size="sm"
                        items={acciones}
                        rightIcon={<HiDotsVertical />}
                    />
                </HeaderRight>
            </OrderHeader>

            {/* ─── Stepper Timeline ─── */}
            <StepperSection>
                <OrderStatusStepper order={data} />
            </StepperSection>

            {/* ─── Main Content Grid ─── */}
            <Grid $columns={{ xs: 1, lg: "3fr 1fr" }} $gap="md">
                <Column $gap="md">
                    {/* Order Details */}
                    <Box bg="white" p="lg" rounded shadow fullWidth title="Detalles de la orden" showDivider>
                        <Grid $columns="repeat(auto-fit, minmax(200px, 1fr))" $gap="md">
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Fecha de creación
                                </Text>
                                <Text variant="body2">
                                    {dayjs(data.createdAt).format("DD/MM/YYYY HH:mm")}
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Última modificación
                                </Text>
                                <Text variant="body2">
                                    {dayjs(data.updatedAt).format("DD/MM/YYYY HH:mm")}
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Fecha vencimiento
                                </Text>
                                <Text variant="body2">
                                    {data.sla_deadline
                                        ? dayjs(data.sla_deadline).format("DD/MM/YYYY HH:mm")
                                        : "Sin definir"}
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Prioridad
                                </Text>
                                <Text variant="body2">
                                    {data.priority_description}
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Técnico asignado
                                </Text>
                                {data.assigned_technician_id ? (
                                    <Link to={`/app/technicians/${data.assigned_technician_id}`}>
                                        <Text variant="body2" color="primary">
                                            {data.technician?.name}
                                        </Text>
                                    </Link>
                                ) : (
                                    <Text variant="body2" color="muted">No asignado</Text>
                                )}
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Costo estimado
                                </Text>
                                <Text variant="body2">
                                    {data.currency} {data.estimated_cost}
                                </Text>
                            </Column>
                        </Grid>
                    </Box>

                    {/* Notes Table */}
                    {data.notes && data.notes.length > 0 && (
                        <Box bg="white" rounded shadow fullWidth showDivider>
                            <Table columns={columns} data={data.notes} />
                        </Box>
                    )}

                    {/* Reported Failures */}
                    <Accordion
                        title="Fallas Reportadas"
                        defaultExpanded
                        badge={
                            reportedFailures?.length
                                ? { text: String(reportedFailures.length), variant: "danger" as const }
                                : undefined
                        }
                        headerActions={
                            <DropdownButton
                                items={[
                                    {
                                        label: "Acción",
                                        options: [
                                            {
                                                id: "fix_issue",
                                                label: "Corregir fallas",
                                                onClick: () => setShowFixIssueModal(true),
                                                icon: <AiFillTool />,
                                                disabled: data.status !== 4,
                                            },
                                            {
                                                id: "new_issue",
                                                label: "Nueva falla",
                                                icon: <IoMdAdd />,
                                                onClick: () => setShowNewIssueModal(true),
                                            },
                                        ],
                                    },
                                ]}
                                rightIcon={<HiDotsVertical />}
                                size="sm"
                            />
                        }
                    >
                        {reportedFailures?.map((failure) => (
                            <AccordionItem
                                key={failure.id}
                                defaultExpanded
                                title={`${failure.failure_code || failure.id} - ${failure.failure_code_name || failure.title}`}
                                badge={{
                                    text: getStatusTextVariant(failure.status),
                                    variant: getStatusVariant(failure.status),
                                }}
                                headerActions={
                                    !failure.is_resolved && (
                                        <ButtonGroup>
                                            <Tooltip position="bottom" content={failure.status?.toLowerCase() !== "pending" ? "Solo editable en estado 'Pendiente'" : "Editar falla"}>
                                                <IconButton
                                                    variant="ghost"
                                                    color="neutral"
                                                    size="xs"
                                                    icon={<FaEdit />}
                                                    onClick={() => handleEditIssue(failure)}
                                                    disabled={failure.status?.toLowerCase() !== "pending"}
                                                />
                                            </Tooltip>
                                            <Tooltip position="bottom" content={data.status !== 4 ? "Solo disponible en estado 'En reparación'" : "Reparar falla"}>
                                                <IconButton
                                                    variant="ghost"
                                                    color="neutral"
                                                    size="xs"
                                                    icon={<FaTools />}
                                                    onClick={() => handleFixOneIssue(failure)}
                                                    disabled={data.status !== 4}
                                                />
                                            </Tooltip>
                                            <Tooltip position="bottom" content="Eliminar falla">
                                                <IconButton
                                                    variant="ghost"
                                                    color="danger"
                                                    size="xs"
                                                    icon={<FaTrash />}
                                                    onClick={() => handleDeleteIssue(failure)}
                                                />
                                            </Tooltip>
                                        </ButtonGroup>
                                    )
                                }
                            >
                                <FailureAccordionContent failure={failure} />
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {/* Services */}
                    <OrderServicesAccordion
                        orderId={data.id}
                        orderCode={data.order_code}
                        onNewService={() => { }}
                    />
                </Column>

                {/* ─── Side Panel ─── */}
                <SidePanel>
                    <Box bg="white" rounded shadow $fullWidth>
                        <OrderDeviceCard device={data.devices[0]} />
                        <Divider />
                        <OrderCustomerCard customer={data.customer} />
                    </Box>
                </SidePanel>
            </Grid>

            {/* ─── Modals ─── */}
            <Modal
                isOpen={showModalSetTechnician}
                onClose={() => setShowModalSetTechnician(false)}
                title="Asignar Técnico"
                footer={
                    <Flex $justify="flex-end" $gap="sm">
                        <Button variant="outline" onClick={() => setShowModalSetTechnician(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={asignarTecnico}
                            disabled={
                                !selectedTechnicianId ||
                                !technicians ||
                                technicians.data.length === 0 ||
                                isAssigning
                            }
                        >
                            Asignar Técnico
                        </Button>
                    </Flex>
                }
            >
                <SearchableSelect
                    label="Listado de Técnicos Activos"
                    allowClear
                    fullWidth
                    isLoading={isLoading}
                    onSearch={setSearchValue}
                    value={selectedTechnicianId || undefined}
                    onChange={(val) => setSelectedTechnicianId(val)}
                    options={
                        technicians?.data.map((tech: any) => ({
                            label: tech.name,
                            value: tech.id,
                        })) || []
                    }
                />
            </Modal>

            <FixIssueModal
                isOpen={showFixIssueModal}
                onClose={() => {
                    setShowFixIssueModal(false);
                    setSelectedIssueId(null);
                }}
                selectedIssues={selectedIssuesId}
                orderTypeId={data.order_type_id}
                orderId={data.id}
                orderCode={data.order_code}
            />

            <NewIssueModal
                isOpen={showNewIssueModal}
                onClose={() => {
                    setShowNewIssueModal(false);
                    setIssueToEdit(null);
                }}
                orderId={data.id}
                deviceTypeId={String(data.devices[0].device_type)}
                issueToEdit={issueToEdit}
                onSave={async (issueData) => {
                    try {
                        if (issueToEdit) {
                            await updateOrderIssue({
                                issue_id: issueToEdit.id,
                                order_code: data.order_code,
                                ...issueData,
                            }).unwrap();
                            showSuccess("Falla actualizada correctamente");
                        } else {
                            await createOrderIssue({
                                order_id: data.id,
                                order_code: data.order_code,
                                ...issueData,
                            }).unwrap();
                            showSuccess("Falla agregada correctamente");
                        }
                        setShowNewIssueModal(false);
                        setIssueToEdit(null);
                    } catch {
                        showError(
                            issueToEdit
                                ? "Error al actualizar la falla. Intenta nuevamente."
                                : "Error al agregar la falla. Intenta nuevamente.",
                            "Error"
                        );
                    }
                }}
                isLoading={isCreatingIssue || isUpdatingIssue}
            />

            {pendingTransition && (
                <ConfirmStatusChangeModal
                    isOpen={true}
                    onClose={() => setPendingTransition(null)}
                    orderCode={data.order_code}
                    currentStatus={data.status}
                    targetStatus={pendingTransition.targetStatus}
                    onSuccess={() => {
                        if (pendingTransition.targetStatus === 6) {
                            setShowInvoiceModal(true);
                        }
                    }}
                />
            )}

            <InvoiceModal
                isOpen={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                orderCode={data.order_code}
            />
        </PageWrapper>
    );
};
