import { z } from "zod";

export const technicianSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio."),
    email: z.string().email("El email es inválido."),
    phone: z.string().min(1, "El teléfono es obligatorio."),
    certification: z.string().optional(),
    specialty: z.string().optional(),
    level: z.string().optional(),
});

export type TechnicianFormData = z.infer<typeof technicianSchema>;