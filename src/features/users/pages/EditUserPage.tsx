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
    Select,
} from "../../../shared/components";
import { useGetRolesQuery } from "../../Roles/services/RolesApi";
import { useEffect } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetUserByIdQuery, useUpdateUserMutation } from "../services/UsersApi";

const userSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    password: z.string().optional(),
    roleId: z.string().min(1, "Debe seleccionar un rol"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function EditUserPage() {
    const { showSuccess, showError } = useAlerts();
    const { user_id } = useParams<{ user_id: string }>();
    const { data: roles } = useGetRolesQuery({});
    const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(Number(user_id));
    const navigator = useNavigate();
    const [updateUser] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            roleId: "",
        },
    });

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name || "",
                email: userData.email || "",
                password: "",
                roleId: userData.roleId?.toString() || "",
            });
        }
    }, [userData, reset]);

    const onSubmit = async (data: UserFormData) => {
        try {
            const updateData: any = {
                id: Number(user_id),
                name: data.name,
                email: data.email,
                roleId: Number(data.roleId),
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
        value: role.id.toString(),
        label: role.name,
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
                            label="Nueva contraseña (opcional)"
                            type="password"
                            placeholder="Dejar vacío para mantener la actual"
                            fullWidth={false}
                            error={errors.password?.message}
                            {...register("password")}
                        />
                        <Select
                            label="Rol"
                            placeholder="Seleccione un rol"
                            options={roleOptions}
                            error={errors.roleId?.message}
                            {...register("roleId")}
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