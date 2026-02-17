import { useForm } from "react-hook-form";
import { Box, Button, Flex, FormGroup, Input, Label, LoadingSpinner, SearchableSelect, useToast } from "../../../../shared/components";
import { type InventoryAdjustmentFormData, inventoryAdjustmentSchema } from "../schemas/inventory-adjustment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router";
import { useGetAllStoresQuery, useGetStoreInventoryByIdQuery } from "../../store/services/StoreApi";
import { InventoryAdjustmentItemsManager } from "../components/InventoryAdjustmentItemsManager";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { useCreateInventoryAdjustmentMutation } from "../services/InventoryAdjustmentsApi";

const CreateInventoryAdjustmentPage = () => {
    const navigator = useNavigate();
    const { state } = useLocation();
    const storeParams = state?.store;

    const { showError, showSuccess } = useToast();

    const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<InventoryAdjustmentFormData>({
        resolver: zodResolver(inventoryAdjustmentSchema),
        defaultValues: {
            store_id: storeParams?.id || undefined,
            reason: "",
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

    const [createInventoryAdjustment] = useCreateInventoryAdjustmentMutation();

    const onSubmit = async (data: InventoryAdjustmentFormData) => {
        try {
            const result = await createInventoryAdjustment(data);

            if (result.error) {
                showError(result.error?.data?.message || "Error al crear el ajuste");
            } else {
                showSuccess(`IA-${result.data.data.id}`, "Ajuste creado correctamente");
                if (storeParams?.id) {
                    navigator("/app/inventory/store/" + storeParams.id);
                } else {
                    navigator(-1);
                };

            }
        } catch (error: any) {
            console.error("Error:", error);
            showError(error?.data?.message, "Error al crear el ajuste");
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

                        <Label htmlFor="reason">Razón del Ajuste:</Label>
                        <Input
                            id="reason"
                            {...register("reason")}
                            placeholder="Ej: Ajuste por inventario físico"
                            error={errors?.reason?.message}
                        />
                    </FormGroup>

                    <FormGroup>
                        <InventoryAdjustmentItemsManager
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
export default CreateInventoryAdjustmentPage;
