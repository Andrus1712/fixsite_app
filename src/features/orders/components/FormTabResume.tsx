import { Card, Column, Row, Text, Label, Divider, CollapsibleCard, Button } from "../../../shared/components";
import { FiUser, FiSmartphone, FiAlertTriangle, FiDollarSign, FiClock } from "react-icons/fi";

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
        <Column gap={"lg"} fullWidth>
            {/* Información del Servicio */}
            <Card variant="outlined" size="md">
                <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                    <FiAlertTriangle size={20} color="#3b82f6" />
                    <Text weight="semibold" variant="body2">
                        Información del Servicio
                    </Text>
                </Row>
                <Column gap={"sm"}>
                    <Row $justify="space-between">
                        <Label>Tipo de Servicio:</Label>
                        <Text>{getServiceTypeLabel(formData?.serviceType)}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Prioridad:</Label>
                        <Text>{getPriorityLabel(formData?.priority)}</Text>
                    </Row>
                    {formData?.description && (
                        <>
                            <Label>Descripción:</Label>
                            <Text variant="body2" color="secondary">
                                {formData.description}
                            </Text>
                        </>
                    )}
                </Column>
            </Card>

            {/* Información del Cliente */}
            <Card variant="outlined" size="md">
                <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                    <FiUser size={20} color="#10b981" />
                    <Text weight="semibold" variant="body2">
                        Información del Cliente
                    </Text>
                </Row>
                <Column gap={"sm"}>
                    <Row $justify="space-between">
                        <Label>Nombre:</Label>
                        <Text>{formData?.customer_data?.customer_name || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Email:</Label>
                        <Text>{formData?.customer_data?.customer_email || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Teléfono:</Label>
                        <Text>{formData?.customer_data?.customer_phone || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Ciudad:</Label>
                        <Text>{formData?.customer_data?.customer_city || "No especificada"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Tipo de Cliente:</Label>
                        <Text>{formData?.customer_data?.customer_type || "No especificado"}</Text>
                    </Row>
                </Column>
            </Card>

            {/* Información del Dispositivo */}
            <Card variant="outlined" size="md">
                <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                    <FiSmartphone size={20} color="#f59e0b" />
                    <Text weight="semibold" variant="body2">
                        Información del Dispositivo
                    </Text>
                </Row>
                <Column gap={"sm"}>
                    <Row $justify="space-between">
                        <Label>Nombre:</Label>
                        <Text>{formData?.device_data?.device_name || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Tipo:</Label>
                        <Text>{getDeviceTypeLabel(formData?.device_data?.device_type)}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Marca:</Label>
                        <Text>{getBrandLabel(formData?.device_data?.device_brand)}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Número de Serie:</Label>
                        <Text>{formData?.device_data?.serial_number || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>IMEI:</Label>
                        <Text>{formData?.device_data?.imei || "No especificado"}</Text>
                    </Row>
                    <Row $justify="space-between">
                        <Label>Año del Modelo:</Label>
                        <Text>{formData?.device_data?.model_year || "No especificado"}</Text>
                    </Row>
                </Column>
            </Card>

            {/* Problemas Reportados */}
            <Card variant="outlined" size="md">
                <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                    <FiAlertTriangle size={20} color="#ef4444" />
                    <Text weight="semibold" variant="body2">
                        Problemas Reportados ({formData?.issues?.length || 0})
                    </Text>
                </Row>
                <Column gap={"md"}>
                    {formData?.issues && formData.issues.length > 0 ? (
                        formData.issues.map((issue, index) => (
                            <CollapsibleCard
                                key={index}
                                title={`Problema ${index + 1}`}
                                badge={{
                                    text: getSeverityLabel(issue.severity),
                                    variant:
                                        issue.severity === 1
                                            ? "critica"
                                            : issue.severity === 2
                                            ? "alta"
                                            : issue.severity === 3
                                            ? "media"
                                            : "baja",
                                }}
                                defaultExpanded={false}
                            >
                                <Column gap={"sm"}>
                                    <Row $justify="space-between">
                                        <Label>Tipo:</Label>
                                        <Text>{getIssueTypeLabel(issue.issueType)}</Text>
                                    </Row>
                                    <Row $justify="space-between">
                                        <Label>Severidad:</Label>
                                        <Text>{getSeverityLabel(issue.severity)}</Text>
                                    </Row>
                                    {issue.description && (
                                        <>
                                            <Label>Descripción:</Label>
                                            <Text variant="body2" color="secondary">
                                                {issue.description}
                                            </Text>
                                        </>
                                    )}
                                    {issue.steps && (
                                        <>
                                            <Label>Pasos para Reproducir:</Label>
                                            <Text variant="body2" color="secondary">
                                                {issue.steps}
                                            </Text>
                                        </>
                                    )}
                                </Column>
                            </CollapsibleCard>
                        ))
                    ) : (
                        <Text color="secondary">No se han reportado problemas</Text>
                    )}
                </Column>
            </Card>

            {/* Información de Costos */}
            <Row $gap={"lg"} fullWidth>
                <Card variant="outlined" size="md" style={{ flex: 1 }}>
                    <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                        <FiDollarSign size={20} color="#10b981" />
                        <Text weight="semibold" variant="body2">
                            Costos Estimados
                        </Text>
                    </Row>
                    <Column gap={"sm"}>
                        <Row $justify="space-between">
                            <Label>Costo Total:</Label>
                            <Text weight="semibold">
                                {formData?.cost_info?.currency || "$"} {formData?.cost_info?.estimated_cost || "0.00"}
                            </Text>
                        </Row>
                        <Row $justify="space-between">
                            <Label>Mano de Obra:</Label>
                            <Text>
                                {formData?.cost_info?.currency || "$"} {formData?.cost_info?.labor_cost || "0.00"}
                            </Text>
                        </Row>
                        <Row $justify="space-between">
                            <Label>Partes:</Label>
                            <Text>
                                {formData?.cost_info?.currency || "$"} {formData?.cost_info?.parts_cost || "0.00"}
                            </Text>
                        </Row>
                    </Column>
                </Card>

                <Card variant="outlined" size="md" style={{ flex: 1 }}>
                    <Row $align="center" $gap={"sm"} style={{ marginBottom: "16px" }}>
                        <FiClock size={20} color="#8b5cf6" />
                        <Text weight="semibold" variant="body2">
                            Tiempo Estimado
                        </Text>
                    </Row>
                    <Column gap={"sm"}>
                        <Row $justify="space-between">
                            <Label>Fecha de Finalización:</Label>
                            <Text>{formData?.timeline?.estimated_completion || "No especificada"}</Text>
                        </Row>
                        <Row $justify="space-between">
                            <Label>Horas Estimadas:</Label>
                            <Text>{formData?.timeline?.estimated_hours || "0"} horas</Text>
                        </Row>
                    </Column>
                </Card>
            </Row>
        </Column>
    );
};
