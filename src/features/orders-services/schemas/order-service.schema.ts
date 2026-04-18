import { z } from "zod";

export const OrderServiceSchema = z.object({
    order_id: z.number().int("El ID de la orden debe ser un entero"),
    service_id: z.number().int("El ID del servicio debe ser un entero"),
    precio: z
        .number({ invalid_type_error: "El precio debe ser un número" })
        .positive("El precio debe ser mayor a 0")
        .optional(),
    tiempo_estimado_minutos: z
        .number({ invalid_type_error: "El tiempo debe ser un número" })
        .int("El tiempo debe ser un entero")
        .positive("El tiempo debe ser mayor a 0")
        .optional(),
    notas: z.string().optional(),
    activo: z.boolean().optional(),
});

export type OrderServiceFormData = z.infer<typeof OrderServiceSchema>;

export const orderServiceDefaultValues: Partial<OrderServiceFormData> = {
    precio: undefined,
    tiempo_estimado_minutos: undefined,
    notas: "",
    activo: true,
};
