import { useForm } from "react-hook-form";
import { Box, Button, Container, Divider, FormGroup, Input, useToast } from "../../../shared/components";
import { technicianSchema, type TechnicianFormData } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useSaveTechnicianMutation } from "../services/TechnicianApi";

const NewTechnicianPage = () => {
    const { showSuccess, showError } = useToast();
    const navigator = useNavigate();
    const [saveTechnician] = useSaveTechnicianMutation();
    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
    } = useForm<TechnicianFormData>({
        resolver: zodResolver(technicianSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            specialty: "",
            level: "",
            certification: "",
        },
    });

    const onSubmit = async (data: TechnicianFormData) => {
        try {
            const result = await saveTechnician({
                name: data.name,
                email: data.email,
                phone: data.phone,
                specialty: data.specialty,
                level: data.level,
                certification: data.certification,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear el tecnico");
            } else {
                showSuccess("Tecnico creado exitosamente");
                navigator(-1);
            }
        } catch (error) {
            console.error("Error al crear tecnico:", error);
            showError("Error al crear el tecnico");
        }
    };

    return (
        <Container $center $size="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Información del Tecnico" description="Complete los datos básicos del tecnico">
                        <Input
                            label="Nombre completo"
                            placeholder="Ingrese el nombre completo"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <Input
                            label="Email"
                            placeholder="Ingrese el email"
                            fullWidth={false}
                            error={errors.email?.message}
                            {...register("email")}
                        />
                        <Input
                            label="Teléfono"
                            placeholder="Ingrese el teléfono"
                            fullWidth={false}
                            error={errors.phone?.message}
                            {...register("phone")}
                        />
                        <Input
                            label="Especialidad"
                            placeholder="Ingrese la especialidad"
                            fullWidth={false}
                            error={errors.specialty?.message}
                            {...register("specialty")}
                        />
                        <Input
                            label="Nivel de experiencia"
                            placeholder="Ingrese el nivel de experiencia"
                            fullWidth={false}
                            error={errors.level?.message}
                            {...register("level")}
                        />
                        <Input
                            label="Certificación"
                            placeholder="Ingrese la certificación"
                            fullWidth={false}
                            error={errors.certification?.message}
                            {...register("certification")}
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
};

export default NewTechnicianPage;
