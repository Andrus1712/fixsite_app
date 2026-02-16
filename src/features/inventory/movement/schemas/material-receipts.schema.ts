import z from "zod";

export const itemReceiptSchema = z.object({
    article_id: z.number().min(1, "El articulo es requerido"),
    quantity: z.number().positive().min(1, "La cantidad debe ser mayor que 0"),
    unitCost: z.number().positive().optional(),
});

export const materialReceiptsSchema = z.object({
    store_id: z.number().min(1, "La bodega destino es requerida"),
    purchaseOrder_id: z.number().min(0, "El stock mínimo es requerido"),
    items: z.array(itemReceiptSchema).min(1, "Debe seleccionar al menos 1 articulo"),
});

export type MaterialReceiptsFormData = z.infer<typeof materialReceiptsSchema>;
