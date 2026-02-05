import React, { useState } from "react";
import { PartsManagement, RepairPart } from "./PartsManagement";
import { Card } from "../../../../shared/components";

const sampleParts: RepairPart[] = [
    {
        id: "1",
        name: "Pantalla LCD Samsung Galaxy S24 Ultra",
        description: "Pantalla OLED de reemplazo con touch integrado",
        partNumber: "SM-G998B-LCD-001",
        quantity: 1,
        estimatedCost: 299.99,
        actualCost: 285.50,
        supplier: "Samsung Parts",
        status: "installed",
        requestedBy: "Carlos Rodríguez",
        requestedDate: "2024-01-10T09:00:00Z",
        approvedBy: "Ana López",
        approvedDate: "2024-01-10T14:30:00Z",
        notes: "Pantalla original Samsung, calidad garantizada",
        category: "screen",
    },
    {
        id: "2",
        name: "Batería 5000mAh Samsung",
        description: "Batería de litio de alta capacidad",
        partNumber: "SM-G998B-BAT-002",
        quantity: 1,
        estimatedCost: 89.99,
        supplier: "Samsung Parts",
        status: "approved",
        requestedBy: "Carlos Rodríguez",
        requestedDate: "2024-01-12T11:15:00Z",
        approvedBy: "Ana López",
        approvedDate: "2024-01-12T16:45:00Z",
        category: "battery",
    },
    {
        id: "3",
        name: "Tarjeta lógica principal",
        description: "Placa base con procesador dañado",
        partNumber: "SM-G998B-MAIN-003",
        quantity: 1,
        estimatedCost: 450.00,
        supplier: "iFixit",
        status: "requested",
        requestedBy: "Carlos Rodríguez",
        requestedDate: "2024-01-15T08:30:00Z",
        notes: "Requiere diagnóstico adicional antes de aprobar",
        category: "board",
    },
    {
        id: "4",
        name: "Módulo de cámara trasera",
        description: "Cámara triple con sensor defectuoso",
        partNumber: "SM-G998B-CAM-004",
        quantity: 1,
        estimatedCost: 189.99,
        supplier: "Samsung Parts",
        status: "ordered",
        requestedBy: "Carlos Rodríguez",
        requestedDate: "2024-01-08T10:00:00Z",
        approvedBy: "Ana López",
        approvedDate: "2024-01-08T15:20:00Z",
        category: "camera",
    },
    {
        id: "5",
        name: "Marco metálico del chasis",
        description: "Estructura metálica con daños por caída",
        partNumber: "SM-G998B-FRAME-005",
        quantity: 1,
        estimatedCost: 75.50,
        supplier: "Generic Parts",
        status: "rejected",
        requestedBy: "Carlos Rodríguez",
        requestedDate: "2024-01-05T14:20:00Z",
        approvedBy: "Ana López",
        approvedDate: "2024-01-05T17:10:00Z",
        notes: "Rechazado: El marco se puede reparar en lugar de reemplazar",
        category: "other",
    },
];

const PartsManagementExample: React.FC = () => {
    const [parts, setParts] = useState<RepairPart[]>(sampleParts);

    const handleRequestPart = (newPart: Omit<RepairPart, "id" | "status" | "requestedDate">) => {
        const part: RepairPart = {
            ...newPart,
            id: Date.now().toString(),
            status: "requested",
            requestedDate: new Date().toISOString(),
        };
        setParts([...parts, part]);
        console.log("Nueva pieza solicitada:", part);
    };

    const handleApprovePart = (partId: string) => {
        setParts(parts.map(part =>
            part.id === partId
                ? { ...part, status: "approved", approvedBy: "Ana López", approvedDate: new Date().toISOString() }
                : part
        ));
        console.log("Pieza aprobada:", partId);
    };

    const handleRejectPart = (partId: string, reason: string) => {
        setParts(parts.map(part =>
            part.id === partId
                ? { ...part, status: "rejected", notes: reason }
                : part
        ));
        console.log("Pieza rechazada:", partId, reason);
    };

    const handleUpdatePart = (partId: string, updates: Partial<RepairPart>) => {
        setParts(parts.map(part =>
            part.id === partId ? { ...part, ...updates } : part
        ));
        console.log("Pieza actualizada:", partId, updates);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>PartsManagement Component Examples</h2>

            {/* Vista de Técnico (puede solicitar piezas) */}
            <Card style={{ marginBottom: "24px" }}>
                <h3>Vista de Técnico - Puede solicitar piezas</h3>
                <PartsManagement
                    orderId="HW-2024-001"
                    parts={parts}
                    onRequestPart={handleRequestPart}
                    onUpdatePart={handleUpdatePart}
                    canRequestParts={true}
                    canApproveParts={false}
                />
            </Card>

            {/* Vista de Supervisor (puede aprobar/rechazar) */}
            <Card>
                <h3>Vista de Supervisor - Puede aprobar/rechazar piezas</h3>
                <PartsManagement
                    orderId="HW-2024-001"
                    parts={parts}
                    onApprovePart={handleApprovePart}
                    onRejectPart={handleRejectPart}
                    canRequestParts={false}
                    canApproveParts={true}
                />
            </Card>
        </div>
    );
};

export default PartsManagementExample;