# Schemas y Formularios

## Stack de Formularios
- **React Hook Form 7** — manejo de estado del formulario
- **Zod 4** — validación y tipado
- **@hookform/resolvers** — integración entre ambos

---

## Estructura de un Schema

Cada archivo `.schema.ts` sigue esta estructura exacta:

```typescript
import { z } from "zod";
// Importar schemas comunes si aplica
import { FileUploadSchema } from "@/shared/schemas";

/**
 * Schema para [descripción de qué valida]
 */
export const EntityNameSchema = z.object({
  field_name: z.string().min(1, "El campo es requerido."),
  // ... más campos
});

/** Tipo inferido del schema */
export type EntityNameFormData = z.infer<typeof EntityNameSchema>;

/** Valores por defecto para useForm (exportar siempre) */
export const entityNameDefaultValues: EntityNameFormData = {
  field_name: "",
};
```

**Reglas de validación:**
- Mensajes de error **siempre en español**, claros y específicos
- Números: especificar `.int()` y `.positive()` cuando aplique
- Opcionales: usar `.optional()` o `.nullable()` según corresponda
- Arrays: especificar `.min(1, "...")` cuando se requiera al menos un elemento
- Emails: `z.string().email({ message: "Email inválido." })`
- Enums: `z.enum(["a", "b"], { message: "Opción inválida." })`

---

## Uso en Componentes

### Formulario simple
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EntitySchema, type EntityFormData, entityDefaultValues } from "../schemas";

const { register, handleSubmit, formState: { errors } } = useForm<EntityFormData>({
  resolver: zodResolver(EntitySchema),
  defaultValues: entityDefaultValues,
});
```

### Formulario con tabs (FormProvider)
```typescript
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormTabs } from "@/shared/components";

const methods = useForm<EntityFormData>({
  resolver: zodResolver(EntitySchema),
  defaultValues: entityDefaultValues,
});

const tabs = [
  {
    label: "Pestaña 1",
    content: <MiFormulario />,
    validationFields: ["campo1", "campo2"],
  },
];

return (
  <FormProvider {...methods}>
    <FormTabs
      tabs={tabs}
      onSubmit={methods.handleSubmit(onSubmit)}
      submitLabel="Guardar"
      showNavigation
    />
  </FormProvider>
);
```

---

## Composición de Schemas Complejos

Para formularios con múltiples secciones, componer schemas:

```typescript
// order.schema.ts
import { DeviceDataSchema } from "./device.schema";
import { CustomerDataSchema } from "./customer.schema";
import { FileUploadSchema } from "@/shared/schemas"; // schema común

export const OrderSchema = z.object({
  device_data: DeviceDataSchema,
  customer_data: CustomerDataSchema,
  attachments: z.array(FileUploadSchema).optional(),
});

export type OrderFormData = z.infer<typeof OrderSchema>;
```

---

## Dónde va cada Schema

| Situación | Ubicación |
|---|---|
| Usado en 1 solo módulo | `src/features/[modulo]/schemas/[nombre].schema.ts` |
| Usado en 2+ módulos | `src/shared/schemas/common/[nombre].schema.ts` |

**Importación correcta:**
```typescript
// ✅ Schema de módulo
import { OrderSchema, type OrderFormData } from "@/features/orders/schemas";

// ✅ Schema común
import { FileUploadSchema } from "@/shared/schemas";

// ❌ Nunca importar schemas específicos de un módulo desde shared
import { OrderSchema } from "@/shared/schemas";
```

---

## Checklist al Crear un Formulario

- [ ] Schema en la carpeta correcta (`features/` o `shared/`)
- [ ] Exportar schema, tipo y defaultValues en el `index.ts`
- [ ] Mensajes de validación en español
- [ ] `useForm` con `zodResolver` y `defaultValues`
- [ ] Manejar estado `loading` en el botón de submit
- [ ] Mostrar feedback con `useToast` o `useAlert` al guardar/error
