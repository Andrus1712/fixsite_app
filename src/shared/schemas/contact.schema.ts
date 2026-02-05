import { z } from "zod";

/**
 * Schema para información de contacto
 * @description Valida email y teléfono con formatos apropiados
 */
export const ContactInfoSchema = z.object({
    email: z
        .string()
        .email({ message: "Formato de email inválido." })
        .optional()
        .or(z.literal("")),
    phone: z.string().min(1, "El teléfono es obligatorio.").optional(),
});

/**
 * Tipo inferido del schema de contacto
 */
export type ContactInfoData = z.infer<typeof ContactInfoSchema>;

/**
 * Schema para método de contacto preferido
 */
export const PreferredContactSchema = z.enum(["phone", "email", "whatsapp"], {
    message: "El contacto preferido es obligatorio.",
});

/**
 * Tipo inferido del schema de contacto preferido
 */
export type PreferredContactType = z.infer<typeof PreferredContactSchema>;
