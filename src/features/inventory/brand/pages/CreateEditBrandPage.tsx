import { useForm } from "react-hook-form";
import { Box, Button, Container, Divider, FormGroup, Input, useToast } from "../../../../shared/components";
import { BrandSchema, type BrandFormData, brandDefaultValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useCreateBrandMutation, useUpdateBrandMutation } from "../services/BrandApi";
import { useParams } from "react-router";

const CreateEditBrandPage = () => {
    const { showSuccess, showError } = useToast();
    const navigator = useNavigate();
    const { id } = useParams();
    const [createBrand] = useCreateBrandMutation();
    const [updateBrand] = useUpdateBrandMutation();

    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
    } = useForm<BrandFormData>({
        resolver: zodResolver(BrandSchema),
        defaultValues: brandDefaultValues,
    });

    const onSubmit = async (data: BrandFormData) => {
        try {
            if (id) {
                const result = await updateBrand({ id: Number(id), name: data.name });
                if (result.error) {
                    showError(result.error?.data?.message || "Error al actualizar la marca");
                } else {
                    showSuccess("Marca actualizada exitosamente");
                    navigator(-1);
                }
            } else {
                const result = await createBrand({ name: data.name });
                if (result.error) {
                    showError(result.error?.data?.message || "Error al crear la marca");
                } else {
                    showSuccess("Marca creada exitosamente");
                    navigator(-1);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            showError("Error al procesar la marca");
        }
    };

    return (
        <Container $center $size="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Información de la Marca" description="Complete los datos de la marca">
                        <Input
                            label="Nombre"
                            placeholder="Ingrese el nombre de la marca"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
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
                            {id ? "Actualizar" : "Crear"} Marca
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
};

export default CreateEditBrandPage;
