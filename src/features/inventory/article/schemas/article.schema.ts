import { z } from "zod";

export const ArticleSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio.").max(255, "El nombre no puede exceder 255 caracteres."),
    sku: z.string().optional(),
    description: z.string().optional(),
    category_id: z.number().min(1, "La categoría es obligatoria."),
    brand_id: z.number().min(1, "La marca es obligatoria."),
    unit_measurement: z.string().min(1, "La unidad de medida es obligatoria."),
    active: z.boolean(),
});

export type ArticleFormData = z.infer<typeof ArticleSchema>;

export const articleDefaultValues: ArticleFormData = {
    name: "",
    sku: "",
    description: "",
    category_id: 0,
    brand_id: 0,
    unit_measurement: "",
    active: true,
};
