import { z } from "zod";

export const stockTransferSchema = z.object({
    fromStore_id: z.number().min(1, "Bodega de origen es requerida"),
    toStore_id: z.number().min(1, "Bodega de destino es requerida"),
    items: z.array(z.object({
        article_id: z.number(),
        stock: z.number().min(1, "Stock debe ser mayor a 0"),
    })).min(1, "Debe agregar al menos un item"),
}).refine((data) => data.fromStore_id !== data.toStore_id, {
    message: "Las bodegas de origen y destino deben ser diferentes",
    path: ["toStore_id"],
});

export type StockTransferFormData = z.infer<typeof stockTransferSchema>;
