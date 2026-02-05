import { Card, Column, Row, Text, Label, Divider } from "../../../shared/components";
import { FiUser, FiSmartphone, FiAlertTriangle, FiDollarSign, FiClock, FiFileText } from "react-icons/fi";

// interface FormTabResumeProps {
//     formData?: {
//         // Servicio
//         serviceType?: number;
//         description?: string;
//         priority?: number;

//         // Cliente
//         customer_data?: {
//             customer_name?: string;
//             customer_email?: string;
//             customer_phone?: string;
//             customer_city?: string;
//             customer_country?: string;
//             customer_type?: string;
//             preferred_contact?: string;
//         };

//         // Dispositivo
//         device_data?: {
//             device_name?: string;
//             device_type?: number;
//             device_brand?: number;
//             serial_number?: string;
//             imei?: string;
//             model_year?: string;
//         };

//         // Problemas
//         issues?: Array<{
//             issueType?: number;
//             severity?: number;
//             description?: string;
//             steps?: string;
//         }>;

//         // Costos
//         cost_info?: {
//             estimated_cost?: number;
//             labor_cost?: number;
//             parts_cost?: number;
//             currency?: string;
//         };

//         // Timeline
//         timeline?: {
//             estimated_completion?: string;
//             estimated_hours?: number;
//         };
//     };
// }

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabResume = ({ formData, updateField }: FormProps) => {
    const getServiceTypeLabel = (type?: number) => {
        switch (type) {
            case 1:
                return "Reparación";
            case 2:
                return "Diagnóstico";
            case 3:
                return "Mantenimiento";
            default:
                return "No especificado";
        }
    };

    const getPriorityLabel = (priority?: number) => {
        switch (priority) {
            case 1:
                return "Baja";
            case 2:
                return "Media";
            case 3:
                return "Alta";
            default:
                return "No especificada";
        }
    };

    const getDeviceTypeLabel = (type?: number) => {
        switch (type) {
            case 1:
                return "Smartphone";
            case 2:
                return "Laptop";
            case 3:
                return "Tablet";
            case 4:
                return "Smartwatch";
            default:
                return "No especificado";
        }
    };

    const getBrandLabel = (brand?: number) => {
        switch (brand) {
            case 1:
                return "Apple";
            case 2:
                return "Lenovo";
            case 3:
                return "Samsung";
            case 4:
                return "Xiaomi";
            default:
                return "No especificada";
        }
    };

    const getIssueTypeLabel = (type?: number) => {
        switch (type) {
            case 1:
                return "Hardware";
            case 2:
                return "Software";
            case 3:
                return "Red/Conectividad";
            case 4:
                return "Rendimiento";
            default:
                return "No especificado";
        }
    };

    const getSeverityLabel = (severity?: number) => {
        switch (severity) {
            case 1:
                return "Crítica";
            case 2:
                return "Alta";
            case 3:
                return "Normal";
            case 4:
                return "Baja";
            default:
                return "No especificada";
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', backgroundColor: '#fff' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px', borderBottom: '2px solid #e5e7eb', paddingBottom: '16px' }}>
                <Text variant="h3" weight="bold" style={{ color: '#1f2937', marginBottom: '8px' }}>
                    Resumen de Orden de Servicio
                </Text>
                <Text variant="body2" color="secondary">
                    {getServiceTypeLabel(formData?.serviceType)} - {getPriorityLabel(formData?.priority)}
                </Text>
            </div>

            {/* Cliente y Dispositivo */}
            <Row $gap="lg" fullWidth style={{ marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '16px' }}>
                        <Row $align="center" $gap="sm" style={{ marginBottom: '12px' }}>
                            <FiUser size={18} color="#3b82f6" />
                            <Text weight="semibold" variant="body1">Cliente</Text>
                        </Row>
                        <div style={{ paddingLeft: '26px' }}>
                            <Text weight="semibold" style={{ marginBottom: '4px' }}>
                                {formData?.customer_data?.customer_name || "No especificado"}
                            </Text>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <Text variant="body2" color="secondary">
                                    📧 {formData?.customer_data?.customer_email || "No especificado"}
                                </Text>
                                <Text variant="body2" color="secondary">
                                    📱 {formData?.customer_data?.customer_phone || "No especificado"}
                                </Text>
                                <Text variant="body2" color="secondary">
                                    📍 {formData?.customer_data?.customer_city || "No especificada"}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '16px' }}>
                        <Row $align="center" $gap="sm" style={{ marginBottom: '12px' }}>
                            <FiSmartphone size={18} color="#f59e0b" />
                            <Text weight="semibold" variant="body1">Dispositivo</Text>
                        </Row>
                        <div style={{ paddingLeft: '26px' }}>
                            <Text weight="semibold" style={{ marginBottom: '4px' }}>
                                {formData?.device_data?.device_name || "No especificado"}
                            </Text>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <Text variant="body2" color="secondary">
                                    🏷️ {getDeviceTypeLabel(formData?.device_data?.device_type)} - {getBrandLabel(formData?.device_data?.device_brand)}
                                </Text>
                                <Text variant="body2" color="secondary">
                                    🔢 S/N: {formData?.device_data?.serial_number || "N/A"}
                                </Text>
                                <Text variant="body2" color="secondary">
                                    📟 IMEI: {formData?.device_data?.imei || "N/A"}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>

            <Divider style={{ margin: '24px 0' }} />

            {/* Problemas */}
            <div style={{ marginBottom: '24px' }}>
                <Row $align="center" $gap="sm" style={{ marginBottom: '16px' }}>
                    <FiAlertTriangle size={18} color="#ef4444" />
                    <Text weight="semibold" variant="body1">Problemas Reportados ({formData?.issues?.length || 0})</Text>
                </Row>
                {formData?.issues && formData.issues.length > 0 ? (
                    <div style={{ paddingLeft: '26px' }}>
                        {formData.issues.map((issue, index) => (
                            <div key={index} style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                                <Row $justify="space-between" $align="center" style={{ marginBottom: '12px' }}>
                                    <Text weight="semibold" variant="body1">🔧 Problema {index + 1}</Text>
                                    <span style={{ 
                                        padding: '6px 12px', 
                                        borderRadius: '16px', 
                                        fontSize: '12px', 
                                        fontWeight: '600',
                                        backgroundColor: issue.issue_severity === 1 ? '#fee2e2' : issue.issue_severity === 2 ? '#fef3c7' : '#f3f4f6',
                                        color: issue.issue_severity === 1 ? '#dc2626' : issue.issue_severity === 2 ? '#d97706' : '#6b7280'
                                    }}>
                                        {getSeverityLabel(issue.issue_severity)}
                                    </span>
                                </Row>
                                <div style={{ marginBottom: '8px' }}>
                                    <Text variant="body2" color="secondary" style={{ fontWeight: '500' }}>
                                        📋 Tipo: <span style={{ fontWeight: '400' }}>{getIssueTypeLabel(issue.issue_type)}</span>
                                    </Text>
                                </div>
                                {issue.issue_description && (
                                    <div style={{ marginTop: '8px', padding: '8px', backgroundColor: '#ffffff', borderRadius: '4px' }}>
                                        <Text variant="body2" color="secondary" style={{ lineHeight: '1.5' }}>
                                            💬 {issue.issue_description}
                                        </Text>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Text variant="body2" color="secondary" style={{ paddingLeft: '26px' }}>No se han reportado problemas</Text>
                )}
            </div>

            <Divider style={{ margin: '24px 0' }} />

            {/* Costos y Tiempo */}
            <Row $gap="lg" fullWidth>
                <div style={{ flex: 1 }}>
                    <Row $align="center" $gap="sm" style={{ marginBottom: '16px' }}>
                        <FiDollarSign size={18} color="#10b981" />
                        <Text weight="semibold" variant="body1">Costos</Text>
                    </Row>
                    <div style={{ paddingLeft: '26px' }}>
                        <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
                            <div style={{ marginBottom: '8px' }}>
                                <Row $justify="space-between">
                                    <Text variant="body2">👨‍🔧 Mano de Obra:</Text>
                                    <Text variant="body2" weight="semibold">
                                        {formData?.cost_info?.currency || "$"} {formData?.cost_info?.labor_cost || "0.00"}
                                    </Text>
                                </Row>
                            </div>
                            <div style={{ marginBottom: '8px' }}>
                                <Row $justify="space-between">
                                    <Text variant="body2">🔧 Partes:</Text>
                                    <Text variant="body2" weight="semibold">
                                        {formData?.cost_info?.currency || "$"} {formData?.cost_info?.parts_cost || "0.00"}
                                    </Text>
                                </Row>
                            </div>
                        </div>
                        <Row $justify="space-between" style={{ padding: '8px 0', borderTop: '2px solid #e5e7eb' }}>
                            <Text weight="bold" variant="body1">💰 Total:</Text>
                            <Text weight="bold" style={{ fontSize: '20px', color: '#10b981' }}>
                                {formData?.cost_info?.currency || "$"} {formData?.cost_info?.estimated_cost || "0.00"}
                            </Text>
                        </Row>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <Row $align="center" $gap="sm" style={{ marginBottom: '16px' }}>
                        <FiClock size={18} color="#8b5cf6" />
                        <Text weight="semibold" variant="body1">Tiempo</Text>
                    </Row>
                    <div style={{ paddingLeft: '26px' }}>
                        <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '6px' }}>
                            <div style={{ marginBottom: '12px' }}>
                                <Text variant="body2" color="secondary" style={{ marginBottom: '4px' }}>⏱️ Duración estimada:</Text>
                                <Text weight="semibold" variant="body1" style={{ color: '#8b5cf6' }}>
                                    {formData?.timeline?.estimated_hours || "0"} horas
                                </Text>
                            </div>
                            <div>
                                <Text variant="body2" color="secondary" style={{ marginBottom: '4px' }}>📅 Fecha de entrega:</Text>
                                <Text weight="semibold" variant="body1" style={{ color: '#8b5cf6' }}>
                                    {formData?.timeline?.estimated_completion || "No especificada"}
                                </Text>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>

            {formData?.description && (
                <>
                    <Divider style={{ margin: '24px 0' }} />
                    <div>
                        <Row $align="center" $gap="sm" style={{ marginBottom: '12px' }}>
                            <FiFileText size={18} color="#6b7280" />
                            <Text weight="semibold" variant="body1">Notas Adicionales</Text>
                        </Row>
                        <div style={{ paddingLeft: '26px' }}>
                            <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                <Text variant="body2" color="secondary" style={{ lineHeight: '1.6', fontStyle: 'italic' }}>
                                    📝 {formData.description}
                                </Text>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
