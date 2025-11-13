import { useNavigate } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    TextArea,
    FormGroup,
    Divider,
    PermissionsSelector,
    useAlerts,
} from "../../../shared/components";
import { useGetAvailablePermissionsQuery } from "../../permissions/services/permissionApi";
import { useEffect, useState } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveRolesMutation } from "../services/RolesApi";

// Esquema de validación
const roleSchema = z.object({
    name: z.string().min(1, "El nombre del rol es requerido"),
    description: z.string().optional(),
    permissions: z
        .array(z.number())
        // .min(1, "Debe seleccionar al menos un permiso"),
});

type RoleFormData = z.infer<typeof roleSchema>;

export default function NewRolPage() {
    const { showSuccess, showError } = useAlerts();
    const { data: permissions } = useGetAvailablePermissionsQuery();
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
        []
    );
    const navigator = useNavigate();

    const handlePermissionsChange = (permissionIds: number[]) => {
        setSelectedPermissions(permissionIds);
    };

    const [saveRole] = useSaveRolesMutation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RoleFormData>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: [],
        },
    });

    const onSubmit = async (data: RoleFormData) => {
        try {
            console.log("Datos del formulario:", data);
            const result = await saveRole({
                name: data.name,
                description: data.description || "",
                permissions: data.permissions.map(String),
            });

            if (result.error) {
                showError(
                    result.error?.data?.message || "Error al crear el rol"
                );
            } else {
                showSuccess("Rol creado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al crear rol:", error);
            showError("Error al crear el rol");
        }
    };

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Información del Rol"
                        description="Complete los datos básicos del rol"
                    >
                        <Input
                            label="Nombre del Rol"
                            placeholder="Ingrese el nombre del rol"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <TextArea
                            label="Descripción"
                            placeholder="Descripción del rol (opcional)"
                            fullWidth={false}
                            rows={3}
                            error={errors.description?.message}
                            {...register("description")}
                        />
                    </FormGroup>

                    <Divider thickness={-1} />

                    {permissions && (
                        <Controller
                            name="permissions"
                            control={control}
                            render={({ field }) => (
                                <PermissionsSelector
                                    permissions={permissions}
                                    selectedPermissions={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    )}
                    {errors.permissions && (
                        <p
                            style={{
                                color: "#ef4444",
                                fontSize: "12px",
                                marginTop: "4px",
                            }}
                        >
                            {errors.permissions.message}
                        </p>
                    )}

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
                            Crear Rol
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
