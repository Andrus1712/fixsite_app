import { z } from "zod";

/**
 * Schema para el formulario de creación/edición de un Servicio del catálogo.
 */
export const ServiceSchema = z.object({
    code: z.string().min(1, "El código es requerido.").max(50, "El código no puede exceder 50 caracteres."),
    description: z.string().min(1, "La descripción es requerida.").max(255, "La descripción no puede exceder 255 caracteres."),
    base_price: z
        .number({ error: "El precio base debe ser un número." })
        .positive("El precio base debe ser mayor a 0."),
    is_active: z.boolean(),
    requires_articles: z.boolean(),
});

/** Tipo inferido del schema */
export type ServiceFormData = z.infer<typeof ServiceSchema>;

/** Valores por defecto para useForm */
export const serviceDefaultValues: ServiceFormData = {
    code: "",
    description: "",
    base_price: 0,
    is_active: true,
    requires_articles: false,
};
