import { z } from "zod";
import { DeviceDataSchema, deviceDefaultValues } from "./device.schema";
import { IssueSchema, issueDefaultValues } from "./issue.schema";
import { CustomerDataSchema, customerDefaultValues } from "./customer.schema";
import { CostInfoSchema, costInfoDefaultValues } from "./cost.schema";
import { TimelineSchema, timelineDefaultValues } from "./timeline.schema";
import { noteDefaultValues, NoteSchema } from "./note.schema";

/**
 * Schema principal para crear una orden de servicio
 * @description Combina todos los sub-schemas necesarios para una orden completa
 */
export const OrderSchema = z.object({
    serviceType: z
        .number({ message: "El tipo de servicio es obligatorio." })
        .int({ message: "El tipo de servicio es obligatorio." })
        .positive({ message: "El tipo de servicio es obligatorio." }),
    description: z.string().optional(),
    device_data: DeviceDataSchema,
    issues: z.array(IssueSchema).min(1, "Debe haber al menos un problema reportado."),
    customer_data: CustomerDataSchema,
    cost_info: CostInfoSchema.optional(),
    timeline: TimelineSchema.optional(),
    notes: z.array(NoteSchema).optional(),
    priority: z.number().int().positive(),
});

/**
 * Tipo inferido del schema de orden
 */
export type OrderFormData = z.infer<typeof OrderSchema>;

/**
 * Valores por defecto para el formulario de orden
 * @description Valores iniciales recomendados para crear una nueva orden
 */
export const orderDefaultValues: OrderFormData = {
    serviceType: 1,
    description: "",
    device_data: deviceDefaultValues,
    issues: [issueDefaultValues],
    customer_data: customerDefaultValues,
    cost_info: costInfoDefaultValues,
    timeline: timelineDefaultValues,
    notes: [noteDefaultValues],
    priority: 1,
};
