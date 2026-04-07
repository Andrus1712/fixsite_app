import { z } from "zod";

export const inventoryAdjustmentSchema = z.object({
    store_id: z.number().min(1, "Bodega es requerida"),
    reason: z.string().min(1, "Razón es requerida"),
    items: z.array(z.object({
        article_id: z.number(),
        currentQuantity: z.number().min(0, "Cantidad actual debe ser mayor o igual a 0"),
        newQuantity: z.number().min(0, "Nueva cantidad debe ser mayor o igual a 0"),
    })).min(1, "Debe agregar al menos un item"),
});

export type InventoryAdjustmentFormData = z.infer<typeof inventoryAdjustmentSchema>;
