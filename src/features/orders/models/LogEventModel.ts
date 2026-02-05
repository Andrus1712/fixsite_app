export interface LogEvent {
    id: string;
    title: string;
    description?: string;
    timestamp: string;
    type: "created" | "updated" | "assigned" | "status_change" | "comment" | "repair" | "completed" | "cancelled" | "custom";
    status?: "success" | "warning" | "error" | "info" | "default";
    user?: string;
    metadata?: Record<string, any>;
    icon?: string;
}