import { z } from "zod";

export const CategorySchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio.").max(100, "El nombre no puede exceder 100 caracteres."),
});

export type CategoryFormData = z.infer<typeof CategorySchema>;

export const categoryDefaultValues: CategoryFormData = {
    name: "",
};
