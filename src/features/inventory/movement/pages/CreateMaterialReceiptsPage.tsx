import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormGroup, Label, LoadingSpinner, SearchableSelect, useToast } from "../../../../shared/components";
import { type MaterialReceiptsFormData, materialReceiptsSchema } from "../schemas/material-receipts.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";
import { useGetAllStoresQuery, useGetStoreInventoryByIdQuery } from "../../store/services/StoreApi";
import { MaterialReceiptsItemsManager } from "../components/MaterialReceiptsItemsManager";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { useCreateMaterialReceiptsRequestMutation } from "../services/MaterialReceiptsApi";

const CreateMaterialReceiptsPage = () => {

    const navigator = useNavigate();
    const { state } = useLocation();
    const storeParams = state?.store;
    const { showError, showSuccess } = useToast();

    const { register, watch, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<MaterialReceiptsFormData>({
        resolver: zodResolver(materialReceiptsSchema),
        defaultValues: {
            store_id: storeParams?.id || undefined,
            purchaseOrder_id: 0,
            items: [],
        }
    });

    const formData = watch();

    const { data: stores, error: storesError, isLoading: isStoresLoading } = useGetAllStoresQuery({
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


    const [createMaterialReceipts] = useCreateMaterialReceiptsRequestMutation();

    const onSubmitCreateMaterialReceipts = async (data: MaterialReceiptsFormData) => {
        try {
            const result = await createMaterialReceipts(data);

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear la solicitud");
            } else {
                showSuccess(`MR-${result.data.data.id}`, "Solicitud creada correctamente");
                navigator("/app/inventory/store/" + storeParams?.id);
            }
        } catch (error: any) {
            console.error("Error al actualizar inventario:", error);
            showError(error?.data?.message, "Error al actualizar el inventario");
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
                    <Button variant="success" onClick={handleSubmit(onSubmitCreateMaterialReceipts)} loading={isSubmitting}>
                        Guardar
                    </Button>
                </ButtonGroup>
            } showDivider={false}>
            <form onSubmit={handleSubmit(onSubmitCreateMaterialReceipts)}>
                <Flex direction="column" justify="space-between" gap={"xxl"} fullHeight>
                    <FormGroup>
                        <Label htmlFor="store">Bodega de Destino:</Label>
                        <SearchableSelect
                            id="store"
                            name="store"
                            value={formData.store_id}
                            onChange={(value) => {
                                setValue("store_id", Number(value));
                            }}
                            options={storeParams ? [{
                                label: `${storeParams.name} - ${storeParams.type}`,
                                value: Number(storeParams.id)
                            }] :
                                stores?.data?.map((s: any) => ({
                                    value: s.id,
                                    label: `${s.name} - ${s.type}`,
                                })) || []
                            }
                            placeholder="Seleccionar la bodega de destino"
                            // onSearch={handleCa}
                            isLoading={isStoresLoading}
                            serverError={storesError}
                            error={errors?.store_id?.message}
                        />

                        <Label htmlFor="store">Asociar orden de compra:</Label>
                        <SearchableSelect
                            id="purchaseOrderId"
                            name="purchaseOrderId"
                            value={""}
                            options={[]}
                            placeholder="Seleccionar una orden de compra"
                        />
                    </FormGroup>

                    <FormGroup>
                        <MaterialReceiptsItemsManager
                            items={formData.items || []}
                            articles={articles?.data.map((item: any) => ({
                                id: item.articles_id,
                                name: item.articles_name,
                                sku: item.articles_sku,
                                description: item.articles_description,
                                stock: item.inventory_stock,
                                store_id: item.stores_id,
                                store_name: item.stores_name,
                                articles_unit_measurement: item.articles_unit_measurement
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
export default CreateMaterialReceiptsPage;