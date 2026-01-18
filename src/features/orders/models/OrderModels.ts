export interface DeviceData {
  device_id: number;
  device_name: string;
  device_type: number;
  device_type_description: string;
  device_brand: number;
  device_brand_type: string;
  serial_number: string;
  imei?: string;
  model_year: string;
  color: string;
  storage_capacity: string;
}

export interface IssueCustomFields {
  warranty_status: string;
  purchase_date: string;
  damage_type: string;
  liquid_damage: boolean;
}

export interface IssueInfo {
  issue_id: number;
  issue_name: string;
  issue_description: string;
  issue_type: number;
  issue_type_description: string;
  issue_severity: number;
  issue_severity_description: string;
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
  issue_screenshots: string[];
  issue_videos: string[];
  issue_logs: string[];
  issue_attachments: string[];
  issue_steps_to_reproduce: string[];
  issue_environment: string;
  issue_additional_notes: string;
  issue_tags: string[];
  issue_custom_fields: IssueCustomFields;
  issue_related_orders: string[];
}

export interface CustomerData {
  customer_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  customer_city: string;
  customer_country: string;
  customer_type: string;
  preferred_contact: string;
}

export interface TechnicianData {
  assigned_technician_id: number;
  assigned_technician_name: string;
  assigned_technician_email: string;
  assigned_technician_phone: string;
  assigned_technician_specialty: string;
  technician_level: string;
  certification: string;
}

export interface CostInfo {
  estimated_cost: number | null;
  actual_cost: number | null;
  labor_cost: number | null;
  parts_cost: number | null;
  currency: string;
  cost_approved: boolean;
  quote_valid_until: string | null;
}

export interface Timeline {
  estimated_completion: string | null;
  actual_completion: string | null;
  estimated_hours: number | null;
  actual_hours: number | null;
  sla_deadline: string;
}

export interface PartNeeded {
  part_id: string;
  part_name: string;
  quantity: number;
  cost: number;
  availability: string;
}

export interface StatusHistoryEntry {
  status: string;
  timestamp: string;
  changed_by: string;
  notes: string;
}

export interface Note {
  id: number;
  author?: string;
  timestamp?: string;
  content: string;
  type: string;
}

export interface Order {
  id: number;
  order_code: string;
  description: string;
  device_data: DeviceData;
  issue_info: IssueInfo;
  status: number;
  status_description: string;
  priority: number;
  priority_description: string;
  customer_id: number;
  customer_data: CustomerData;
  assigned_technician_id: number | null;
  technician_data: TechnicianData | null;
  cost_info: CostInfo;
  timeline: Timeline;
  parts_needed: PartNeeded[];
  status_history: StatusHistoryEntry[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'in_progress' | 'waiting_parts' | 'completed' | 'ready_for_pickup';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type DeviceType = 'smartphone' | 'laptop' | 'tablet' | 'smartwatch';
export type CustomerType = 'individual' | 'business';
export type TechnicianLevel = 'junior' | 'intermediate' | 'senior' | 'expert';

export interface ResponseOrder {
  errors: string;
  message: string;
  status: number;
  success: boolean;
  data: Order;
}