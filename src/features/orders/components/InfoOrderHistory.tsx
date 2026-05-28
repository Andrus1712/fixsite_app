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
