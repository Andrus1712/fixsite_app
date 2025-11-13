import { useNavigate } from "react-router";
import {
    Box,
    Button,
    Container,
    Input,
    FormGroup,
    Divider,
    useAlerts,
    Select,
} from "../../../shared/components";
import { useGetRolesQuery } from "../../Roles/services/RolesApi";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveUserMutation } from "../services/UsersApi";

const userSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.email("Email inválido"),
    username: z.string().min(1, "El nombre de usuario es requerido"),
    password: z.string(),
    roleId: z.string().min(1, "Debe seleccionar un rol"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function NewUserPage() {
    const { showSuccess, showError } = useAlerts();
    const { data: roles } = useGetRolesQuery({});
    const navigator = useNavigate();
    const [saveUser] = useSaveUserMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            roleId: "",
        },
    });

    const onSubmit = async (data: UserFormData) => {
        try {
            const result = await saveUser({
                name: data.name,
                username: data.username,
                email: data.email,
                password: "admin",
                roleId: Number(data.roleId),
            });

            if (result.error) {
                showError(
                    result.error?.data?.message || "Error al crear el usuario"
                );
            } else {
                showSuccess("Usuario creado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al crear usuario:", error);
            showError("Error al crear el usuario");
        }
    };

    const roleOptions =
        roles?.data?.map((role: any) => ({
            value: role.id.toString(),
            label: role.name,
        })) || [];

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup
                        title="Información del Usuario"
                        description="Complete los datos básicos del usuario"
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
                            label="Identificacion"
                            type="text"
                            placeholder="Ingrese la identificacion"
                            fullWidth={false}
                            error={errors.username?.message}
                            {...register("username")}
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
                            Crear Usuario
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
