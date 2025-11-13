export interface ApiResponse {
    data: OrderDetail[]; // Un array de objetos OrderDetail
    total: number;
    page: number;
    totalPages: number;
}

export interface OrderDetail {
    id: number;
    order_code: string;
    description: string;
    status: number;
    status_description: string;
    priority: number;
    priority_description: 'low' | 'medium' | 'high'; // Posibles valores según el ejemplo
    customer_id: number;
    assigned_technician_id: number | null;
    createdAt: string; // Formato ISO 8601 de fecha y hora
    updatedAt: string; // Formato ISO 8601 de fecha y hora
    estimated_cost: string; // Representado como string de moneda
    actual_cost: string | null; // Representado como string de moneda o null
    labor_cost: string; // Representado como string de moneda
    parts_cost: string; // Representado como string de moneda
    currency: string; // Ej. "USD"
    cost_approved: boolean;
    quote_valid_until: string | null; // Fecha o null
    estimated_completion: string; // Fecha (YYYY-MM-DD)
    actual_completion: string | null; // Fecha o null
    estimated_hours: number;
    actual_hours: number | null;
    sla_deadline: string; // Fecha (YYYY-MM-DD)
    customer: Customer; // Objeto anidado de Customer
    technician: Technician | null; // Objeto anidado de Technician o null
    devices: Device[]; // Array de objetos Device
    issues: Issue[]; // Array de objetos Issue
}

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
    // Otros campos relevantes del técnico, como:
    // name: string;
    // email: string;
    // ...
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
}

export interface Issue {
    id: number;
    issue_name: string;
    issue_description: string;
    issue_type: number;
    issue_type_description: string;
    issue_severity: number;
    issue_severity_description: 'low' | 'medium' | 'high'; // Posibles valores
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
    issue_reported_date: string; // Fecha (YYYY-MM-DD)
    issue_reported_time: string; // Hora (HH:MM)
    issue_additional_info: string;
    issue_screenshots: string[]; // Array de strings (URLs o rutas de archivos)
    issue_videos: string[] | null;
    issue_logs: string[] | null;
    issue_attachments: string[] | null;
    issue_steps_to_reproduce: string[]; // Array de strings
    issue_environment: string;
    issue_additional_notes: string;
    issue_tags: string[] | null;
    issue_custom_fields: any | null; // Tipo genérico ya que el contenido es desconocido/variable
    issue_related_orders: number[] | null;
    order_id: number;
}