import { z } from "zod";

export const materialIssueSchema = z.object({
    store_id: z.number().min(1, "Bodega es requerida"),
    items: z.array(z.object({
        article_id: z.number(),
        quantity: z.number().min(1, "Cantidad debe ser mayor a 0"),
        destinationReference: z.string().min(1, "Referencia de destino es requerida"),
    })).min(1, "Debe agregar al menos un item"),
});

export type MaterialIssueFormData = z.infer<typeof materialIssueSchema>;
