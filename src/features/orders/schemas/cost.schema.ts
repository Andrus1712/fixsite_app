import { z } from "zod";

/**
 * Schema para información de costos
 * @description Valida los costos estimados del servicio
 */
export const CostInfoSchema = z.object({
    estimated_cost: z.number().min(0, "El costo debe ser cero o positivo."),
    labor_cost: z.number().min(0, "El costo de mano de obra debe ser cero o positivo."),
    parts_cost: z.number().min(0, "El costo de partes debe ser cero o positivo."),
    currency: z.string().min(1, "La moneda es obligatoria."),
});

/**
 * Tipo inferido del schema de costos
 */
export type CostInfoFormData = z.infer<typeof CostInfoSchema>;

/**
 * Valores por defecto para información de costos
 */
export const costInfoDefaultValues: CostInfoFormData = {
    estimated_cost: 0,
    labor_cost: 0,
    parts_cost: 0,
    currency: "USD",
};
