import { useNavigate } from "react-router";
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
} from "../../../shared/components";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveModuleMutation } from "../services/modulesApi";

const moduleSchema = z.object({
    name: z.string().min(1, "El nombre del módulo es requerido"),
    description: z.string().optional(),
    icon: z.string().min(1, "El icono es requerido"),
    active: z.boolean(),
});

type ModuleFormData = z.infer<typeof moduleSchema>;

export default function NewModulePage() {
    const { showSuccess, showError } = useAlerts();
    const navigator = useNavigate();
    const [saveModule] = useSaveModuleMutation();

    const {
        register,
        handleSubmit,
        control,
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

    const onSubmit = async (data: ModuleFormData) => {
        try {
            const result = await saveModule({
                name: data.name,
                description: data.description || "",
                icon: data.icon,
                active: data.active,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear el módulo");
            } else {
                showSuccess("Módulo creado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al crear módulo:", error);
            showError("Error al crear el módulo");
        }
    };

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Información del Módulo"
                        description="Complete los datos básicos del módulo"
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
                            Crear Módulo
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}