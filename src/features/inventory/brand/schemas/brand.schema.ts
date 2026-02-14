import { z } from "zod";

export const BrandSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio.").max(100, "El nombre no puede exceder 100 caracteres."),
});

export type BrandFormData = z.infer<typeof BrandSchema>;

export const brandDefaultValues: BrandFormData = {
    name: "",
};
