import { useEffect, useState, useCallback, useRef } from "react";
import type { Control, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { useController } from "react-hook-form";
import styled from "styled-components";
import {
    Flex,
    FormGroup,
    Input,
    SearchableSelect,
    Text,
} from "../../../shared/components";
import { FaTrash } from "react-icons/fa";
import { useGetServiceArticlesQuery } from "../../service-articles/services/ServiceArticleApi";
import { useGetAllStoresQuery } from "../../inventory/storeModule/services/StoreApi";
import { useLazyGetAllArticlesQuery } from "../../inventory/article/services/ArticleApi";
import type { AssignmentPartItem, AssignmentPartsFormData } from "../../service-articles/schemas";
import IconButton from "../../../shared/components/Buttons/IconButton";

interface AssignServicePartsProps {
    serviceId: number;
    requiresArticles: boolean;
    control: Control<AssignmentPartsFormData>;
    errors: FieldErrors<AssignmentPartsFormData>;
    setValue: UseFormSetValue<AssignmentPartsFormData>;
    watch: UseFormWatch<AssignmentPartsFormData>;
    ListArticles: any
}

interface ArticleOption {
    value: number;
    label: string;
}

const PartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
`;

const PartRow = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background-color: ${(props) => props.theme.colors.surface};
`;

const PartInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

const QuantityInput = styled.div`
    width: 120px;
    flex-shrink: 0;
`;

const MAX_ARTICLES = 50;

const AssignServiceParts = ({
    serviceId,
    requiresArticles,
    ListArticles,
    control,
    errors,
    setValue,
    watch,
}: AssignServicePartsProps) => {
    const prevServiceIdRef = useRef<number>(serviceId);
    const [addArticleError, setAddArticleError] = useState<string | null>(null);
    const [articleOptions, setArticleOptions] = useState<ArticleOption[]>([]);

    // Watch current parts
    const parts = watch("parts");
    const storeId = watch("store_id");

    // Controller for store_id to work with SearchableSelect
    const { field: storeField } = useController({
        name: "store_id",
        control,
    });

    // Fetch service articles for pre-fill
    const {
        data: serviceArticlesData,
        isError: isServiceArticlesError,
        isLoading: isLoadingServiceArticles,
    } = useGetServiceArticlesQuery(
        { service_id: serviceId, page: 1, limit: 100 },
        { skip: !requiresArticles || !serviceId, refetchOnMountOrArgChange: true }
    );

    // Fetch active stores
    const { data: storesData, isLoading: isLoadingStores } = useGetAllStoresQuery(
        { page: 1, limit: 100 },
        { skip: !requiresArticles }
    );

    // Lazy article search for adding articles
    const [triggerArticleSearch, { isFetching: isSearchingArticles }] =
        useLazyGetAllArticlesQuery();

    // Filter only active stores
    const storeOptions = (storesData?.data ?? [])
        .filter((store) => store.active)
        .map((store) => ({
            value: store.id,
            label: `${store.name} - ${store.type}`,
        }));

    // Clear state on service change
    useEffect(() => {
        if (prevServiceIdRef.current !== serviceId) {
            setValue("store_id", 0);
            setValue("parts", []);
            setAddArticleError(null);
            prevServiceIdRef.current = serviceId;
        }
    }, [serviceId, setValue]);

    // Hide + clear when requiresArticles is false
    useEffect(() => {
        if (!requiresArticles) {
            setValue("store_id", 0);
            setValue("parts", []);
            setAddArticleError(null);
        }
    }, [requiresArticles, setValue]);

    // Pre-fill article list from service articles
    useEffect(() => {
        if (
            requiresArticles &&
            serviceArticlesData?.data &&
            serviceArticlesData.data.length > 0 &&
            parts.length === 0
        ) {
            const preFilled: AssignmentPartItem[] = serviceArticlesData.data
                .filter((sa) => sa.is_active)
                .map((sa) => ({
                    article_id: sa.article_id,
                    article_name: sa.article_name,
                    sku: sa.article_sku,
                    quantity: Math.max(1, Math.round(sa.default_quantity)),
                }));

            if (preFilled.length > 0) {
                setValue("parts", preFilled);
            }
        }
    }, [requiresArticles, serviceArticlesData, setValue, parts.length]);

    // Handle store selection
    const handleStoreChange = (value: string | number | null) => {
        storeField.onChange(value ? Number(value) : 0);
    };

    // Handle quantity change for a part
    const handleQuantityChange = (index: number, value: string) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        const clampedValue = Math.min(10000, Math.max(1, numValue));
        const updatedParts = [...parts];
        updatedParts[index] = { ...updatedParts[index], quantity: clampedValue };
        setValue("parts", updatedParts);
    };

    // Handle removing an article
    const handleRemoveArticle = (index: number) => {
        const updatedParts = parts.filter((_, i) => i !== index);
        setValue("parts", updatedParts);
        setAddArticleError(null);
    };

    // Handle article search for adding
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

    // Handle adding an article
    const handleAddArticle = (value: string | number | null) => {
        if (!value) return;

        setAddArticleError(null);

        const articleId = Number(value);

        // Check max limit
        if (parts.length >= MAX_ARTICLES) {
            setAddArticleError("Se alcanzó el máximo de 50 artículos");
            return;
        }

        // Check duplicates
        if (parts.some((p) => p.article_id === articleId)) {
            setAddArticleError("Este artículo ya fue agregado");
            return;
        }

        // Find article info from options
        const selectedOption = articleOptions.find((opt) => opt.value === articleId);
        if (!selectedOption) return;

        // Parse SKU and name from label (format: "SKU - Name")
        const labelParts = selectedOption.label.split(" - ");
        const sku = labelParts[0] || "";
        const articleName = labelParts.slice(1).join(" - ") || "";

        const newPart: AssignmentPartItem = {
            article_id: articleId,
            article_name: articleName,
            sku: sku,
            quantity: 1,
        };

        setValue("parts", [...parts, newPart]);
        setArticleOptions([]);
    };

    // Don't render if service doesn't require articles
    if (!requiresArticles) {
        return null;
    }

    return (
        <PartsContainer>
            <FormGroup title="Partes y almacén" description="Seleccione el almacén y configure los artículos a consumir">
                <pre>{JSON.stringify(ListArticles, null, 2)}</pre>
                {/* Error loading service articles */}
                {isServiceArticlesError && (
                    <Text variant="body2" color="error">
                        No se pudieron cargar los artículos del servicio
                    </Text>
                )}

                {/* Store selector */}
                <SearchableSelect
                    label="Almacén"
                    placeholder="Buscar almacén..."
                    options={storeOptions}
                    value={storeId > 0 ? storeId : null}
                    onChange={handleStoreChange}
                    loading={isLoadingStores}
                    error={errors.store_id?.message}
                    fullWidth
                />

                {/* Parts list */}
                {isLoadingServiceArticles ? (
                    <Text variant="body2" color="muted">
                        Cargando artículos del servicio...
                    </Text>
                ) : (
                    <>
                        {parts.length > 0 && (
                            <div>
                                <Text variant="label" weight="semibold" style={{ marginBottom: "0.5rem" }}>
                                    Artículos ({parts.length}/{MAX_ARTICLES})
                                </Text>
                                {parts.map((part, index) => (
                                    <PartRow key={`${part.article_id}-${index}`}>
                                        <PartInfo>
                                            <Text variant="body2" weight="medium">
                                                {part.article_name}
                                            </Text>
                                            <Text variant="caption" color="muted">
                                                SKU: {part.sku}
                                            </Text>
                                        </PartInfo>
                                        <QuantityInput>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={10000}
                                                step={1}
                                                value={part.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(index, e.target.value)
                                                }
                                                error={
                                                    errors.parts?.[index]?.quantity?.message
                                                }
                                            />
                                        </QuantityInput>
                                        <IconButton
                                            icon={<FaTrash />}
                                            variant="ghost"
                                            color="danger"
                                            size="sm"
                                            onClick={() => handleRemoveArticle(index)}
                                            aria-label="Eliminar artículo"
                                        />
                                    </PartRow>
                                ))}
                            </div>
                        )}

                        {/* Parts-level error */}
                        {errors.parts?.message && (
                            <Text variant="caption" color="error">
                                {errors.parts.message}
                            </Text>
                        )}

                        {/* Add article section */}
                        <Flex direction="column" gap="xs">
                            <SearchableSelect
                                label="Agregar artículo"
                                placeholder="Buscar por nombre o SKU (mín. 2 caracteres)"
                                options={articleOptions}
                                value={null}
                                onChange={handleAddArticle}
                                onSearch={handleArticleSearch}
                                loading={isSearchingArticles}
                                error={addArticleError || undefined}
                                fullWidth
                            />
                        </Flex>
                    </>
                )}
            </FormGroup>
        </PartsContainer>
    );
};

export default AssignServiceParts;
