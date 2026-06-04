import { z } from "zod";

/**
 * Schema para un artículo individual en la sección de partes de asignación
 */
export const AssignmentPartItemSchema = z.object({
    article_id: z.number().min(1),
    article_name: z.string(),
    sku: z.string(),
    quantity: z
        .number({ error: "La cantidad debe ser un número entero." })
        .int("La cantidad debe ser un número entero.")
        .min(1, "La cantidad mínima es 1.")
        .max(10000, "La cantidad máxima es 10000."),
});

/** Tipo inferido del item de parte */
export type AssignmentPartItem = z.infer<typeof AssignmentPartItemSchema>;

/**
 * Schema para la sección de partes en el formulario de asignación de servicio
 */
export const AssignmentPartsSchema = z.object({
    store_id: z.number().min(1, "Debe seleccionar un almacén."),
    parts: z
        .array(AssignmentPartItemSchema)
        .min(1, "Debe incluir al menos una parte.")
        .max(50, "Se alcanzó el máximo de 50 artículos."),
});

/** Tipo inferido del schema de partes de asignación */
export type AssignmentPartsFormData = z.infer<typeof AssignmentPartsSchema>;

/** Valores por defecto para useForm */
export const assignmentPartsDefaultValues: AssignmentPartsFormData = {
    store_id: 0,
    parts: [],
};
