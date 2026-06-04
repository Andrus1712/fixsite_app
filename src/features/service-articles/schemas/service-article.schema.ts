import { z } from "zod";

/**
 * Schema para validación del formulario de ServiceArticle (crear/editar)
 */
export const ServiceArticleSchema = z.object({
    article_id: z.number().min(1, "Debe seleccionar un artículo."),
    default_quantity: z
        .number({ error: "La cantidad debe ser un número." })
        .min(0.01, "La cantidad debe ser un número entre 0.01 y 9999.99")
        .max(9999.99, "La cantidad debe ser un número entre 0.01 y 9999.99")
        .refine(
            (val) => Number((val * 100).toFixed(0)) === val * 100,
            "La cantidad permite máximo 2 decimales."
        ),
    is_active: z.boolean(),
});

/** Tipo inferido del schema */
export type ServiceArticleFormData = z.infer<typeof ServiceArticleSchema>;

/** Valores por defecto para useForm */
export const serviceArticleDefaultValues: ServiceArticleFormData = {
    article_id: 0,
    default_quantity: 1,
    is_active: true,
};
