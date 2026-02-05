import { z } from "zod";

/**
 * Schema para archivos subidos
 * @description Valida la estructura de archivos subidos al servidor
 */
export const FileUploadSchema = z.object({
    filename: z.string().min(1, "El nombre del archivo es obligatorio."),
    originalName: z.string().min(1, "El nombre original es obligatorio."),
    size: z.number().positive("El tamaño debe ser positivo."),
    url: z.string(),
});

/**
 * Tipo inferido del schema de archivo
 */
export type FileUploadData = z.infer<typeof FileUploadSchema>;
