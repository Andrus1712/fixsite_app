import { FaCog, FaExchangeAlt, FaShare } from "react-icons/fa";
import { Badge, Box, Button, DataTable, FormGroup, Input, Modal, Text, LoadingSpinner, Checkbox, useToast, Flex, Tooltip, TableIconButton } from "../../../../shared/components";
import { useHasPermission } from "../../../auth/hooks/useHasPermission";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useMemo, useState } from "react";
import { useGetStoreInventoryByIdQuery, useUpdateStoreInventoryMutation } from "../services/StoreApi";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { inventorySchema, type InventoryFormData } from "../schemas/inventory.schema";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { HiInboxArrowDown } from "react-icons/hi2";

const StoreArticles = () => {
    const [filter, setFilter] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [selectedInventory, setSelectedInventory] = useState<string | null>(null);
    const { showSuccess, showError } = useToast();
    const [updateInventory] = useUpdateStoreInventoryMutation();

    const { hasPermission } = useHasPermission();
    const navigator = useNavigate();

    const { store_id } = useParams();
    const { state } = useLocation();
    // consulta la info del store_id cuando no viene por parametros
    

    const store = state?.store;

    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<InventoryFormData>({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            max_stock: 0,
            min_stock: 0,
            alert_enabled: false,
        },
    });

    const closeModal = () => {
        setSelectedInventory(null);
        reset();
    };

    const openModal = (inventoryId: string, maxStock: number, minStock: number) => {
        setSelectedInventory(inventoryId);
        reset({
            max_stock: maxStock,
            min_stock: minStock,
            alert_enabled: false,
        });
    };

    const onSubmitAdjustStock = async (data: InventoryFormData) => {
        if (!selectedInventory) return;

        try {
            const result = await updateInventory({
                inventory_id: selectedInventory,
                max_stock: data.max_stock,
                min_stock: data.min_stock,
                alert_enabled: data.alert_enabled,
            });

            if (result.error) {
                showError(result.error?.data?.message || "Error al actualizar el inventario");
            } else {
                showSuccess("Inventario actualizado exitosamente");
                closeModal();
            }
        } catch (error) {
            console.error("Error al actualizar inventario:", error);
            showError("Error al actualizar el inventario");
        }
    };


    const { data, isLoading } = useGetStoreInventoryByIdQuery({
        page,
        filter,
        limit,
        store_id: Number(store_id)
    }, {
        skip: !store_id
    });

    const columns = useMemo(() => [
        {
            accessorKey: "articles_sku",
            header: "SKU",
            cell: ({ row }: any) => (
                <Flex justify="flex-start" align="center">
                    <Link to={`/app/articles/${row.original.articles_id}`}>
                        <Text>{row.original.articles_sku}</Text>
                    </Link>
                </Flex>
            ),
        },
        {
            accessorKey: "articles_name",
            header: "Nombre",
            cell: ({ row }: any) => (
                <Text variant="body2" weight="bold">{row.original.articles_name}</Text>
            ),
            size: 350
        },
        {
            accessorKey: "article_categories_name",
            header: "Categoría"
        },
        {
            accessorKey: "article_brands_name",
            header: "Marca"
        },
        {
            accessorKey: "stores_name",
            header: "Bodega"
        },
        {
            header: "Cantidad",
            cell: ({ row }: any) => (
                <Tooltip position="bottom" content={`Max: ${row.original.inventory_max_stock} - Min: ${row.original.inventory_min_stock}`}>
                    <Flex justify="center">
                        <Text variant="body2">{row.original.inventory_stock}</Text>
                    </Flex>
                </Tooltip>
            ),
        },
        {
            accessorKey: "articles_unit_measurement",
            header: "Medida"
        },
        {
            header: "Estado",
            cell: ({ row }: any) => (
                <Tooltip position="bottom" content={`Max: ${row.original.inventory_max_stock} - Min: ${row.original.inventory_min_stock}`}>
                    {row.original.inventory_stock <= row.original.inventory_min_stock ? (
                        <Badge variant="danger">Agotado</Badge>
                    ) : row.original.inventory_max_stock - row.original.inventory_stock <= 5 ? (
                        <Badge variant="warning">Pocas unidades</Badge>
                    ) : (
                        <Badge variant="success">Disponible</Badge>
                    )}
                </Tooltip>
            )
        },
        {
            header: "Accion",
            cell: ({ row }: any) => (
                <Flex align="center" justify="flex-start">
                    <TableIconButton color="primary" icon={<FaCog />} tooltip="Configurar stock" onClick={() => openModal(
                        row.original.inventory_id,
                        row.original.inventory_max_stock,
                        row.original.inventory_min_stock
                    )} />
                </Flex>
            ),
            size: 80
        }
    ], []);

    return (
        <>
            <Box
                $p="lg"
                $shadow
                rounded
                $fullWidth
                title={`Inventario ${store?.type || ""} ${store?.name || ""}`}
                bg="white"
                headerActions={
                    <>
                        <ButtonGroup>
                            {hasPermission("material-receipts-new") &&
                                <Button
                                    leftIcon={<HiInboxArrowDown />}
                                    variant="indigo"
                                    onClick={() => navigator("/app/material-receipts/new", {
                                        state: { store }
                                    })}
                                >
                                    Agregar Articulo
                                </Button>
                            }

                            {hasPermission("stock-transfer-new") &&
                                <Button
                                    leftIcon={<FaShare />}
                                    variant="pink"
                                    onClick={() => navigator("/app/stock-transfer/new", {
                                        state: { store }
                                    })}
                                >
                                    Traslado
                                </Button>
                            }
                            {hasPermission("inventory-adjustments-new") &&
                                <Button
                                    leftIcon={<FaExchangeAlt />}
                                    variant="warning"
                                    onClick={() => navigator("/app/inventory-adjustments/new", {
                                        state: { store }
                                    })}
                                >
                                    Ajustar Stock
                                </Button>
                            }
                        </ButtonGroup>
                    </>
                }
            >
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <DataTable
                        data={data?.data || []}
                        columns={columns}
                        initialPageSize={limit ?? 25}
                        pageSizeOptions={[10, 25, 50, 100]}
                        serverSide={true}
                        page={data?.pagination.page}
                        total={data?.pagination.total}
                        totalPages={data?.pagination.totalPages}
                        searchValue={filter}
                        onSearchChange={setFilter}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                    />
                )}
            </Box>
            <Modal isOpen={!!selectedInventory} onClose={closeModal} title="Configuración del Item">
                <form onSubmit={handleSubmit(onSubmitAdjustStock)}>
                    <FormGroup>
                        <Input
                            label="Stock Máximo"
                            type="number"
                            placeholder="Ingrese el stock máximo"
                            fullWidth={false}
                            error={errors.max_stock?.message}
                            {...register("max_stock", { valueAsNumber: true })}
                        />
                        <Input
                            label="Stock Mínimo"
                            type="number"
                            placeholder="Ingrese el stock mínimo"
                            fullWidth={false}
                            error={errors.min_stock?.message}
                            {...register("min_stock", { valueAsNumber: true })}
                        />
                        <Controller
                            name="alert_enabled"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    label="Activar Alerta de Notificaciones"
                                    checked={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </FormGroup>
                    <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "16px" }}>
                        <Button variant="secondary" onClick={closeModal} type="button">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" loading={isSubmitting}>
                            Guardar
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};
export default StoreArticles;