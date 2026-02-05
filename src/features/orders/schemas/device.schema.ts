import { z } from "zod";

/**
 * Schema para datos del dispositivo
 * @description Valida información del dispositivo a reparar
 */
export const DeviceDataSchema = z.object({
    device_name: z.string().min(1, "El nombre del dispositivo es obligatorio."),
    device_type: z
        .number({ message: "El tipo de dispositivo es obligatorio." })
        .int()
        .positive("El tipo de dispositivo es obligatorio.")
        .optional(),
    device_brand: z
        .number({ message: "La marca del dispositivo es obligatoria." })
        .int()
        .positive("La marca del dispositivo es obligatoria.")
        .optional(),
    device_model: z
        .number({ message: "El modelo del dispositivo es obligatorio." })
        .int()
        .positive("El modelo del dispositivo es obligatorio.")
        .optional(),
    serial_number: z.string().optional(),
    imei: z.string().optional(),
    color: z.string().optional(),
    storage_capacity: z.string().optional(),
});

/**
 * Tipo inferido del schema de dispositivo
 */
export type DeviceFormData = z.infer<typeof DeviceDataSchema>;

/**
 * Valores por defecto para el formulario de dispositivo
 */
export const deviceDefaultValues: DeviceFormData = {
    device_name: "",
    device_type: undefined,
    device_brand: undefined,
    device_model: undefined,
    serial_number: "",
    imei: "",
    color: "",
    storage_capacity: "",
};
