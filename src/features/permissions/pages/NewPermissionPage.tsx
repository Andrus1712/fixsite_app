import { useNavigate } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    FormGroup,
    Divider,
    useAlerts,
} from "../../../shared/components";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSavePermissionMutation } from "../services/permissionApi";
import { useGetComponentsQuery } from "../services/componentsApi";
import { useAppSelector } from "../../../shared/store";

const permissionSchema = z.object({
    key: z.string().min(1, "El campo 'Clave' es requerido"),
    assignedBy: z.string().optional(),
    userId: z.number().optional(),
    componentId: z.number().min(1, "Debe seleccionar un componente"),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

export default function NewPermissionPage() {
    const { showSuccess, showError } = useAlerts();
    const navigator = useNavigate();
    const [savePermission] = useSavePermissionMutation();
    const { data: components } = useGetComponentsQuery({});
    const { data: dataAuth } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PermissionFormData>({
        resolver: zodResolver(permissionSchema),
        defaultValues: {
            key: "",
            assignedBy: "",
            userId: undefined,
            componentId: 0,
        },
    });

    const onSubmit = async (data: PermissionFormData) => {
        try {
            const result = await savePermission({
                key: data.key,
                assignedBy: dataAuth?.user.username || "",
                userId: data.userId,
                componentId: data.componentId,
            });

            if (result.error) {
                showError(
                    result.error?.data?.message || "Error al crear el permiso"
                );
            } else {
                showSuccess("Permiso creado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al crear permiso:", error);
            showError("Error al crear el permiso");
        }
    };

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Información del Permiso"
                        description="Complete los datos básicos del permiso"
                    >
                        <Input
                            label="Clave"
                            placeholder="Ingrese la clave del permiso"
                            fullWidth={false}
                            error={errors.key?.message}
                            {...register("key")}
                        />
                        <Input
                            label="ID de Usuario (opcional)"
                            type="number"
                            placeholder="Ingrese el ID del usuario"
                            fullWidth={false}
                            error={errors.userId?.message}
                            {...register("userId", { valueAsNumber: true })}
                        />
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    marginBottom: "4px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                }}
                            >
                                Componente
                            </label>
                            <select
                                {...register("componentId", {
                                    valueAsNumber: true,
                                })}
                                style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                }}
                            >
                                <option value={0}>
                                    Seleccione un componente
                                </option>
                                {components?.data?.map((component: any) => (
                                    <option
                                        key={component.id}
                                        value={component.id}
                                    >
                                        {component.title} - {component.action}
                                    </option>
                                ))}
                            </select>
                            {errors.componentId && (
                                <p
                                    style={{
                                        color: "#ef4444",
                                        fontSize: "12px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {errors.componentId.message}
                                </p>
                            )}
                        </div>
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
                            Crear Permiso
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
