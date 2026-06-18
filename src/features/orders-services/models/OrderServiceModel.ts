/** Body para POST /services/available */
export interface AvailableServicesRequest {
    orderTypeId: number;
    orderIssueIds: number[];
    orderId: number;
}

/** @deprecated Usar AvailableServicesRequest */
export type OrderServiceRequest = AvailableServicesRequest;

/** Parte (artículo + cantidad) incluida al asignar un servicio que requiere artículos */
export interface OrderServicePartItem {
    article_id: number;
    quantity: number;
}

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
    /** ID del almacén — requerido cuando el servicio tiene requires_articles = true */
    store_id?: number;
    /** Partes a consumir — requerido cuando el servicio tiene requires_articles = true */
    parts?: OrderServicePartItem[];
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
    requires_articles: boolean;
    failure_code: {
        id: number;
        code: string;
        name: string;
        description: string;
    } | null;
    services_articles: Array<{
        id: number;
        article_id: number;
        article_sku: string;
        article_name: string;
        article_unit_measurement: string;
        default_quantity: string;
        is_active: boolean;
    }>
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

/** Estado del egreso de material vinculado a un servicio de orden */
export type MaterialIssueStatus = 'DRAFT' | 'PENDING' | 'APPROVED';

/** Parte consumida por un servicio de orden (respuesta de GET /orders-service/order/:id) */
export interface OrderServicePart {
    article_id: number;
    article_name: string;
    sku: string;
    quantity: number;
    store_name: string;
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
    parts: OrderServicePart[];
    material_issue_id: number | null;
    material_issue_status: MaterialIssueStatus | null;
}

export interface OrderServicesResponse {
    data: OrderService[];
    total: number;
}
