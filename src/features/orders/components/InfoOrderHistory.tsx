import { LoadingSpinner } from "../../../shared/components";
import type { WorkOrder } from "../models/OrderModel";
import { useGetLogEventsByOrderIdQuery } from "../services/logEventsApi";
import { Timeline } from "./Timeline";
import type { TimelineEvent } from "./Timeline";

export const InfoOrderHistory = ({ data }: { data: WorkOrder }) => {
    const { data: logEvents, isLoading, isError } = useGetLogEventsByOrderIdQuery({
        order_id: data.id.toString(),
    });
    const timelineEvents: TimelineEvent[] = logEvents?.map((event) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        timestamp: event.timestamp,
        type: event.type,
        user: event.user,
        metadata: event.metadata,
    })) || [];
    
    // const timelineEvents: TimelineEvent[] = [
    //     {
    //         id: "order-created",
    //         title: "Orden de reparación creada",
    //         description: "Se ha registrado una nueva orden de reparación en el sistema con código HW-2024-001.",
    //         timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días atrás
    //         type: "created",
    //         user: "Juan Pérez",
    //         metadata: {
    //             "Código de orden": "HW-2024-001",
    //             "Tipo de dispositivo": "Smartphone",
    //             "Marca": "Samsung",
    //             "Modelo": "Galaxy S24 Ultra",
    //         },
    //     },
    //     {
    //         id: "technician-assigned",
    //         title: "Técnico asignado",
    //         description: "Se ha asignado al técnico Carlos Rodríguez para atender esta orden de reparación.",
    //         timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 días atrás
    //         type: "assigned",
    //         user: "Sistema",
    //         metadata: {
    //             "Técnico asignado": "Carlos Rodríguez",
    //             "Especialidad": "Reparación de Hardware",
    //             "Experiencia": "5 años",
    //         },
    //     },
    //     {
    //         id: "status-in-progress",
    //         title: "Estado actualizado: En proceso",
    //         description: "La orden ha cambiado de estado 'Pendiente' a 'En proceso'. El técnico ha comenzado con el diagnóstico.",
    //         timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 días atrás
    //         type: "status_change",
    //         user: "Carlos Rodríguez",
    //         metadata: {
    //             "Estado anterior": "Pendiente",
    //             "Estado nuevo": "En proceso",
    //             "Prioridad": "Alta",
    //         },
    //     },
    //     {
    //         id: "initial-diagnosis",
    //         title: "Diagnóstico inicial completado",
    //         description: "Se ha realizado el diagnóstico inicial del dispositivo. Se detectaron daños en la pantalla táctil y posibles problemas en la tarjeta lógica.",
    //         timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 días atrás
    //         type: "repair",
    //         user: "Carlos Rodríguez",
    //         metadata: {
    //             "Problemas detectados": "Pantalla táctil dañada, Tarjeta lógica",
    //             "Tiempo estimado": "2-3 días hábiles",
    //             "Costo estimado": "$150.00",
    //         },
    //     },
    //     {
    //         id: "parts-ordered",
    //         title: "Piezas solicitadas",
    //         description: "Se han solicitado las piezas necesarias para la reparación: pantalla táctil original Samsung y kit de reparación de tarjeta lógica.",
    //         timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 días atrás
    //         type: "updated",
    //         user: "Carlos Rodríguez",
    //         metadata: {
    //             "Piezas solicitadas": "Pantalla táctil, Kit reparación tarjeta",
    //             "Proveedor": "Samsung Parts",
    //             "Tiempo de entrega": "24-48 horas",
    //         },
    //     },
    //     {
    //         id: "parts-received",
    //         title: "Piezas recibidas",
    //         description: "Se han recibido todas las piezas necesarias para proceder con la reparación del dispositivo.",
    //         timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 días atrás
    //         type: "updated",
    //         user: "Sistema",
    //         metadata: {
    //             "Piezas recibidas": "Todas las solicitadas",
    //             "Estado de piezas": "Nuevas originales",
    //             "Número de seguimiento": "SP-2024-001-789",
    //         },
    //     },
    //     {
    //         id: "repair-completed",
    //         title: "Reparación completada",
    //         description: "Se ha completado exitosamente la reparación del dispositivo. Se reemplazó la pantalla táctil y se reparó la tarjeta lógica.",
    //         timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 día atrás
    //         type: "repair",
    //         user: "Carlos Rodríguez",
    //         metadata: {
    //             "Reparaciones realizadas": "Reemplazo pantalla, Reparación tarjeta lógica",
    //             "Tiempo total": "4 horas",
    //             "Calidad de reparación": "Garantizada",
    //         },
    //     },
    //     {
    //         id: "quality-check",
    //         title: "Control de calidad aprobado",
    //         description: "El dispositivo ha pasado exitosamente todos los controles de calidad post-reparación.",
    //         timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 horas atrás
    //         type: "completed",
    //         user: "Ana López",
    //         metadata: {
    //             "Supervisor": "Ana López",
    //             "Pruebas realizadas": "Funcionalidad completa",
    //             "Resultado": "Aprobado",
    //         },
    //     },
    //     {
    //         id: "order-closed",
    //         title: "Orden cerrada exitosamente",
    //         description: "La orden de reparación ha sido completada y cerrada. El dispositivo está listo para ser entregado al cliente.",
    //         timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 horas atrás
    //         type: "completed",
    //         user: "Sistema",
    //         metadata: {
    //             "Estado final": "Completada",
    //             "Tiempo total": "7 días",
    //             "Satisfacción del cliente": "Pendiente de encuesta",
    //             "Garantía": "6 meses",
    //         },
    //     },
    // ];

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error al cargar el historial de la orden</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
            <Timeline
                events={timelineEvents}
                showConnector={true}
                size="lg"
            />
        </div>
    );
};
