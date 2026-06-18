import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Badge, Button, Flex, FormGroup, Modal, useToast } from "../../../shared/components";
import type { OrderIssue } from "../models/OrderModel";
import { useGetServicesAvailableMutation, useCreateOrderServiceMutation } from "../../orders-services/services/OrdersServicesApi";
import { ServicesEffected } from "../../orders-services/components/ServicesEffected";
import type { SelectedService } from "../../orders-services/components/ServicesEffected";
import type { AvailableService } from "../../orders-services/models/OrderServiceModel";
import AssignServiceParts from "./AssignServiceParts";
import styled from "styled-components";
import { assignmentPartsDefaultValues, AssignmentPartsSchema, type AssignmentPartsFormData } from "../../service-articles/schemas";
import StockErrorTable from "../../service-articles/components/StockErrorTable";

// ─── Styled Components ────────────────────────────────────────────────────────

const InlineError = styled.p<{ $withBorder?: boolean }>`
    margin: 0;
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.sm};
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.error};
    background-color: ${(props) => props.theme.colors.errorLight};
    border-radius: ${(props) => props.theme.borderRadius.md};
    border: 1px solid ${(props) => props.theme.colors.error};
`;

// ─── Types ────────────────────────────────────────────────────────────────────

interface StockError {
    article_id: number;
    required: number;
    available: number;
}

interface ApiErrorResponse {
    data?: {
        message?: string;
        errors?: StockError[];
    };
    status?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

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

    // Stock error state
    const [stockErrors, setStockErrors] = useState<StockError[]>([]);
    const [inlineError, setInlineError] = useState<string | null>(null);
    const [storeFieldError, setStoreFieldError] = useState<string | null>(null);
    const [articleFieldError, setArticleFieldError] = useState<string | null>(null);
    const [duplicateError, setDuplicateError] = useState<string | null>(null);

    const [getServicesAvailable, { isLoading }] = useGetServicesAvailableMutation();
    const [createOrderService, { isLoading: isSaving }] = useCreateOrderServiceMutation();

    // Parts form for services that require articles
    const {
        control: partsControl,
        formState: { errors: partsErrors },
        setValue: partsSetValue,
        watch: partsWatch,
        trigger: partsTrigger,
        reset: partsReset,
        getValues: partsGetValues,
    } = useForm<AssignmentPartsFormData>({
        resolver: zodResolver(AssignmentPartsSchema),
        defaultValues: assignmentPartsDefaultValues,
    });

    // Determine if any selected service requires articles
    const serviceRequiringArticles = useMemo(() => {
        return selectedServices.find((s) => {
            const available = availableServices.find((a) => a.service_id === s.service_id);
            return available?.requires_articles === true;
        });
    }, [selectedServices, availableServices]);

    const requiresArticlesServiceId = serviceRequiringArticles?.service_id ?? 0;
    const requiresArticles = !!serviceRequiringArticles;

    // Watch parts for article names map
    const currentParts = partsWatch("parts");

    // Build article names map for stock error table
    const articleNamesMap = useMemo(() => {
        const map = new Map<number, string>();
        currentParts.forEach((part) => {
            map.set(part.article_id, part.article_name);
        });
        return map;
    }, [currentParts]);

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
        clearApiErrors();
    };

    const handleRemove = (serviceId: number) => {
        setSelectedServices((prev) => prev.filter((s) => s.service_id !== serviceId));
        // If removing the service that requires articles, reset parts form
        if (serviceId === requiresArticlesServiceId) {
            partsReset(assignmentPartsDefaultValues);
            clearApiErrors();
        }
    };

    const clearApiErrors = () => {
        setStockErrors([]);
        setInlineError(null);
        setStoreFieldError(null);
        setArticleFieldError(null);
        setDuplicateError(null);
    };

    const handleSave = async () => {
        if (!selectedServices.length) {
            showError("Agrega al menos un servicio antes de guardar", "Sin servicios");
            return;
        }

        // Clear previous API errors before retry
        clearApiErrors();

        // If a selected service requires articles, validate the parts form
        if (requiresArticles) {
            const isPartsValid = await partsTrigger();
            if (!isPartsValid) {
                return;
            }
        }

        try {
            const partsFormData = partsGetValues();

            await Promise.all(
                selectedServices.map((s) => {
                    const available = availableServices.find((a) => a.service_id === s.service_id);
                    const serviceRequiresParts = available?.requires_articles === true;

                    const payload: Parameters<typeof createOrderService>[0] = {
                        order_id: orderId,
                        service_id: s.service_id,
                        price: s.price_override ?? s.price,
                        estimated_minutes: s.estimated_minutes_override ?? s.estimatedMinutes,
                        notes: s.notes,
                        order_code: orderCode,
                        issue_ids: selectedIssues?.map((i) => i.id) ?? [],
                    };

                    // Include parts data if service requires articles
                    if (serviceRequiresParts) {
                        payload.store_id = partsFormData.store_id;
                        payload.parts = partsFormData.parts.map((p) => ({
                            article_id: p.article_id,
                            quantity: p.quantity,
                        }));
                    }

                    return createOrderService(payload).unwrap();
                })
            );
            showSuccess("Servicios guardados correctamente");
            handleClose();
        } catch (error: unknown) {
            handleApiError(error);
        }
    };

    const handleApiError = (error: unknown) => {
        const apiError = error as ApiErrorResponse;
        const message = apiError?.data?.message ?? "";
        const status = apiError?.status;

        if (status === 400) {
            // Stock insufficient error
            if (message === "Stock insuficiente para completar la solicitud" && apiError.data?.errors) {
                setStockErrors(apiError.data.errors);
                return;
            }

            // Article not permitted
            if (message.match(/El artículo \d+ no está permitido para este servicio/)) {
                setArticleFieldError(message);
                return;
            }

            // Store inactive/missing
            if (message.match(/El almacén con ID \d+ no existe o está inactivo/)) {
                setStoreFieldError(message);
                return;
            }

            // Duplicate articles
            if (message === "No se permiten artículos duplicados en la misma solicitud") {
                setDuplicateError(message);
                return;
            }

            // Other 400 errors
            setInlineError(message || "Error de validación en la solicitud.");
            return;
        }

        // Generic error for non-400 statuses
        showError("Error al guardar los servicios. Intenta nuevamente.", "Error");
    };

    const handleClose = () => {
        setSelectedServices([]);
        setAvailableServices([]);
        partsReset(assignmentPartsDefaultValues);
        clearApiErrors();
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
                    <Flex $wrap="wrap" $gap="xs">
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

                {/* Conditional parts section for services requiring articles */}
                {requiresArticles && (
                    <FormGroup title="Partes requeridas">
                        {/* Inline error: duplicate articles */}
                        {duplicateError && (
                            <InlineError>{duplicateError}</InlineError>
                        )}

                        {/* Store field error from API */}
                        {storeFieldError && (
                            <InlineError>{storeFieldError}</InlineError>
                        )}

                        {/* Article field error from API */}
                        {articleFieldError && (
                            <InlineError>{articleFieldError}</InlineError>
                        )}

                        {/* Generic inline error */}
                        {inlineError && (
                            <InlineError>{inlineError}</InlineError>
                        )}

                        <AssignServiceParts
                            serviceId={requiresArticlesServiceId}
                            ListArticles={selectedServices[0].services_articles}
                            requiresArticles={requiresArticles}
                            control={partsControl}
                            errors={partsErrors}
                            setValue={partsSetValue}
                            watch={partsWatch}
                        />

                        {/* Stock error table */}
                        {stockErrors.length > 0 && (
                            <StockErrorTable
                                errors={stockErrors}
                                articleNames={articleNamesMap}
                            />
                        )}
                    </FormGroup>
                )}
            </Flex>
        </Modal>
    );
};

export default FixIssueModal;
