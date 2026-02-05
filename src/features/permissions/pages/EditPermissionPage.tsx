import { useNavigate, useParams } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    FormGroup,
    Divider,
    useAlerts,
    LoadingSpinner,
    SearchableSelect,
} from "../../../shared/components";
import { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetComponentsQuery } from "../services/componentsApi";
import {
    useGetPermissionByIdQuery,
    useUpdatePermissionMutation,
} from "../services/permissionApi";
import { useAppSelector } from "../../../shared/store";

const permissionSchema = z.object({
    key: z.string().min(1, "El campo 'Clave' es requerido"),
    assignedBy: z.string().optional(),
    userId: z.number().optional(),
    componentId: z.number().min(1, "Debe seleccionar un componente"),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

export default function EditPermissionPage() {
    const { showSuccess, showError } = useAlerts();
    const { id } = useParams<{ id: string }>();
    const { data: permissionData, isLoading: isLoadingPermission } =
        useGetPermissionByIdQuery(Number(id));
    const [searchFilter, setSearchFilter] = useState("");

    const { data: components, isLoading } = useGetComponentsQuery({
        filter: searchFilter,
        limit: 50
    });

    const navigator = useNavigate();
    const [updatePermission] = useUpdatePermissionMutation();
    const { data: dataAuth } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
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

    const componentId = watch("componentId");

    useEffect(() => {
        if (permissionData) {
            reset({
                key: permissionData.key || "",
                assignedBy: permissionData.assignedBy || "",
                userId: permissionData.userId || undefined,
                componentId: permissionData.component?.id || 0,
            });
        }
    }, [permissionData, reset]);

    const onSubmit = async (data: PermissionFormData) => {
        try {
            const result = await updatePermission({
                id: Number(id),
                key: data.key,
                assignedBy: dataAuth?.user.username || "",
                userId: data.userId,
                componentId: data.componentId,
            });

            if (result.error) {
                showError(
                    result.error?.data?.message ||
                        "Error al actualizar el permiso"
                );
            } else {
                showSuccess("Permiso actualizado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al actualizar permiso:", error);
            showError("Error al actualizar el permiso");
        }
    };

    if (isLoadingPermission) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Editar Permiso"
                        description="Modifique los datos del permiso"
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
                        <SearchableSelect
                            label="Componente"
                            placeholder="Buscar componente..."
                            error={errors.componentId?.message}
                            value={componentId}
                            onChange={(value) => setValue("componentId", Number(value))}
                            onSearch={setSearchFilter}
                            loading={isLoading}
                            options={components?.data?.map((component: any) => ({
                                value: component.id,
                                label: `${component.id} | ${component.title} | ${component.action}`
                            })) || []}
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
                            Actualizar Permiso
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
