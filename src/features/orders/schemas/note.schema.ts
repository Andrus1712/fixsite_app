import { z } from "zod";

/**
 * Schema para notas de la orden
 * @description Valida la información de notas y comentarios asociados a la orden
 */
export const NoteSchema = z.object({
    content: z.string().min(1, "El contenido de la nota no puede estar vacío"),
    type: z.enum(["INTERNAL", "PUBLIC"]),
    created_at: z.date().optional(),
});

/**
 * Tipo inferido del schema de nota
 */
export type NoteFormData = z.infer<typeof NoteSchema>;

/**
 * Valores por defecto para una nota
 */
export const noteDefaultValues: NoteFormData = {
    content: "",
    type: "INTERNAL",
};
