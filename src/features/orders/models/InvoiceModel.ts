/** Modelo de datos de la factura devuelta por GET /invoices/order/:order_code */

export interface InvoiceBusiness {
    name: string;
    address: string;
    phone: string;
    email: string;
    logo_url: string | null;
    tax_id: string;
}

export interface InvoiceInfo {
    number: string;
    date: string;
    order_code: string;
    received_date: string;
    delivered_date: string;
}

export interface InvoiceCustomer {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface InvoiceDevice {
    name: string;
    brand: string;
    model: string;
    serial_number: string;
    imei: string;
}

export interface InvoiceLineItem {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export interface InvoiceTotals {
    subtotal_services: number;
    subtotal_parts: number;
    subtotal: number;
    tax_rate: number;
    tax_amount: number;
    discount: number;
    total: number;
    currency: string;
}

export interface InvoiceTechnician {
    name: string;
}

export interface InvoiceData {
    business: InvoiceBusiness;
    invoice: InvoiceInfo;
    customer: InvoiceCustomer;
    device: InvoiceDevice | null;
    services: InvoiceLineItem[];
    parts: InvoiceLineItem[];
    totals: InvoiceTotals;
    technician: InvoiceTechnician | null;
    notes: string | null;
}
