import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Flex,
    FormGroup,
    Input,
    SearchableSelect,
    Switch,
    Text,
    useToast,
} from "../../../shared/components";
import {
    ServiceArticleSchema,
    type ServiceArticleFormData,
    serviceArticleDefaultValues,
} from "../schemas";
import {
    useCreateServiceArticleMutation,
    useUpdateServiceArticleMutation,
    type ServiceArticle,
    type UpdateServiceArticleDto,
} from "../services/ServiceArticleApi";
import { useLazyGetAllArticlesQuery } from "../../inventory/article/services/ArticleApi";

interface ServiceArticleFormProps {
    serviceId: number;
    editingArticle: ServiceArticle | null;
    onSuccess: () => void;
    onCancel: () => void;
}

interface ArticleOption {
    value: number;
    label: string;
}

const ServiceArticleForm = ({
    serviceId,
    editingArticle,
    onSuccess,
    onCancel,
}: ServiceArticleFormProps) => {
    const { showSuccess, showError } = useToast();
    const [conflictError, setConflictError] = useState<string | null>(null);

    const [createServiceArticle] = useCreateServiceArticleMutation();
    const [updateServiceArticle] = useUpdateServiceArticleMutation();
    const [triggerArticleSearch, { isFetching: isSearchingArticles }] =
        useLazyGetAllArticlesQuery();

    const [articleOptions, setArticleOptions] = useState<ArticleOption[]>(() => {
        if (editingArticle) {
            return [
                {
                    value: editingArticle.article_id,
                    label: `${editingArticle.article_sku} - ${editingArticle.article_name}`,
                },
            ];
        }
        return [];
    });

    const isEditMode = editingArticle !== null;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ServiceArticleFormData>({
        resolver: zodResolver(ServiceArticleSchema),
        defaultValues: isEditMode
            ? {
                article_id: editingArticle.article_id,
                default_quantity: editingArticle.default_quantity,
                is_active: editingArticle.is_active,
            }
            : serviceArticleDefaultValues,
    });

    const articleIdValue = watch("article_id");
    const isActiveValue = watch("is_active");

    const handleArticleSearch = useCallback(
        async (searchTerm: string) => {
            if (searchTerm.length < 2) {
                setArticleOptions([]);
                return;
            }

            try {
                const response = await triggerArticleSearch({
                    page: 1,
                    limit: 50,
                    filter: searchTerm,
                }).unwrap();

                const options: ArticleOption[] = response.data.map((article) => ({
                    value: article.id,
                    label: `${article.sku} - ${article.name}`,
                }));

                setArticleOptions(options);
            } catch {
                setArticleOptions([]);
            }
        },
        [triggerArticleSearch]
    );

    const handleArticleChange = (value: string | number | null) => {
        setValue("article_id", value ? Number(value) : 0, {
            shouldValidate: true,
        });
        setConflictError(null);
    };

    const onSubmit = async (data: ServiceArticleFormData) => {
        setConflictError(null);

        if (isEditMode) {
            // PATCH with only changed fields (delta logic)
            const delta: UpdateServiceArticleDto = {};

            if (data.default_quantity !== editingArticle.default_quantity) {
                delta.default_quantity = data.default_quantity;
            }
            if (data.is_active !== editingArticle.is_active) {
                delta.is_active = data.is_active;
            }

            // If nothing changed, just call onSuccess
            if (Object.keys(delta).length === 0) {
                onSuccess();
                return;
            }

            const result = await updateServiceArticle({
                id: editingArticle.id,
                data: delta,
            });

            if (result.error) {
                const errorData = result.error as { status?: number; data?: { message?: string } };
                showError(
                    errorData?.data?.message ||
                    "No se pudo completar la operación. Intente nuevamente."
                );
                return;
            }

            showSuccess("Artículo actualizado exitosamente");
            onSuccess();
        } else {
            // POST create
            const result = await createServiceArticle({
                service_id: serviceId,
                article_id: data.article_id,
                default_quantity: data.default_quantity,
                is_active: data.is_active,
            });

            if (result.error) {
                const errorData = result.error as { status?: number; data?: { message?: string } };

                if (errorData?.status === 409) {
                    setConflictError(
                        "Este artículo ya está configurado para este servicio"
                    );
                    return;
                }

                showError(
                    errorData?.data?.message ||
                    "No se pudo completar la operación. Intente nuevamente."
                );
                return;
            }

            showSuccess("Artículo configurado exitosamente");
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup direction="vertical" gap="md">
                {isEditMode ? (
                    <div>
                        <Text variant="label" weight="semibold">
                            Artículo
                        </Text>
                        <Text variant="body1">
                            {editingArticle.article_sku} -{" "}
                            {editingArticle.article_name}
                        </Text>
                    </div>
                ) : (
                    <SearchableSelect
                        label="Artículo"
                        placeholder="Buscar por nombre o SKU (mín. 2 caracteres)"
                        options={articleOptions}
                        value={articleIdValue > 0 ? articleIdValue : null}
                        onChange={handleArticleChange}
                        onSearch={handleArticleSearch}
                        loading={isSearchingArticles}
                        error={
                            conflictError ||
                            errors.article_id?.message
                        }
                        fullWidth
                    />
                )}

                <Input
                    label="Cantidad por defecto"
                    type="number"
                    step="0.01"
                    min="0.01"
                    max="9999.99"
                    placeholder="1.00"
                    fullWidth
                    error={errors.default_quantity?.message}
                    {...register("default_quantity", { valueAsNumber: true })}
                />

                <Switch
                    label="Activo"
                    checked={isActiveValue}
                    onChange={(e) =>
                        setValue("is_active", (e.target as HTMLInputElement).checked)
                    }
                />
            </FormGroup>

            <Flex justify="flex-end" gap="sm" style={{ marginTop: "1rem" }}>
                <Button
                    variant="outline"
                    onClick={onCancel}
                    type="button"
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    {isEditMode ? "Actualizar" : "Guardar"}
                </Button>
            </Flex>
        </form>
    );
};

export default ServiceArticleForm;
