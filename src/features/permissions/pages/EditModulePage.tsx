import { useNavigate, useParams } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    TextArea,
    FormGroup,
    Divider,
    useAlerts,
    Checkbox,
    LoadingSpinner,
} from "../../../shared/components";
import { useEffect } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetModuleByIdQuery, useUpdateModuleMutation } from "../services/modulesApi";

const moduleSchema = z.object({
    name: z.string().min(1, "El nombre del módulo es requerido"),
    description: z.string().optional(),
    icon: z.string().min(1, "El icono es requerido"),
    active: z.boolean(),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export default function EditModulePage() {
    const { showSuccess, showError } = useAlerts();
    const { id } = useParams<{ id: string }>();
    const { data: moduleData, isLoading: isLoadingModule } = useGetModuleByIdQuery(Number(id));
    const navigator = useNavigate();
    const [updateModule] = useUpdateModuleMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ModuleFormData>({
        resolver: zodResolver(moduleSchema),
        defaultValues: {
            name: "",
            description: "",
            icon: "",
            active: true,
        },
    });

    useEffect(() => {
        if (moduleData) {
            reset({
                name: moduleData.name || "",
                description: moduleData.description || "",
                icon: moduleData.icon || "",
                active: moduleData.active ?? true,
            });
        }
    }, [moduleData, reset]);

    const onSubmit = async (data: ModuleFormData) => {
        try {
            const result = await updateModule({
                id: Number(id),
                name: data.name,
                description: data.description || "",
                icon: data.icon,
                active: data.active,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al actualizar el módulo");
            } else {
                showSuccess("Módulo actualizado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al actualizar módulo:", error);
            showError("Error al actualizar el módulo");
        }
    };

    if (isLoadingModule) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Editar Módulo"
                        description="Modifique los datos del módulo"
                    >
                        <Input
                            label="Nombre del Módulo"
                            placeholder="Ingrese el nombre del módulo"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <TextArea
                            label="Descripción"
                            placeholder="Descripción del módulo (opcional)"
                            fullWidth={false}
                            rows={3}
                            error={errors.description?.message}
                            {...register("description")}
                        />
                        <Input
                            label="Icono"
                            placeholder="Ingrese el icono del módulo"
                            fullWidth={false}
                            error={errors.icon?.message}
                            {...register("icon")}
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
                            Actualizar Módulo
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}