import { useForm } from "react-hook-form";
import { Box, Button, Container, Divider, FormGroup, Input, useToast } from "../../../../shared/components";
import { CategorySchema, type CategoryFormData, categoryDefaultValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useCreateCategoryMutation, useUpdateCategoryMutation } from "../services/CategoryApi";
import { useParams } from "react-router";

const CreateEditCategoryPage = () => {
    const { showSuccess, showError } = useToast();
    const navigator = useNavigate();
    const { id } = useParams();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();

    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(CategorySchema),
        defaultValues: categoryDefaultValues,
    });

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (id) {
                const result = await updateCategory({ id: Number(id), name: data.name });
                if (result.error) {
                    showError(result.error?.data?.message || "Error al actualizar la categoría");
                } else {
                    showSuccess("Categoría actualizada exitosamente");
                    navigator(-1);
                }
            } else {
                const result = await createCategory({ name: data.name });
                if (result.error) {
                    showError(result.error?.data?.message || "Error al crear la categoría");
                } else {
                    showSuccess("Categoría creada exitosamente");
                    navigator(-1);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            showError("Error al procesar la categoría");
        }
    };

    return (
        <Container $center $size="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Información de la Categoría" description="Complete los datos de la categoría">
                        <Input
                            label="Nombre"
                            placeholder="Ingrese el nombre de la categoría"
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
                        <Button variant="secondary" onClick={() => navigator('/app/categories-brands')}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" loading={isSubmitting}>
                            {id ? "Actualizar" : "Crear"} Categoría
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
};

export default CreateEditCategoryPage;
