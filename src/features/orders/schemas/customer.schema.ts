import { z } from "zod";
import { PreferredContactSchema } from "../../../shared/schemas";

/**
 * Schema para tipo de cliente
 */
export const CustomerTypeSchema = z.enum(["individual", "business", "other"], {
    message: "El tipo de cliente es obligatorio.",
});

/**
 * Schema para datos del cliente
 * @description Valida información del cliente que solicita el servicio
 */
export const CustomerDataSchema = z.object({
    customer_id: z
        .number({ message: "El cliente es obligatorio." })
        .int()
        .positive(),
    customer_name: z.string().min(1, "El nombre del cliente es obligatorio."),
    customer_email: z
        .string()
        .email({ message: "Formato de email inválido." })
        .optional()
        .or(z.literal("")),
    customer_phone: z.string().min(1, "El teléfono es obligatorio.").optional(),
    customer_address: z.string().optional(),
    customer_type: CustomerTypeSchema,
    preferred_contact: PreferredContactSchema,
});

/**
 * Tipo inferido del schema de cliente
 */
export type CustomerFormData = z.infer<typeof CustomerDataSchema>;

/**
 * Tipo de cliente
 */
export type CustomerType = z.infer<typeof CustomerTypeSchema>;

/**
 * Valores por defecto para el formulario de cliente
 */
export const customerDefaultValues: CustomerFormData = {
    customer_id: 0,
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
    customer_type: "individual",
    preferred_contact: "phone",
};
