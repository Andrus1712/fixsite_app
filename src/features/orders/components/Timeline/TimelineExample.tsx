import React from "react";
import { Timeline, TimelineEvent } from "./Timeline";
import { Card } from "../../../../shared/components";

const sampleTimelineEvents: TimelineEvent[] = [
    {
        id: "1",
        title: "Orden de reparación creada",
        description: "Se ha creado la orden de reparación HW-2024-001 para el dispositivo Samsung Galaxy S24 Ultra.",
        timestamp: "2024-01-15T10:30:00Z",
        type: "created",
        user: "Juan Pérez",
        metadata: {
            "Código de orden": "HW-2024-001",
            "Dispositivo": "Samsung Galaxy S24 Ultra",
            "Cliente": "María González",
        },
    },
    {
        id: "2",
        title: "Técnico asignado",
        description: "Se ha asignado al técnico Carlos Rodríguez para trabajar en esta orden.",
        timestamp: "2024-01-15T11:00:00Z",
        type: "assigned",
        user: "Sistema",
        metadata: {
            "Técnico asignado": "Carlos Rodríguez",
            "Especialidad": "Hardware",
        },
    },
    {
        id: "3",
        title: "Estado actualizado: En proceso",
        description: "La orden ha cambiado de estado 'Pendiente' a 'En proceso'.",
        timestamp: "2024-01-15T14:30:00Z",
        type: "status_change",
        user: "Carlos Rodríguez",
        metadata: {
            "Estado anterior": "Pendiente",
            "Estado nuevo": "En proceso",
        },
    },
    {
        id: "4",
        title: "Diagnóstico inicial completado",
        description: "Se ha realizado el diagnóstico inicial del dispositivo. Se detectaron daños en la pantalla táctil y tarjeta lógica.",
        timestamp: "2024-01-15T16:45:00Z",
        type: "repair",
        user: "Carlos Rodríguez",
        metadata: {
            "Problemas detectados": "Pantalla táctil, Tarjeta lógica",
            "Tiempo estimado": "2-3 días",
        },
    },
    {
        id: "5",
        title: "Comentario agregado",
        description: "El cliente confirmó que el dispositivo se cayó desde una altura de aproximadamente 1.5 metros.",
        timestamp: "2024-01-16T09:15:00Z",
        type: "comment",
        user: "María González",
    },
    {
        id: "6",
        title: "Reparación completada",
        description: "Se ha completado la reparación del dispositivo. Se reemplazó la pantalla táctil y se reparó la tarjeta lógica.",
        timestamp: "2024-01-17T17:30:00Z",
        type: "completed",
        user: "Carlos Rodríguez",
        metadata: {
            "Piezas reemplazadas": "Pantalla táctil",
            "Reparaciones realizadas": "Tarjeta lógica",
            "Garantía": "6 meses",
        },
    },
];

const TimelineExample: React.FC = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Timeline Component Examples</h2>

            <Card style={{ marginBottom: "24px" }}>
                <h3>Historial Completo de Orden</h3>
                <Timeline events={sampleTimelineEvents} showConnector={true} />
            </Card>

            <Card style={{ marginBottom: "24px" }}>
                <h3>Historial Sin Conector</h3>
                <Timeline events={sampleTimelineEvents.slice(0, 3)} showConnector={false} />
            </Card>

            <Card>
                <h3>Historial Vacío</h3>
                <Timeline events={[]} />
            </Card>
        </div>
    );
};

export default TimelineExample;