import { z } from "zod";
import { FileUploadSchema } from "../../../shared/schemas";

/**
 * Schema para fallas reportadas en una orden
 * @description Valida la información de fallas reportadas en el dispositivo
 */
export const IssueSchema = z.object({
    title: z.string().optional(),
    description: z.string().min(1, "La descripción del problema es obligatoria."),
    failure_code_id: z
        .number({ message: "El código de falla es obligatorio." })
        .int()
        .positive(),
    additional_notes: z.string().optional(),
    steps_to_reproduce: z.array(z.string()).optional(),
    reported_by: z.string().optional(),
    attachments: z.array(FileUploadSchema).optional(),
});

/** Tipo inferido del schema de falla */
export type IssueFormData = z.infer<typeof IssueSchema>;

/** Valores por defecto para una falla */
export const issueDefaultValues: IssueFormData = {
    title: "",
    description: "",
    failure_code_id: 0,
    additional_notes: "",
    steps_to_reproduce: [],
    reported_by: "",
    attachments: [],
};
