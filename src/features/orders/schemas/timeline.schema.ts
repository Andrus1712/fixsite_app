import { z } from "zod";

/**
 * Schema para línea de tiempo del servicio
 * @description Valida fechas y tiempos estimados de completación
 */
export const TimelineSchema = z.object({
    estimated_completion: z.string().optional(),
    estimated_hours: z.number().min(0, "Las horas deben ser cero o positivas.").optional(),
    sla_deadline: z.string().optional(),
});

/**
 * Tipo inferido del schema de timeline
 */
export type TimelineFormData = z.infer<typeof TimelineSchema>;

/**
 * Valores por defecto para timeline
 */
export const timelineDefaultValues: TimelineFormData = {
    estimated_completion: "",
    estimated_hours: 0,
    sla_deadline: "",
};
