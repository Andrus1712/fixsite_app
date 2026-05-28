import { z } from "zod";

/**
 * Schema para crear/editar un servicio aplicado a una orden
 */
export const OrderServiceSchema = z.object({
    order_id: z.number().int("El ID de la orden debe ser un entero."),
    service_id: z.number().int("El ID del servicio debe ser un entero."),
    price: z
        .number({ invalid_type_error: "El precio debe ser un número." })
        .positive("El precio debe ser mayor a 0.")
        .optional(),
    estimated_minutes: z
        .number({ invalid_type_error: "El tiempo debe ser un número." })
        .int("El tiempo debe ser un entero.")
        .positive("El tiempo debe ser mayor a 0.")
        .optional(),
    notes: z.string().optional(),
    issue_ids: z.array(z.number().int()).min(1, "Debe seleccionar al menos una falla."),
});

export type OrderServiceFormData = z.infer<typeof OrderServiceSchema>;

export const orderServiceDefaultValues: Partial<OrderServiceFormData> = {
    price: undefined,
    estimated_minutes: undefined,
    notes: "",
    issue_ids: [],
};
