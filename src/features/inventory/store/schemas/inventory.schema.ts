import z from "zod";

export const inventorySchema = z.object({
    max_stock: z.number().min(1, "El stock máximo es requerido"),
    min_stock: z.number().min(0, "El stock mínimo es requerido"),
    alert_enabled: z.boolean(),
});

export type InventoryFormData = z.infer<typeof inventorySchema>;
