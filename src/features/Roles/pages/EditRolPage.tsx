import { useNavigate, useParams } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    TextArea,
    FormGroup,
    Divider,
    PermissionsSelector,
    LoadingSpinner,
    useToast,
} from "../../../shared/components";
import { useGetAvailablePermissionsQuery } from "../../permissions/services/permissionApi";
import { useEffect } from "react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetRoleByIdQuery, useUpdateRoleMutation } from "../services/RolesApi";

// Esquema de validación
const roleSchema = z.object({
    name: z.string().min(1, "El nombre del rol es requerido"),
    description: z.string().optional(),
    permissions: z.array(z.number()),
    // .min(1, "Debe seleccionar al menos un permiso"),
});

type RoleFormData = z.infer<typeof roleSchema>;

export default function EditRolPage() {
    const { showSuccess, showError } = useToast();
    const { role_id } = useParams<{ role_id: string }>();
    const { data: permissions } = useGetAvailablePermissionsQuery();
    const { data: roleData, isLoading: isLoadingRole } = useGetRoleByIdQuery(Number(role_id));
    const navigator = useNavigate();

    const [updateRole] = useUpdateRoleMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<RoleFormData>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: [],
        },
    });

    useEffect(() => {
        if (roleData && roleData.name == "Admin") {
            navigator("/app/roles");
            showError("No se puede editar el rol Admin");
        }
    }, [roleData, navigator, showError]);

    useEffect(() => {
        if (roleData) {
            reset({
                name: roleData.name || "",
                description: roleData.description || "",
                permissions: roleData.permissions?.map(Number) || [],
            });
        }
    }, [roleData, reset]);

    const onSubmit = async (data: RoleFormData) => {
        try {
            const result = await updateRole({
                id: Number(role_id),
                name: data.name,
                description: data.description || "",
                permissions: data.permissions.map(String),
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al actualizar el rol");
            } else {
                showSuccess("Rol actualizado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al actualizar rol:", error);
            showError("Error al actualizar el rol");
        }
    };

    if (isLoadingRole) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Editar Rol" description="Modifique los datos del rol">
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
                        <Button variant="secondary" onClick={() => navigator(-1)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" loading={isSubmitting}>
                            Actualizar Rol
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
