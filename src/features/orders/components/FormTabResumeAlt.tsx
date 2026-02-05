import { Column, Row, Text, Label, Divider, Card, Grid, Container, Heading, Flex } from "../../../shared/components";
import { FiUser, FiSmartphone, FiAlertTriangle, FiDollarSign, FiClock, FiFileText } from "react-icons/fi";

interface FormProps {
    formData: any;
}

export const FormTabResumeAlt = ({ formData }: FormProps) => {
    const getServiceTypeLabel = (type?: number) => {
        switch (type) {
            case 1: return "Reparación";
            case 2: return "Diagnóstico";
            case 3: return "Mantenimiento";
            default: return "No especificado";
        }
    };

    const getPriorityLabel = (priority?: number) => {
        switch (priority) {
            case 1: return "Baja";
            case 2: return "Media";
            case 3: return "Alta";
            default: return "No especificada";
        }
    };

    const getDeviceTypeLabel = (type?: number) => {
        switch (type) {
            case 1: return "Smartphone";
            case 2: return "Laptop";
            case 3: return "Tablet";
            case 4: return "Smartwatch";
            default: return "No especificado";
        }
    };

    const getBrandLabel = (brand?: number) => {
        switch (brand) {
            case 1: return "Apple";
            case 2: return "Lenovo";
            case 3: return "Samsung";
            case 4: return "Xiaomi";
            default: return "No especificada";
        }
    };

    const getIssueTypeLabel = (type?: number) => {
        switch (type) {
            case 1: return "Hardware";
            case 2: return "Software";
            case 3: return "Red/Conectividad";
            case 4: return "Rendimiento";
            default: return "No especificado";
        }
    };

    const getSeverityLabel = (severity?: number) => {
        switch (severity) {
            case 1: return "Crítica";
            case 2: return "Alta";
            case 3: return "Normal";
            case 4: return "Baja";
            default: return "No especificada";
        }
    };

    return (
        <Flex align="center" justify="center" fullWidth>
            <Card variant="default" size="lg">
                <Column gap="lg" fullWidth>
                    {/* Header estilo factura */}
                    <Column gap="md" align="center">
                        <Heading level="h2" align="center">ORDEN DE SERVICIO</Heading>
                        <Divider />
                        <Text variant="body1" align="center" color="primary">
                            {getServiceTypeLabel(formData?.serviceType)} • Prioridad: {getPriorityLabel(formData?.priority)}
                        </Text>
                    </Column>

                    {/* Grid de información */}
                    <Grid columns={2} gap="lg">
                        {/* Cliente */}
                        <Column gap="md">
                            <Row $align="center" $gap="sm">
                                <FiUser size={18} color="#3b82f6" />
                                <Heading level="h6">INFORMACIÓN DEL CLIENTE</Heading>
                            </Row>
                            <Column gap="xs">
                                <Row $justify="space-between">
                                    <Label>Nombre:</Label>
                                    <Text weight="semibold">{formData?.customer_data?.customer_name || "No especificado"}</Text>
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
                            </Column>
                        </Column>

                        {/* Dispositivo */}
                        <Column gap="md">
                            <Row $align="center" $gap="sm">
                                <FiSmartphone size={18} color="#f59e0b" />
                                <Heading level="h6">INFORMACIÓN DEL DISPOSITIVO</Heading>
                            </Row>
                            <Column gap="xs">
                                <Row $justify="space-between">
                                    <Label>Nombre:</Label>
                                    <Text weight="semibold">{formData?.device_data?.device_name || "No especificado"}</Text>
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
                                    <Label>S/N:</Label>
                                    <Text>{formData?.device_data?.serial_number || "N/A"}</Text>
                                </Row>
                            </Column>
                        </Column>
                    </Grid>

                    <Divider />

                    {/* Problemas */}
                    <Column gap="md">
                        <Row $align="center" $gap="sm">
                            <FiAlertTriangle size={18} color="#ef4444" />
                            <Heading level="h6">PROBLEMAS REPORTADOS ({formData?.issues?.length || 0})</Heading>
                        </Row>
                        {formData?.issues && formData.issues.length > 0 ? (
                            <Column gap="sm">
                                {formData.issues.map((issue, index) => (
                                    <Row key={index} $justify="space-between" $align="start" style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                                        <Column gap="xs" style={{ flex: 1 }}>
                                            <Text weight="semibold">#{index + 1} - {getIssueTypeLabel(issue.issue_type)}</Text>
                                            {issue.issue_description && (
                                                <Text variant="body2" color="secondary">
                                                    {issue.issue_description}
                                                </Text>
                                            )}
                                        </Column>
                                        <span style={{ 
                                            padding: '4px 12px', 
                                            borderRadius: '12px', 
                                            fontSize: '12px', 
                                            fontWeight: '600',
                                            backgroundColor: issue.issue_severity === 1 ? '#fee2e2' : issue.issue_severity === 2 ? '#fef3c7' : '#f3f4f6',
                                            color: issue.issue_severity === 1 ? '#dc2626' : issue.issue_severity === 2 ? '#d97706' : '#6b7280',
                                            whiteSpace: 'nowrap'
                                        }}>
                                            {getSeverityLabel(issue.issue_severity)}
                                        </span>
                                    </Row>
                                ))}
                            </Column>
                        ) : (
                            <Text color="secondary" align="center">No se han reportado problemas</Text>
                        )}
                    </Column>

                    <Divider />

                    {/* Costos y Tiempo */}
                    <Grid columns={2} gap="lg">
                        {/* Costos */}
                        <Column gap="md">
                            <Row $align="center" $gap="sm">
                                <FiDollarSign size={18} color="#10b981" />
                                <Heading level="h6">COSTOS ESTIMADOS</Heading>
                            </Row>
                            <Column gap="xs">
                                <Row $justify="space-between">
                                    <Label>Mano de Obra:</Label>
                                    <Text weight="semibold">{formData?.cost_info?.currency || "$"} {formData?.cost_info?.labor_cost || "0.00"}</Text>
                                </Row>
                                <Row $justify="space-between">
                                    <Label>Partes:</Label>
                                    <Text>{formData?.cost_info?.currency || "$"} {formData?.cost_info?.parts_cost || "0.00"}</Text>
                                </Row>
                                <Divider />
                                <Row $justify="space-between" style={{ padding: '8px', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
                                    <Text weight="bold">TOTAL:</Text>
                                    <Text weight="bold" style={{ fontSize: '20px', color: '#10b981' }}>
                                        {formData?.cost_info?.currency || "$"} {formData?.cost_info?.estimated_cost || "0.00"}
                                    </Text>
                                </Row>
                            </Column>
                        </Column>

                        {/* Tiempo */}
                        <Column gap="md">
                            <Row $align="center" $gap="sm">
                                <FiClock size={18} color="#8b5cf6" />
                                <Heading level="h6">TIEMPO ESTIMADO</Heading>
                            </Row>
                            <Column gap="xs">
                                <Row $justify="space-between">
                                    <Label>Duración:</Label>
                                    <Text weight="semibold" style={{ color: '#8b5cf6' }}>
                                        {formData?.timeline?.estimated_hours || "0"} horas
                                    </Text>
                                </Row>
                                <Row $justify="space-between">
                                    <Label>Entrega:</Label>
                                    <Text weight="semibold" style={{ color: '#8b5cf6' }}>
                                        {formData?.timeline?.estimated_completion || "No especificada"}
                                    </Text>
                                </Row>
                            </Column>
                        </Column>
                    </Grid>


                    {formData?.description && (
                        <>
                            <Divider />
                            <Column gap="md">
                                <Row $align="center" $gap="sm">
                                    <FiFileText size={18} color="#6b7280" />
                                    <Heading level="h6">NOTAS ADICIONALES</Heading>
                                </Row>
                                <Text variant="body2" color="secondary" italic style={{ padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                    {formData.description}
                                </Text>
                            </Column>
                        </>
                    )}
                </Column>
            </Card>
        </Flex>
    );
};