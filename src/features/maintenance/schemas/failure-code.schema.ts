import { z } from "zod";

/**
 * Schema para el formulario de creación/edición de un Código de Falla.
 */
export const FailureCodeSchema = z.object({
    code: z.string().min(1, "El código es requerido.").max(50, "El código no puede exceder 50 caracteres."),
    name: z.string().min(1, "El nombre es requerido.").max(255, "El nombre no puede exceder 255 caracteres."),
    description: z.string().optional(),
    estimatedRepairMinutes: z
        .number({ invalid_type_error: "El tiempo estimado debe ser un número." })
        .int("El tiempo estimado debe ser un número entero.")
        .positive("El tiempo estimado debe ser mayor a 0."),
    isActive: z.boolean(),
    categoryId: z.number({ invalid_type_error: "La categoría es requerida." }).min(1, "La categoría es requerida."),
    deviceTypeId: z.number({ invalid_type_error: "El tipo de dispositivo es requerido." }).min(1, "El tipo de dispositivo es requerido."),
    severityId: z.number({ invalid_type_error: "La severidad es requerida." }).min(1, "La severidad es requerida."),
});

/** Tipo inferido del schema */
export type FailureCodeFormData = z.infer<typeof FailureCodeSchema>;

/** Valores por defecto para useForm */
export const failureCodeDefaultValues: FailureCodeFormData = {
    code: "",
    name: "",
    description: "",
    estimatedRepairMinutes: 0,
    isActive: true,
    categoryId: 0,
    deviceTypeId: 0,
    severityId: 0,
};
