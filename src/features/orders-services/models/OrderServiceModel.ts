export interface OrderServiceRequest {
    orderTypeId: number;
    issueIds: number[];
}

export interface CreateOrderServiceDto {
    order_id: number;
    service_id: number;
    precio?: number;
    tiempo_estimado_minutos?: number;
    notas?: string;
    activo?: boolean;
}

export interface ServiceIssue {
    id: number;
    issue_name: string;
    issue_description: string;
    issue_type: number;
    issue_type_description: string;
    issue_severity: number;
    issue_severity_description: string;
}

export interface AvailableService {
    service_id: number;
    codigo: string;
    descripcion: string;
    precio_base: string;
    order_type_id: number;
    order_type_nombre: string;
    precio: string;
    tiempoEstimadoMinutos: number;
    issue: ServiceIssue;
}

export interface AvailableServicesResponse {
    data: AvailableService[];
    total: number;
}