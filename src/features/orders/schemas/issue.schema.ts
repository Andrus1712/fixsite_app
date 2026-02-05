import { z } from "zod";
import { FileUploadSchema } from "../../../shared/schemas";

/**
 * Schema para problemas/fallas reportadas
 * @description Valida la información de problemas reportados en el dispositivo
 */
export const IssueSchema = z.object({
    issue_name: z.string().optional(),
    issue_description: z.string().min(1, "La descripción del problema es obligatoria."),
    issue_type: z
        .number({ message: "El tipo de problema es obligatorio." })
        .int()
        .positive()
        .nullable(),
    issue_code: z
        .number({ message: "El código de problema es obligatorio." })
        .int()
        .positive(),
    issue_severity: z
        .number({ message: "La severidad del problema es obligatoria." })
        .int()
        .positive()
        .nullable(),
    issue_additional_info: z.string().optional(),
    issue_steps_to_reproduce: z.array(z.string()).optional(),
    issue_environment: z.string().optional(),
    issue_additional_notes: z.string().optional(),
    issue_files: z.array(FileUploadSchema).optional(),
});

/**
 * Tipo inferido del schema de problema
 */
export type IssueFormData = z.infer<typeof IssueSchema>;

/**
 * Valores por defecto para un problema
 */
export const issueDefaultValues: IssueFormData = {
    issue_name: "",
    issue_description: "",
    issue_type: null,
    issue_code: 0,
    issue_severity: null,
    issue_additional_info: "",
    issue_steps_to_reproduce: [],
    issue_environment: "",
    issue_additional_notes: "",
    issue_files: [],
};
