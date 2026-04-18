export interface OrderServiceRequest {
    orderTypeId: number;
    orderServiceIds: number[];
    orderId: number;
}

export interface CreateOrderServiceDto {
    order_id: number;
    service_id: number;
    precio?: number;
    tiempo_estimado_minutos?: number;
    notas?: string;
    activo?: boolean;
    /** Código de la orden — usado solo en frontend para invalidar el cache de la orden */
    order_code?: string;
    issues_ids: number[];
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

/** Servicio registrado en una orden (respuesta de orders-service/order/:id) */
export interface OrderService {
    id: number;
    order_id: number;
    service_id: number;
    codigo: string;
    descripcion: string;
    precio_base: string;
    precio: string;
    tiempo_estimado_minutos: number;
    notas: string | null;
    activo: boolean;
    createdAt: string;
    updatedAt: string;
    service: {
        id: number;
        codigo: string;
        descripcion: string;
        precio_base: string;
        activo: boolean;
        createdAt: string;
        updatedAt: string;
    },
    issues: [{
        id: number;
        issue_name: string;
        issue_description: string;
        status: string;
        is_resolved: boolean;
        failure_code: string;
        failure_name: string;
    }];
}

export interface OrderServicesResponse {
    data: OrderService[];
    total: number;
}