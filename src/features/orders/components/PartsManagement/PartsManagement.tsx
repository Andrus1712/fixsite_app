import React, { useState, useMemo } from "react";
import {
    Card,
    Text,
    Button,
    Badge,
    Row,
    Column,
    Input,
    Select,
    TextArea,
    FormGroup,
    Modal,
    DropdownButton,
} from "../../../../shared/components";
import { IoAdd, IoCheckmark, IoClose, IoEye, IoPencil, IoTrash, IoTime, IoHardwareChip } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../../../../shared/components/Tables/Table";

export interface RepairPart {
    id: string;
    name: string;
    description: string;
    partNumber: string;
    quantity: number;
    estimatedCost: number;
    actualCost?: number;
    supplier: string;
    status: "requested" | "approved" | "ordered" | "received" | "installed" | "rejected";
    requestedBy: string;
    requestedDate: string;
    approvedBy?: string;
    approvedDate?: string;
    notes?: string;
    category: "screen" | "battery" | "board" | "camera" | "other";
}

export interface PartsManagementProps {
    orderId: string;
    parts: RepairPart[];
    onRequestPart?: (part: Omit<RepairPart, "id" | "status" | "requestedDate">) => void;
    onApprovePart?: (partId: string) => void;
    onRejectPart?: (partId: string, reason: string) => void;
    onUpdatePart?: (partId: string, updates: Partial<RepairPart>) => void;
    canRequestParts?: boolean;
    canApproveParts?: boolean;
}

const PartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const PartsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
`;

const PartsStats = styled.div`
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
`;

const StatCard = styled(Card)`
    padding: 16px;
    text-align: center;
    min-width: 120px;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 16px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const getStatusColor = (status: RepairPart["status"]): string => {
    switch (status) {
        case "requested":
            return "warning";
        case "approved":
            return "info";
        case "ordered":
            return "default";
        case "received":
            return "primary";
        case "installed":
            return "success";
        case "rejected":
            return "error";
        default:
            return "default";
    }
};

const getStatusText = (status: RepairPart["status"]): string => {
    switch (status) {
        case "requested":
            return "Solicitado";
        case "approved":
            return "Aprobado";
        case "ordered":
            return "Pedido";
        case "received":
            return "Recibido";
        case "installed":
            return "Instalado";
        case "rejected":
            return "Rechazado";
        default:
            return status;
    }
};

const getCategoryIcon = (category: RepairPart["category"]): React.ReactNode => {
    switch (category) {
        case "screen":
            return <IoHardwareChip size={16} />;
        case "battery":
            return <IoHardwareChip size={16} />;
        case "board":
            return <IoHardwareChip size={16} />;
        case "camera":
            return <IoHardwareChip size={16} />;
        default:
            return <IoHardwareChip size={16} />;
    }
};

export const PartsManagement: React.FC<PartsManagementProps> = ({
    orderId,
    parts,
    onRequestPart,
    onApprovePart,
    onRejectPart,
    onUpdatePart,
    canRequestParts = true,
    canApproveParts = false,
}) => {
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedPart, setSelectedPart] = useState<RepairPart | null>(null);
    const [rejectReason, setRejectReason] = useState("");

    // Form state for new part request
    const [newPart, setNewPart] = useState({
        name: "",
        description: "",
        partNumber: "",
        quantity: 1,
        estimatedCost: 0,
        supplier: "",
        category: "other" as RepairPart["category"],
        notes: "",
    });

    const columns = useMemo<ColumnDef<RepairPart>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Pieza",
                cell: ({ row }) => (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        {getCategoryIcon(row.original.category)}
                        <div>
                            <Text variant="body2" weight="semibold">
                                {row.original.name}
                            </Text>
                            <Text variant="caption" color="muted">
                                #{row.original.partNumber}
                            </Text>
                        </div>
                    </div>
                ),
            },
            {
                accessorKey: "quantity",
                header: "Cant.",
                cell: ({ row }) => <Text variant="body2">{row.original.quantity}</Text>,
            },
            {
                accessorKey: "estimatedCost",
                header: "Costo Est.",
                cell: ({ row }) => <Text variant="body2">${row.original.estimatedCost.toFixed(2)}</Text>,
            },
            {
                accessorKey: "supplier",
                header: "Proveedor",
                cell: ({ row }) => <Text variant="body2">{row.original.supplier}</Text>,
            },
            {
                accessorKey: "status",
                header: "Estado",
                cell: ({ row }) => (
                    <Badge variant={getStatusColor(row.original.status)}>{getStatusText(row.original.status)}</Badge>
                ),
            },
            {
                accessorKey: "requestedDate",
                header: "Fecha",
                cell: ({ row }) => (
                    <Text variant="caption" color="muted">
                        {new Date(row.original.requestedDate).toLocaleDateString("es-ES")}
                    </Text>
                ),
            },
            {
                id: "actions",
                header: "Acciones",
                cell: ({ row }) => {
                    const part = row.original;
                    const actions = [];

                    if (canApproveParts && part.status === "requested") {
                        actions.push(
                            {
                                id: "approve",
                                label: "Aprobar",
                                icon: <IoCheckmark />,
                                onClick: () => onApprovePart?.(part.id),
                            },
                            {
                                id: "reject",
                                label: "Rechazar",
                                icon: <IoClose />,
                                onClick: () => {
                                    setSelectedPart(part);
                                    setShowRejectModal(true);
                                },
                            }
                        );
                    }

                    actions.push({
                        id: "view",
                        label: "Ver detalles",
                        icon: <IoEye />,
                        onClick: () => setSelectedPart(part),
                    });

                    return (
                        <DropdownButton
                            items={[{ label: "Acciones", options: actions }]}
                            rightIcon={<HiDotsVertical />}
                            size="sm"
                        />
                    );
                },
            },
        ],
        [canApproveParts, onApprovePart]
    );

    const stats = useMemo(() => {
        const total = parts.length;
        const requested = parts.filter((p) => p.status === "requested").length;
        const approved = parts.filter((p) => p.status === "approved").length;
        const received = parts.filter((p) => p.status === "received").length;
        const installed = parts.filter((p) => p.status === "installed").length;
        const totalCost = parts.reduce((sum, p) => sum + p.estimatedCost, 0);

        return { total, requested, approved, received, installed, totalCost };
    }, [parts]);

    const handleRequestPart = () => {
        if (onRequestPart) {
            onRequestPart({
                ...newPart,
                requestedBy: "Usuario actual", // This should come from auth context
            });
            setNewPart({
                name: "",
                description: "",
                partNumber: "",
                quantity: 1,
                estimatedCost: 0,
                supplier: "",
                category: "other",
                notes: "",
            });
            setShowRequestModal(false);
        }
    };

    const handleRejectPart = () => {
        if (selectedPart && onRejectPart) {
            onRejectPart(selectedPart.id, rejectReason);
            setShowRejectModal(false);
            setSelectedPart(null);
            setRejectReason("");
        }
    };

    return (
        <PartsContainer>
            <PartsHeader>
                <div>
                    <Text variant="h3" weight="semibold">
                        Gestión de Piezas
                    </Text>
                    <Text variant="body2" color="muted">
                        Solicita, aprueba y administra las piezas necesarias para la reparación
                    </Text>
                </div>
                {canRequestParts && (
                    <Button variant="primary" size="sm" onClick={() => setShowRequestModal(true)} leftIcon={<IoAdd />}>
                        Solicitar Pieza
                    </Button>
                )}
            </PartsHeader>

            <PartsStats>
                <StatCard variant="outlined">
                    <Text variant="h4" weight="bold">
                        {stats.total}
                    </Text>
                    <Text variant="caption" color="muted">
                        Total Piezas
                    </Text>
                </StatCard>
                <StatCard variant="outlined">
                    <Text variant="h4" weight="bold" style={{ color: "#F59E0B" }}>
                        {stats.requested}
                    </Text>
                    <Text variant="caption" color="muted">
                        Pendientes
                    </Text>
                </StatCard>
                <StatCard variant="outlined">
                    <Text variant="h4" weight="bold" style={{ color: "#10B981" }}>
                        {stats.approved}
                    </Text>
                    <Text variant="caption" color="muted">
                        Aprobadas
                    </Text>
                </StatCard>
                <StatCard variant="outlined">
                    <Text variant="h4" weight="bold" style={{ color: "#3B82F6" }}>
                        {stats.received}
                    </Text>
                    <Text variant="caption" color="muted">
                        Recibidas
                    </Text>
                </StatCard>
                <StatCard variant="outlined">
                    <Text variant="h4" weight="bold">
                        ${stats.totalCost.toFixed(2)}
                    </Text>
                    <Text variant="caption" color="muted">
                        Costo Total
                    </Text>
                </StatCard>
            </PartsStats>

            <Card size="full">
                <DataTable data={parts} columns={columns} searchPlaceholder="Buscar piezas..." />
            </Card>

            {/* Request Part Modal */}
            <Modal
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
                title="Solicitar Nueva Pieza"
                size="lg"
            >
                <ModalContent>
                    <FormContainer>
                        <FormGroup label="Nombre de la Pieza">
                            <Input
                                value={newPart.name}
                                onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                                placeholder="Ej: Pantalla LCD Samsung S24"
                            />
                        </FormGroup>

                        <FormGroup label="Número de Parte">
                            <Input
                                value={newPart.partNumber}
                                onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
                                placeholder="Ej: SM-G998B-LCD-001"
                            />
                        </FormGroup>

                        <FormGroup label="Categoría">
                            <Select
                                value={newPart.category}
                                onValueChange={(value) =>
                                    setNewPart({ ...newPart, category: value as RepairPart["category"] })
                                }
                                options={[
                                    { value: "screen", label: "Pantalla" },
                                    { value: "battery", label: "Batería" },
                                    { value: "board", label: "Tarjeta/Placa" },
                                    { value: "camera", label: "Cámara" },
                                    { value: "other", label: "Otro" },
                                ]}
                            />
                        </FormGroup>

                        <FormGroup label="Cantidad">
                            <Input
                                type="number"
                                value={newPart.quantity}
                                onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) || 1 })}
                                min={1}
                            />
                        </FormGroup>

                        <FormGroup label="Costo Estimado">
                            <Input
                                type="number"
                                value={newPart.estimatedCost}
                                onChange={(e) =>
                                    setNewPart({ ...newPart, estimatedCost: parseFloat(e.target.value) || 0 })
                                }
                                min={0}
                                step={0.01}
                                placeholder="0.00"
                            />
                        </FormGroup>

                        <FormGroup label="Proveedor">
                            <Input
                                value={newPart.supplier}
                                onChange={(e) => setNewPart({ ...newPart, supplier: e.target.value })}
                                placeholder="Ej: Samsung Parts, iFixit"
                            />
                        </FormGroup>
                    </FormContainer>

                    <FormGroup label="Descripción">
                        <TextArea
                            value={newPart.description}
                            onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
                            placeholder="Describe por qué necesitas esta pieza y su importancia para la reparación..."
                            rows={3}
                        />
                    </FormGroup>

                    <FormGroup label="Notas Adicionales">
                        <TextArea
                            value={newPart.notes}
                            onChange={(e) => setNewPart({ ...newPart, notes: e.target.value })}
                            placeholder="Información adicional relevante..."
                            rows={2}
                        />
                    </FormGroup>

                    <Row $justify="flex-end" $gap="sm">
                        <Button variant="outline" onClick={() => setShowRequestModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" onClick={handleRequestPart}>
                            Solicitar Pieza
                        </Button>
                    </Row>
                </ModalContent>
            </Modal>

            {/* Reject Part Modal */}
            <Modal
                isOpen={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                title="Rechazar Solicitud de Pieza"
                size="md"
            >
                <ModalContent>
                    <Text variant="body2">
                        ¿Estás seguro de que quieres rechazar la solicitud de la pieza "{selectedPart?.name}"?
                    </Text>

                    <FormGroup label="Razón del rechazo">
                        <TextArea
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            placeholder="Explica por qué se rechaza esta solicitud..."
                            rows={3}
                        />
                    </FormGroup>

                    <Row $justify="flex-end" $gap="sm">
                        <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" onClick={handleRejectPart}>
                            Rechazar
                        </Button>
                    </Row>
                </ModalContent>
            </Modal>

            {/* Part Details Modal */}
            <Modal
                isOpen={!!selectedPart && !showRejectModal}
                onClose={() => setSelectedPart(null)}
                title={`Detalles de Pieza - ${selectedPart?.name}`}
                size="lg"
            >
                {selectedPart && (
                    <ModalContent>
                        <Row $gap="lg">
                            <Column>
                                <FormGroup label="Nombre">
                                    <Text variant="body1">{selectedPart.name}</Text>
                                </FormGroup>

                                <FormGroup label="Número de Parte">
                                    <Text variant="body1">{selectedPart.partNumber}</Text>
                                </FormGroup>

                                <FormGroup label="Categoría">
                                    <Badge variant="default">{selectedPart.category}</Badge>
                                </FormGroup>

                                <FormGroup label="Estado">
                                    <Badge variant={getStatusColor(selectedPart.status)}>
                                        {getStatusText(selectedPart.status)}
                                    </Badge>
                                </FormGroup>
                            </Column>

                            <Column>
                                <FormGroup label="Cantidad">
                                    <Text variant="body1">{selectedPart.quantity}</Text>
                                </FormGroup>

                                <FormGroup label="Costo Estimado">
                                    <Text variant="body1">${selectedPart.estimatedCost.toFixed(2)}</Text>
                                </FormGroup>

                                {selectedPart.actualCost && (
                                    <FormGroup label="Costo Real">
                                        <Text variant="body1">${selectedPart.actualCost.toFixed(2)}</Text>
                                    </FormGroup>
                                )}

                                <FormGroup label="Proveedor">
                                    <Text variant="body1">{selectedPart.supplier}</Text>
                                </FormGroup>
                            </Column>
                        </Row>

                        <FormGroup label="Descripción">
                            <Text variant="body2">{selectedPart.description}</Text>
                        </FormGroup>

                        {selectedPart.notes && (
                            <FormGroup label="Notas">
                                <Text variant="body2">{selectedPart.notes}</Text>
                            </FormGroup>
                        )}

                        <Row $gap="lg">
                            <Column>
                                <FormGroup label="Solicitado por">
                                    <Text variant="body2">{selectedPart.requestedBy}</Text>
                                </FormGroup>

                                <FormGroup label="Fecha de solicitud">
                                    <Text variant="body2">
                                        {new Date(selectedPart.requestedDate).toLocaleString("es-ES")}
                                    </Text>
                                </FormGroup>
                            </Column>

                            {selectedPart.approvedBy && (
                                <Column>
                                    <FormGroup label="Aprobado por">
                                        <Text variant="body2">{selectedPart.approvedBy}</Text>
                                    </FormGroup>

                                    <FormGroup label="Fecha de aprobación">
                                        <Text variant="body2">
                                            {new Date(selectedPart.approvedDate!).toLocaleString("es-ES")}
                                        </Text>
                                    </FormGroup>
                                </Column>
                            )}
                        </Row>
                    </ModalContent>
                )}
            </Modal>
        </PartsContainer>
    );
};
