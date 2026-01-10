import { useNavigate } from "react-router";
import { Box, Button, Container, Input, FormGroup, Divider, MultiSelect, useToast } from "../../../shared/components";
import { useGetRolesQuery } from "../../Roles/services/RolesApi";
import { useGetTenantsQuery } from "../../permissions/services/tenantsApi";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveUserMutation } from "../services/UsersApi";

const userSchema = z.object({
    name: z.string().min(1, "El nombre es requerido"),
    email: z.email("Email inválido"),
    username: z.string().min(1, "El username/identificación es requerido"),
    password: z.string(),
    roleIds: z.array(z.number()).min(1, "Debe seleccionar al menos un rol"),
    tenantIds: z.array(z.number()).min(1, "Debe seleccionar al menos un tenant"),
});

type UserFormData = z.infer<typeof userSchema>;

export default function NewUserPage() {
    const { showSuccess, showError } = useToast();
    const { data: roles } = useGetRolesQuery({});
    const { data: tenants } = useGetTenantsQuery({});
    const navigator = useNavigate();
    const [saveUser] = useSaveUserMutation();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            roleIds: [],
            tenantIds: [],
        },
    });

    const onSubmit = async (data: UserFormData) => {
        try {
            const result = await saveUser({
                name: data.name,
                username: data.username,
                email: data.email,
                password: "admin",
                roleIds: data.roleIds,
                tenantIds: data.tenantIds,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear el usuario");
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
            value: role.id,
            label: role.name,
        })) || [];

    const tenantOptions =
        tenants?.data?.map((tenant: any) => ({
            value: tenant.id,
            label: tenant.name,
        })) || [];

    return (
        <Container size="full" center>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Información del Usuario" description="Complete los datos básicos del usuario">
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
                        <Button variant="secondary" onClick={() => navigator(-1)}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" loading={isSubmitting}>
                            Crear Usuario
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
}
