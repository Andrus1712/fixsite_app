import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormGroup, Label, LoadingSpinner, SearchableSelect, useToast } from "../../../../shared/components";
import { type MaterialIssueFormData, materialIssueSchema } from "../schemas/material-issue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";
import { useGetAllStoresQuery, useGetStoreInventoryByIdQuery } from "../../store/services/StoreApi";
import { MaterialIssueItemsManager } from "../components/MaterialIssueItemsManager";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { useCreateMaterialIssueMutation } from "../services/MaterialIssuesApi";

const CreateMaterialIssuePage = () => {
    const navigator = useNavigate();
    const { state } = useLocation();
    const storeParams = state?.store;
    const { showError, showSuccess } = useToast();

    const { watch, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<MaterialIssueFormData>({
        resolver: zodResolver(materialIssueSchema),
        defaultValues: {
            store_id: storeParams?.id || undefined,
            items: [],
        }
    });

    const formData = watch();

    const { data: stores, isLoading: isStoresLoading } = useGetAllStoresQuery({
        page: 1,
        limit: 100,
    }, {
        skip: storeParams?.id
    });

    const { data: articles } = useGetStoreInventoryByIdQuery({
        page: 1,
        filter: "",
        limit: 100,
        store_id: formData.store_id
    }, {
        skip: !formData.store_id
    });

    const [createMaterialIssue] = useCreateMaterialIssueMutation();

    const onSubmit = async (data: MaterialIssueFormData) => {
        try {
            const result = await createMaterialIssue(data);

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear la salida");
            } else {
                showSuccess(`MI-${result.data.data.id}`, "Salida creada correctamente");
                if (storeParams?.id) {
                    navigator(storeParams?.id ? "/app/inventory/store/" + storeParams.id);
                } else {
                    navigator(-1);
                }
            }
        } catch (error: any) {
            console.error("Error:", error);
            showError(error?.data?.message, "Error al crear la salida");
        }
    };

    if (isSubmitting) {
        return <LoadingSpinner />;
    }

    return (
        <Box fullWidth bg="white" p={"md"} rounded shadow
            headerActions={
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => navigator(-1)} type="button">
                        Volver
                    </Button>
                    <Button variant="success" onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
                        Guardar
                    </Button>
                </ButtonGroup>
            } showDivider={false}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" justify="space-between" gap={"xxl"} fullHeight>
                    <FormGroup>
                        <Label htmlFor="store">Bodega:</Label>
                        <SearchableSelect
                            id="store"
                            value={formData.store_id}
                            onChange={(value) => setValue("store_id", Number(value))}
                            options={storeParams ? [{
                                label: `${storeParams.name} - ${storeParams.type}`,
                                value: Number(storeParams.id)
                            }] :
                                stores?.data?.map((s: any) => ({
                                    value: s.id,
                                    label: `${s.name} - ${s.type}`,
                                })) || []
                            }
                            placeholder="Seleccionar bodega"
                            isLoading={isStoresLoading}
                            error={errors?.store_id?.message}
                        />
                    </FormGroup>

                    <FormGroup>
                        <MaterialIssueItemsManager
                            items={formData.items || []}
                            articles={articles?.data.map((item: any) => ({
                                id: item.articles_id,
                                name: item.articles_name,
                                sku: item.articles_sku,
                                description: item.articles_description,
                                stock: item.inventory_stock,
                                store_id: item.stores_id,
                                store_name: item.stores_name,
                            })) || []}
                            onChange={(items) => setValue("items", items, { shouldValidate: true })}
                            error={errors?.items?.message}
                        />
                    </FormGroup>
                </Flex>
            </form>
        </Box>
    );
};
export default CreateMaterialIssuePage;
