import { useEffect, useState } from "react";
import { Badge, Button, Flex, FormGroup, Modal, useToast } from "../../../shared/components";
import type { OrderIssue } from "../models/OrderModel";
import { useGetServicesAvailableMutation, useCreateOrderServiceMutation } from "../../orders-services/services/OrdersServicesApi";
import { ServicesEffected } from "../../orders-services/components/ServicesEffected";
import type { SelectedService } from "../../orders-services/components/ServicesEffected";
import type { AvailableService } from "../../orders-services/models/OrderServiceModel";

const FixIssueModal = ({
    isOpen,
    onClose,
    selectedIssues,
    orderTypeId,
    orderId,
    orderCode,
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedIssues: OrderIssue[] | null;
    orderTypeId: number;
    orderId: number;
    orderCode: string;
}) => {
    const { showSuccess, showError } = useToast();
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);

    const [getServicesAvailable, { isLoading }] = useGetServicesAvailableMutation();
    const [createOrderService, { isLoading: isSaving }] = useCreateOrderServiceMutation();

    useEffect(() => {
        if (!isOpen || !selectedIssues?.length) return;
        const orderIssueIds = selectedIssues.map((issue) => issue.id);
        getServicesAvailable({ orderTypeId, orderIssueIds, orderId })
            .unwrap()
            .then((response) => setAvailableServices(response.data))
            .catch(console.error);
    }, [isOpen, selectedIssues, orderTypeId, getServicesAvailable, orderId]);

    const handleAdd = (service: SelectedService) => {
        setSelectedServices((prev) => [...prev, service]);
    };

    const handleRemove = (serviceId: number) => {
        setSelectedServices((prev) => prev.filter((s) => s.service_id !== serviceId));
    };

    const handleSave = async () => {
        if (!selectedServices.length) {
            showError("Agrega al menos un servicio antes de guardar", "Sin servicios");
            return;
        }
        try {
            await Promise.all(
                selectedServices.map((s) =>
                    createOrderService({
                        order_id: orderId,
                        service_id: s.service_id,
                        price: s.price_override ?? s.price,
                        estimated_minutes: s.estimated_minutes_override ?? s.estimatedMinutes,
                        notes: s.notes,
                        order_code: orderCode,
                        issue_ids: selectedIssues?.map((i) => i.id) ?? [],
                    }).unwrap()
                )
            );
            showSuccess("Servicios guardados correctamente");
            handleClose();
        } catch {
            showError("Error al guardar los servicios. Intenta nuevamente.", "Error");
        }
    };

    const handleClose = () => {
        setSelectedServices([]);
        setAvailableServices([]);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Registrar servicio efectuado"
            size="lg"
            footer={
                <>
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        loading={isSaving}
                        disabled={!selectedServices.length}
                    >
                        Guardar
                    </Button>
                </>
            }
        >
            <Flex gap={"lg"} direction="column">
                <FormGroup title="Fallas Seleccionadas">
                    <Flex $wrap $gap="xs">
                        {selectedIssues?.map((issue) => (
                            <Badge variant="outline" key={issue.id}>
                                {issue.failure_code} - {issue.failure_code_name}
                            </Badge>
                        ))}
                    </Flex>
                </FormGroup>
                <FormGroup title="Servicio efectuado">
                    <ServicesEffected
                        services={availableServices}
                        selected={selectedServices}
                        isLoading={isLoading}
                        onSearch={() => { }}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                </FormGroup>
            </Flex>
        </Modal>
    );
};

export default FixIssueModal;
