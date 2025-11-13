import { useNavigate, useParams } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    FormGroup,
    Divider,
    useAlerts,
    Checkbox,
    LoadingSpinner,
    MultiSelect,
} from "../../../shared/components";
import { useEffect } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetComponentByIdQuery, useUpdateComponentMutation } from "../services/componentsApi";
import { useGetModulesQuery } from "../services/modulesApi";

const componentSchema = z.object({
    label: z.string().min(1, "El label es requerido"),
    title: z.string().min(1, "El título es requerido"),
    componentKey: z.string().min(1, "La clave del componente es requerida"),
    option: z.string().min(1, "La opción es requerida"),
    action: z.string().min(1, "La acción es requerida"),
    path: z.string().min(1, "La ruta es requerida"),
    icon: z.string().optional(),
    order: z.number().min(0, "El orden debe ser mayor o igual a 0"),
    showMenu: z.boolean(),
    active: z.boolean(),
    type: z.string().min(1, "El tipo es requerido"),
    moduleIds: z.array(z.number()).min(1, "Debe seleccionar al menos un módulo"),
});

type ComponentFormData = z.infer<typeof componentSchema>;

export default function EditComponentPage() {
    const { showSuccess, showError } = useAlerts();
    const { id } = useParams<{ id: string }>();
    const { data: componentData, isLoading: isLoadingComponent } = useGetComponentByIdQuery(Number(id));
    const { data: modules } = useGetModulesQuery({});
    const navigator = useNavigate();
    const [updateComponent] = useUpdateComponentMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ComponentFormData>({
        resolver: zodResolver(componentSchema),
        defaultValues: {
            label: "",
            title: "",
            componentKey: "",
            option: "",
            action: "",
            path: "",
            icon: "",
            order: 0,
            showMenu: true,
            active: true,
            type: "G",
            moduleIds: [],
        },
    });

    useEffect(() => {
        if (componentData) {
            reset({
                label: componentData.label || "",
                title: componentData.title || "",
                componentKey: componentData.componentKey || "",
                option: componentData.option || "",
                action: componentData.action || "",
                path: componentData.path || "",
                icon: componentData.icon || "",
                order: componentData.order || 0,
                showMenu: componentData.showMenu ?? true,
                active: componentData.active ?? true,
                type: componentData.type || "G",
                moduleIds: componentData.modules?.map((m: any) => m.id) || [],
            });
        }
    }, [componentData, reset]);

    const onSubmit = async (data: ComponentFormData) => {
        try {
            const result = await updateComponent({
                id: Number(id),
                ...data,
                moduleIds: data.moduleIds,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al actualizar el componente");
            } else {
                showSuccess("Componente actualizado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al actualizar componente:", error);
            showError("Error al actualizar el componente");
        }
    };

    if (isLoadingComponent) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Editar Componente"
                        description="Modifique los datos del componente"
                    >
                        <Input
                            label="Label"
                            placeholder="Ingrese el label"
                            fullWidth={false}
                            error={errors.label?.message}
                            {...register("label")}
                        />
                        <Input
                            label="Título"
                            placeholder="Ingrese el título"
                            fullWidth={false}
                            error={errors.title?.message}
                            {...register("title")}
                        />
                        <Input
                            label="Clave del Componente"
                            placeholder="Ingrese la clave"
                            fullWidth={false}
                            error={errors.componentKey?.message}
                            {...register("componentKey")}
                        />
                        <Input
                            label="Opción"
                            placeholder="Ingrese la opción"
                            fullWidth={false}
                            error={errors.option?.message}
                            {...register("option")}
                        />
                        <Input
                            label="Acción"
                            placeholder="Ingrese la acción"
                            fullWidth={false}
                            error={errors.action?.message}
                            {...register("action")}
                        />
                        <Input
                            label="Ruta"
                            placeholder="Ingrese la ruta"
                            fullWidth={false}
                            error={errors.path?.message}
                            {...register("path")}
                        />
                        <Input
                            label="Icono"
                            placeholder="Ingrese el icono (opcional)"
                            fullWidth={false}
                            error={errors.icon?.message}
                            {...register("icon")}
                        />
                        <Input
                            label="Orden"
                            type="number"
                            placeholder="Ingrese el orden"
                            fullWidth={false}
                            error={errors.order?.message}
                            {...register("order", { valueAsNumber: true })}
                        />
                        <Input
                            label="Tipo"
                            placeholder="G o T"
                            fullWidth={false}
                            error={errors.type?.message}
                            {...register("type")}
                        />
                        <Controller
                            name="showMenu"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    label="Mostrar en Menú"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    label="Activo"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name="moduleIds"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect
                                    label="Módulos"
                                    placeholder="Seleccione los módulos"
                                    options={modules?.data?.map((module: any) => ({
                                        value: module.id,
                                        label: module.name,
                                    })) || []}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.moduleIds?.message}
                                />
                            )}
                        />
                    </FormGroup>

                    <Divider />

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "flex-end",
                        }}
                    >
                        <Button
                            variant="secondary"
                            onClick={() => navigator(-1)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            loading={isSubmitting}
                        >
                            Actualizar Componente
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}