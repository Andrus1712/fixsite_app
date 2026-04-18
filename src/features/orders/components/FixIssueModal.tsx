import { useEffect, useState } from "react";
import { Badge, Button, Flex, FormGroup, Modal, useToast } from "../../../shared/components";
import type { Issue } from "../models/ApiModel";
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
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedIssues: Issue[] | null;
    orderTypeId: number;
    orderId: number;
}) => {
    const { showSuccess, showError } = useToast();
    const [searchValue, setSearchValue] = useState("");
    const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
    const [availableServices, setAvailableServices] = useState<AvailableService[]>([]);

    const [getServicesAvailable, { isLoading }] = useGetServicesAvailableMutation();
    const [createOrderService, { isLoading: isSaving }] = useCreateOrderServiceMutation();

    useEffect(() => {
        if (!isOpen || !selectedIssues?.length) return;
        const issueIds = selectedIssues.map((issue) => issue.id);
        getServicesAvailable({ orderTypeId, issueIds })
            .unwrap()
            .then((response) => setAvailableServices(response.data))
            .catch(console.error);
    }, [isOpen, selectedIssues, orderTypeId, getServicesAvailable]);

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
                        precio: s.precio_override ?? Number(s.precio),
                        tiempo_estimado_minutos: s.tiempo_override ?? s.tiempoEstimadoMinutos,
                        notas: s.notas,
                        activo: true,
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
                                {issue.failure_codes_code} - {issue.failure_codes_name}
                            </Badge>
                        ))}
                    </Flex>
                </FormGroup>
                <FormGroup title="Servicio efectuado">
                    <ServicesEffected
                        services={availableServices}
                        selected={selectedServices}
                        isLoading={isLoading}
                        onSearch={setSearchValue}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                </FormGroup>
            </Flex>
        </Modal>
    );
};

export default FixIssueModal;
