import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormGroup, Label, LoadingSpinner, SearchableSelect, useToast } from "../../../../shared/components";
import { type StockTransferFormData, stockTransferSchema } from "../schemas/stock-transfer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";
import { useGetAllArticlesQuery } from "../../article/services/ArticleApi";
import { StockTransferItemsManager } from "../components/StockTransferItemsManager";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { useCreateStockTransferMutation } from "../services/StockTransfersApi";
import { useGetAllStoresQuery, useGetStoreInventoryByIdQuery } from "../../storeModule/services/StoreApi";

const CreateStockTransferPage = () => {
    const navigator = useNavigate();
    const { showError, showSuccess } = useToast();

    const { state } = useLocation();
    const storeParams = state?.store;

    const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<StockTransferFormData>({
        resolver: zodResolver(stockTransferSchema),
        defaultValues: {
            fromStore_id: storeParams.id,
            toStore_id: undefined,
            items: [],
        }
    });

    const formData = watch();

    const { data: stores, isLoading: isStoresLoading } = useGetAllStoresQuery({
        page: 1,
        limit: 100,
    });

    const { data: articles } = useGetStoreInventoryByIdQuery({
        page: 1,
        filter: "",
        limit: 100,
        store_id: formData.fromStore_id
    }, {
        skip: !formData.fromStore_id
    });

    const [createStockTransfer] = useCreateStockTransferMutation();

    const onSubmit = async (data: StockTransferFormData) => {
        try {
            const result = await createStockTransfer(data);

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear la transferencia");
            } else {
                showSuccess(`ST-${result.data.data.id}`, "Transferencia creada correctamente");
                navigator(-1);
            }
        } catch (error: any) {
            console.error("Error:", error);
            showError(error?.data?.message, "Error al crear la transferencia");
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
                        <Label htmlFor="fromStore">Bodega de Origen:</Label>
                        <SearchableSelect
                            id="fromStore"
                            value={formData.fromStore_id}
                            onChange={(value) => setValue("fromStore_id", Number(value))}
                            options={storeParams ? [{
                                label: `${storeParams.name} - ${storeParams.type}`,
                                value: Number(storeParams.id)
                            }] :
                                stores?.data?.map((s: any) => ({
                                    value: s.id,
                                    label: `${s.name} - ${s.type}`,
                                })) || []
                            }
                            placeholder="Seleccionar bodega de origen"
                            isLoading={isStoresLoading}
                            error={errors?.fromStore_id?.message}
                        />

                        <Label htmlFor="toStore">Bodega de Destino:</Label>
                        <SearchableSelect
                            id="toStore"
                            value={formData.toStore_id}
                            onChange={(value) => setValue("toStore_id", Number(value))}
                            options={stores?.data?.map((s: any) => ({
                                value: s.id,
                                label: `${s.name} - ${s.type}`,
                                disabled: s.id === formData.fromStore_id
                            })) || []}
                            placeholder="Seleccionar bodega de destino"
                            isLoading={isStoresLoading}
                            error={errors?.toStore_id?.message}
                        />
                    </FormGroup>

                    <FormGroup>
                        <StockTransferItemsManager
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
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Box>
    );
};
export default CreateStockTransferPage;
