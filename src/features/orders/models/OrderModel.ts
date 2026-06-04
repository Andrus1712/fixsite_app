export interface Customer {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    customer_city: string;
    customer_country: string;
    customer_type: string;
    preferred_contact: string;
}

export interface Technician {
    id: number;
    name?: string;
    email: string;
    certification: string;
    level: string;
    phone: string;
    specialty: string;
}

export interface Device {
    id: number;
    device_name: string;
    device_type: number;
    device_type_description: string;
    device_brand: number;
    device_brand_type: string;
    serial_number: string;
    imei: string;
    model_year: string;
    color: string;
    storage_capacity: string;
    order_id: number;
    device_type_name?: string;
    device_brand_name?: string;
    device_model?: number;
    device_model_name?: string;
}

/** Falla reportada en una orden (respuesta del backend) */
export interface OrderIssue {
    id: number;
    title: string;
    description: string;
    additional_notes?: string;
    attachments?: Array<{
        filename: string;
        originalName: string;
        size: string;
        url: string;
    }>;
    steps_to_reproduce?: string[];
    reported_by?: string;
    reported_date?: string;
    // Clasificación (desde FailureCode)
    failure_code_id?: number;
    failure_code?: string;
    failure_code_name?: string;
    failure_code_description?: string;
    severity?: string;
    category?: string;
    device_type?: string;
    // Estado
    status: 'PENDING' | 'RESOLVED' | 'REJECTED';
    is_resolved: boolean;
}

/** @deprecated Usar OrderIssue en su lugar */
export type Issue = OrderIssue;

export type OrderIssueStatus = 'PENDING' | 'RESOLVED' | 'REJECTED';

export interface DeviceType {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface DeviceBrand {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Notes {
    id: number;
    author: string;
    timestamp: string;
    content: string;
    type: string;
}

export interface WorkOrder {
    id: number;
    order_code: string;
    description: string;
    status: number;
    status_description: string;
    priority: number;
    priority_description: string;
    customer_id: number;
    assigned_technician_id: number | null;
    createdAt: string;
    updatedAt: string;
    estimated_cost: string;
    actual_cost: string | null;
    labor_cost: string;
    parts_cost: string;
    currency: string;
    cost_approved: boolean;
    quote_valid_until: string | null;
    estimated_completion: string | null;
    actual_completion: string | null;
    estimated_hours: number;
    actual_hours: number | null;
    sla_deadline: string | null;

    // Relaciones
    customer: Customer;
    technician: Technician | null;
    devices: Device[];
    issues: OrderIssue[];
    notes: Notes[];

    // order_type
    order_type_id: number;
    order_type_name: string;
}

export type Order = WorkOrder;
export type OrderDetail = WorkOrder;
