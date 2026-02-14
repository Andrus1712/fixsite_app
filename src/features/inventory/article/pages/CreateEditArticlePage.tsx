import { useForm } from "react-hook-form";
import { Box, Button, Container, Divider, FormGroup, Input, useToast, Label, SearchableSelect } from "../../../../shared/components";
import { ArticleSchema, type ArticleFormData, articleDefaultValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { useCreateArticleMutation, useUpdateArticleMutation, useGetArticleByIdQuery } from "../services/ArticleApi";
import { useGetAllCategoriesQuery } from "../../category/services/CategoryApi";
import { useGetAllBrandsQuery } from "../../brand/services/BrandApi";
import { useEffect } from "react";

const CreateEditArticlePage = () => {
    const { showSuccess, showError } = useToast();
    const navigator = useNavigate();
    const { article_id } = useParams();
    const [createArticle] = useCreateArticleMutation();
    const [updateArticle] = useUpdateArticleMutation();
    const { data: article } = useGetArticleByIdQuery(Number(article_id), { skip: !article_id });
    const { data: categoriesData } = useGetAllCategoriesQuery({ page: 1, limit: 1000 });
    const { data: brandsData } = useGetAllBrandsQuery({ page: 1, limit: 1000 });

    const {
        formState: { errors, isSubmitting },
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<ArticleFormData>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: articleDefaultValues,
    });

    const formValues = watch();

    useEffect(() => {
        if (article_id && article) {
            reset({
                name: article.name,
                sku: article.sku,
                description: article.description,
                category_id: article.category_id,
                brand_id: article.brand_id,
                unit_measurement: article.unit_measurement,
                active: article.active,
            });
        }
    }, [article_id, article, reset]);

    const handleCategoryChange = (value: string | number | null) => {
        if (typeof value === 'number') {
            reset({ ...formValues, category_id: value });
        }
    };

    const handleBrandChange = (value: string | number | null) => {
        if (typeof value === 'number') {
            reset({ ...formValues, brand_id: value });
        }
    };

    const onSubmit = async (data: ArticleFormData) => {
        try {
            if (article_id) {
                const result = await updateArticle({ id: Number(article_id), data });
                if (result.error) {
                    showError(result.error?.data?.message || "Error al actualizar el artículo");
                } else {
                    showSuccess("Artículo actualizado exitosamente");
                    navigator(-1);
                }
            } else {
                const result = await createArticle(data as any);
                if (result.error) {
                    showError(result.error?.data?.message || "Error al crear el artículo");
                } else {
                    showSuccess("Artículo creado exitosamente");
                    navigator(-1);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            showError("Error al procesar el artículo");
        }
    };

    return (
        <Container $center $size="full">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box bg="white" p="lg" shadow rounded>
                    <FormGroup title="Información del Artículo" description="Complete los datos del artículo">
                        <Input
                            label="Nombre"
                            placeholder="Ingrese el nombre del artículo"
                            fullWidth={false}
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <Input
                            label="SKU"
                            placeholder="Ingrese el SKU (opcional)"
                            fullWidth={false}
                            error={errors.sku?.message}
                            {...register("sku")}
                        />
                        <Input
                            label="Descripción"
                            placeholder="Ingrese la descripción (opcional)"
                            fullWidth={false}
                            error={errors.description?.message}
                            {...register("description")}
                        />
                        <div>
                            <Label>Categoría</Label>
                            <SearchableSelect
                                fullWidth
                                value={formValues.category_id > 0 ? formValues.category_id : null}
                                onChange={handleCategoryChange}
                                options={
                                    categoriesData?.data.map((cat) => ({
                                        value: cat.id,
                                        label: cat.name,
                                    })) || []
                                }
                                placeholder="Seleccione una categoría"
                                error={errors.category_id?.message}
                            />
                        </div>
                        <div>
                            <Label>Marca</Label>
                            <SearchableSelect
                                fullWidth
                                value={formValues.brand_id > 0 ? formValues.brand_id : null}
                                onChange={handleBrandChange}
                                options={
                                    brandsData?.data.map((brand) => ({
                                        value: brand.id,
                                        label: brand.name,
                                    })) || []
                                }
                                placeholder="Seleccione una marca"
                                error={errors.brand_id?.message}
                            />
                        </div>
                        <Input
                            label="Unidad de Medida"
                            placeholder="Ej: UND, KG, L"
                            fullWidth={false}
                            error={errors.unit_measurement?.message}
                            {...register("unit_measurement")}
                        />
                        <label>
                            <input type="checkbox" {...register("active")} />
                            Activo
                        </label>
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
                            {article_id ? "Actualizar" : "Crear"} Artículo
                        </Button>
                    </div>
                </Box>
            </form>
        </Container>
    );
};

export default CreateEditArticlePage;
