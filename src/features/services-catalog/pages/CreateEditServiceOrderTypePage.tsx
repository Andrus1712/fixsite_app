import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Box,
    Button,
    Container,
    Flex,
    Input,
    Switch,
    FormGroup,
    SearchableSelect,
    Label,
    useToast,
} from "../../../shared/components";
import {
    useCreateServiceOrderTypeMutation,
    useUpdateServiceOrderTypeMutation,
    useGetServiceOrderTypeByIdQuery,
    useGetOrderTypesListQuery,
    type CreateServiceOrderTypeDto,
} from "../services/ServiceOrderTypesApi";
import { useGetAllServicesQuery } from "../services/ServicesApi";
import { useGetAllFailureCodesQuery } from "../../maintenance/services/FailureCodesApi";
import {
    ServiceOrderTypeSchema,
    type ServiceOrderTypeFormData,
    serviceOrderTypeDefaultValues,
} from "../schemas";
import { useNavigate, useParams } from "react-router";

const CreateEditServiceOrderTypePage = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = Boolean(id);

    const { data: record, isLoading: isLoadingRecord } = useGetServiceOrderTypeByIdQuery(
        Number(id),
        { skip: !isEditing }
    );

    const { data: services = [] } = useGetAllServicesQuery();
    const { data: orderTypes = [] } = useGetOrderTypesListQuery();
    const { data: failureCodes = [] } = useGetAllFailureCodesQuery();

    const [createServiceOrderType] = useCreateServiceOrderTypeMutation();
    const [updateServiceOrderType] = useUpdateServiceOrderTypeMutation();

    const { showSuccess, showError } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ServiceOrderTypeFormData>({
        resolver: zodResolver(ServiceOrderTypeSchema),
        defaultValues: serviceOrderTypeDefaultValues,
    });

    const activoValue = watch("is_active");
    const serviceIdValue = watch("service_id");
    const orderTypeIdValue = watch("order_type_id");
    const issueIdValue = watch("failure_code_id");

    useEffect(() => {
        if (isEditing && record) {
            reset({
                service_id: record.service.id,
                order_type_id: record.orderType.id,
                failure_code_id: record.failureCode?.id ?? null,
                price: record.price,
                estimated_minutes: record.estimatedMinutes,
                is_active: record.is_active,
            });
        }
    }, [isEditing, record, reset]);

    const onSubmit = async (formData: ServiceOrderTypeFormData) => {
        const dto: CreateServiceOrderTypeDto = {
            service_id: formData.service_id,
            order_type_id: formData.order_type_id,
            failure_code_id: formData.failure_code_id ?? null,
            price: formData.price,
            estimated_minutes: formData.estimated_minutes,
            is_active: formData.is_active,
        };

        try {
            if (isEditing && id) {
                const result = await updateServiceOrderType({ id: Number(id), data: dto });
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al actualizar el registro.");
                } else {
                    showSuccess("Registro actualizado exitosamente.");
                    navigate(-1);
                }
            } else {
                const result = await createServiceOrderType(dto);
                if (result.error) {
                    showError((result.error as any)?.data?.message || "Error al crear el registro.");
                } else {
                    showSuccess("Registro creado exitosamente.");
                    navigate(-1);
                }
            }
        } catch {
            showError("Error inesperado al procesar el registro.");
        }
    };

    const serviceOptions = services.map((s) => ({ value: s.id, label: `[${s.code}] ${s.description}` }));
    const orderTypeOptions = orderTypes.map((o) => ({ value: o.id, label: `[${o.codigo}] ${o.descripcion}` }));
    const failureCodeOptions = failureCodes.map((f) => ({ value: f.id, label: `[${f.code}] ${f.name}` }));

    if (isEditing && isLoadingRecord) {
        return null;
    }

    return (
        <Container size="full" center>
            <Box
                p="lg"
                bg="white"
                rounded
                shadow
                $fullWidth
                title={isEditing ? "Editar vinculación" : "Nueva vinculación"}
                subtitle="Vincular un servicio con un tipo de orden de trabajo"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup direction="vertical" gap="md">
                        <div>
                            <Label required>Servicio</Label>
                            <SearchableSelect
                                fullWidth
                                options={serviceOptions}
                                value={serviceIdValue > 0 ? serviceIdValue : null}
                                onChange={(val) => setValue("service_id", Number(val), { shouldValidate: true })}
                                placeholder="Seleccione un servicio"
                                error={errors.service_id?.message}
                            />
                        </div>
                        <div>
                            <Label required>Tipo de orden</Label>
                            <SearchableSelect
                                fullWidth
                                options={orderTypeOptions}
                                value={orderTypeIdValue > 0 ? orderTypeIdValue : null}
                                onChange={(val) => setValue("order_type_id", Number(val), { shouldValidate: true })}
                                placeholder="Seleccione un tipo de orden"
                                error={errors.order_type_id?.message}
                            />
                        </div>
                        <div>
                            <Label>Falla asociada (opcional)</Label>
                            <SearchableSelect
                                fullWidth
                                options={failureCodeOptions}
                                value={issueIdValue ?? null}
                                onChange={(val) => setValue("failure_code_id", val ? Number(val) : null)}
                                placeholder="Sin falla asociada"
                                allowClear
                            />
                        </div>
                        <Input
                            label="Precio"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            fullWidth
                            error={errors.price?.message}
                            {...register("price", { valueAsNumber: true })}
                        />
                        <Input
                            label="Tiempo estimado (minutos)"
                            type="number"
                            placeholder="0"
                            fullWidth
                            error={errors.estimated_minutes?.message}
                            {...register("estimated_minutes", { valueAsNumber: true })}
                        />
                        <Switch
                            label="Activo"
                            checked={activoValue}
                            onChange={(e) => setValue("is_active", e.target.checked)}
                        />
                    </FormGroup>

                    <Flex justify="flex-end" gap="sm" style={{ marginTop: "1.5rem" }}>
                        <Button variant="outline" type="button" onClick={() => navigate(-1)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" loading={isSubmitting}>
                            {isEditing ? "Actualizar" : "Crear"}
                        </Button>
                    </Flex>
                </form>
            </Box>
        </Container>
    );
};

export default CreateEditServiceOrderTypePage;
