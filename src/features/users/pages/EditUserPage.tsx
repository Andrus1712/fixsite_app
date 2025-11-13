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
    MultiSelect,
} from "../../../shared/components";
import { useGetRolesQuery } from "../../Roles/services/RolesApi";
import { useGetTenantsQuery } from "../../permissions/services/tenantsApi";
import { useEffect } from "react";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../services/UsersApi";

const userSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    username: z.string().min(1, "El username/identificación es requerido"),
    password: z.string().optional(),
    roleIds: z.array(z.number()).min(1, "Debe seleccionar al menos un rol"),
    tenantIds: z.array(z.number()).min(1, "Debe seleccionar al menos un tenant"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function EditUserPage() {
    const { showSuccess, showError } = useAlerts();
    const { user_id } = useParams<{ user_id: string }>();
    const { data: roles } = useGetRolesQuery({});
    const { data: tenants } = useGetTenantsQuery({});
    const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(Number(user_id));
    const navigator = useNavigate();
    const [updateUser] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            roleIds: [],
            tenantIds: [],
        },
    });

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name || "",
                email: userData.email || "",
                username: userData.username || "",
                password: "",
                roleIds: userData.roles?.map((role: any) => role.id) || [],
                tenantIds: userData.tenants?.map((tenant: any) => tenant.id) || [],
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: UserFormData) => {
        try {
            const updateData: any = {
                id: Number(user_id),
                name: data.name,
                email: data.email,
                username: data.username,
                roleIds: data.roleIds,
                tenantIds: data.tenantIds,
            };

            if (data.password && data.password.trim() !== "") {
                updateData.password = data.password;
            }

            const result = await updateUser(updateData);

            if (result.error) {
                showError(
                    result.error?.data?.message || "Error al actualizar el usuario"
                );
            } else {
                showSuccess("Usuario actualizado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            showError("Error al actualizar el usuario");
        }
    };

    const roleOptions = roles?.data?.map((role: any) => ({
        value: role.id,
        label: role.name,
    })) || [];

    const tenantOptions = tenants?.data?.map((tenant: any) => ({
        value: tenant.id,
        label: tenant.name,
    })) || [];

    if (isLoadingUser) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Editar Usuario"
                        description="Modifique los datos del usuario"
                    >
                        <Input
                            label="Nombre completo"
                            placeholder="Ingrese el nombre completo"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Ingrese el email"
                            fullWidth={false}
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <Input
                            label="Username/Identificación"
                            type="text"
                            placeholder="Ingrese el username o identificación"
                            fullWidth={false}
                            error={errors.username?.message}
                            {...register("username")}
                        />
                        <Input
                            label="Nueva contraseña (opcional)"
                            type="password"
                            placeholder="Dejar vacío para mantener la actual"
                            fullWidth={false}
                            error={errors.password?.message}
                            {...register("password")}
                        />
                        <Controller
                            name="roleIds"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect
                                    label="Roles"
                                    placeholder="Seleccione los roles"
                                    options={roleOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.roleIds?.message}
                                />
                            )}
                        />
                        <Controller
                            name="tenantIds"
                            control={control}
                            render={({ field }) => (
                                <MultiSelect
                                    label="Tenants"
                                    placeholder="Seleccione los tenants"
                                    options={tenantOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={errors.tenantIds?.message}
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
                            Actualizar Usuario
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}