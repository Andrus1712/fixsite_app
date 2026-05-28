import { z } from "zod";

/**
 * Schema para el formulario de creación/edición de un Servicio por Tipo de Orden.
 */
export const ServiceOrderTypeSchema = z.object({
    service_id: z
        .number({ error: "El servicio es requerido." })
        .min(1, "El servicio es requerido."),
    order_type_id: z
        .number({ error: "El tipo de orden es requerido." })
        .min(1, "El tipo de orden es requerido."),
    failure_code_id: z.number().optional().nullable(),
    price: z
        .number({ error: "El precio debe ser un número." })
        .positive("El precio debe ser mayor a 0."),
    estimated_minutes: z
        .number({ error: "El tiempo estimado debe ser un número." })
        .int("El tiempo estimado debe ser un número entero.")
        .positive("El tiempo estimado debe ser mayor a 0."),
    is_active: z.boolean(),
});

/** Tipo inferido del schema */
export type ServiceOrderTypeFormData = z.infer<typeof ServiceOrderTypeSchema>;

/** Valores por defecto para useForm */
export const serviceOrderTypeDefaultValues: ServiceOrderTypeFormData = {
    service_id: 0,
    order_type_id: 0,
    failure_code_id: null,
    price: 0,
    estimated_minutes: 0,
    is_active: true,
};
