
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

export interface Issue {
    id: number;
    issue_name: string;
    issue_description: string;
    issue_type: number;
    issue_type_description: string;
    issue_severity: number;
    issue_severity_description: 'low' | 'medium' | 'high';
    issue_reproducibility: number;
    issue_reproducibility_description: string;
    issue_frequency: number;
    issue_frequency_description: string;
    issue_impact: number;
    issue_impact_description: string;
    issue_difficulty: number;
    issue_difficulty_description: string;
    issue_priority: number;
    issue_priority_description: string;
    issue_urgency: number;
    issue_urgency_description: string;
    issue_detection: number;
    issue_detection_description: string;
    issue_reported_by: string;
    issue_reported_date: string;
    issue_reported_time: string;
    issue_additional_info: string;
    issue_files: string[] | null;
    issue_logs: string[] | null;
    issue_attachments: string[] | null;
    issue_steps_to_reproduce: string[] | null;
    issue_environment: string;
    issue_additional_notes: string;
    issue_tags: string[] | null;
    issue_custom_fields: any | null;
    issue_related_orders: number[] | null;
    order_id: number;
    // Campos adicionales para compatibilidad con la nueva respuesta
    failure_codes_code: string;
    failure_codes_name: string;
    failure_codes_description: string;
    failure_severities_name: string;
    failure_categories_name: string;
    device_types_name: string;
}

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
    id: number,
    author: string,
    timestamp: string,
    content: string,
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
    issues: Issue[];
    notes: Notes[];
}

export type Order = WorkOrder;
export type OrderDetail = WorkOrder;