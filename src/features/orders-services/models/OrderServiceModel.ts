/** Body para POST /services/available */
export interface AvailableServicesRequest {
    orderTypeId: number;
    orderIssueIds: number[];
    orderId: number;
}

/** @deprecated Usar AvailableServicesRequest */
export type OrderServiceRequest = AvailableServicesRequest;

/** Body para POST /orders-service/create */
export interface CreateOrderServiceDto {
    order_id: number;
    service_id: number;
    price?: number;
    estimated_minutes?: number;
    notes?: string;
    /** Código de la orden — usado solo en frontend para invalidar el cache */
    order_code?: string;
    issue_ids: number[];
}

/** Falla vinculada a un servicio (respuesta de GET /orders-service/order/:id) */
export interface OrderServiceIssue {
    id: number;
    title: string;
    description: string;
    status: 'PENDING' | 'RESOLVED' | 'REJECTED';
    is_resolved: boolean;
    failure_code: string | null;
    failure_code_name: string | null;
}

/** @deprecated Usar OrderServiceIssue */
export type ServiceIssue = OrderServiceIssue;

/** Item de respuesta de POST /services/available */
export interface AvailableService {
    service_id: number;
    code: string;
    description: string;
    base_price: number;
    order_type_id: number;
    order_type_name: string;
    price: number;
    estimatedMinutes: number;
    failure_code: {
        id: number;
        code: string;
        name: string;
        description: string;
    } | null;
}

export interface AvailableServicesResponse {
    data: AvailableService[];
    total: number;
}

/** Servicio del catálogo (respuesta de GET /services) */
export interface Service {
    id: number;
    code: string;
    description: string;
    base_price: number;
    is_active: boolean;
    createdAt: string;
    updatedAt: string;
}

/** Servicio registrado en una orden (respuesta de GET /orders-service/order/:id) */
export interface OrderService {
    id: number;
    order_id: number;
    service_id: number;
    price: string;
    estimated_minutes: number;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    service: Service;
    issues: OrderServiceIssue[];
}

export interface OrderServicesResponse {
    data: OrderService[];
    total: number;
}
