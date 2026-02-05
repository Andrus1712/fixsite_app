# Form Schemas Structure

> Ver diagrama detallado en: [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)

Este directorio (`src/shared/schemas`) contiene **solo schemas comunes y reutilizables** que se usan en toda la aplicación.

Los schemas específicos de cada módulo (feature) **NO** deben estar aquí. Deben ubicarse en su respectivo directorio de feature:
- `src/features/[modulo]/schemas/`

## Organización

```
src/
├── shared/
│   └── schemas/                   # ✅ SOLO schemas comunes/reutilizables
│       ├── README.md
│       ├── index.ts              # Exporta solo schemas comunes
│       └── common/
│           ├── index.ts
│           ├── address.schema.ts
│           ├── contact.schema.ts
│           └── file.schema.ts
└── features/
    └── [feature-name]/
        └── schemas/               # ✅ Schemas específicos del feature
            ├── index.ts
            ├── [entity].schema.ts
            └── ...
```

### Ejemplo: Orders Feature

```
src/features/orders/
├── components/
├── pages/
├── services/
└── schemas/                       # ✅ Schemas de orders aquí
    ├── index.ts
    ├── order.schema.ts
    ├── device.schema.ts
    ├── issue.schema.ts
    ├── customer.schema.ts
    ├── cost.schema.ts
    └── timeline.schema.ts
```

## Naming Convention

- **File names**: Use `.schema.ts` suffix (e.g., `device.schema.ts`)
- **Schema names**: Use PascalCase with `Schema` suffix (e.g., `DeviceDataSchema`)
- **Type names**: Use PascalCase with type descriptor (e.g., `DeviceFormData`, `DeviceData`)

## Schema File Structure

Each schema file should follow this structure:

```typescript
import { z } from "zod";

/**
 * Schema description
 * @description What this schema validates
 */
export const EntityNameSchema = z.object({
    // fields with validation and error messages
});

/**
 * Type inferred from the schema
 */
export type EntityNameData = z.infer<typeof EntityNameSchema>;

/**
 * Default values for the form (optional)
 */
export const entityNameDefaultValues: EntityNameData = {
    // default values
};
```

## Best Practices

1. **Validation Messages**: Always provide clear Spanish error messages
2. **Optional Fields**: Use `.optional()` for non-required fields
3. **Reusability**: Extract common patterns to `common/` directory
4. **Type Safety**: Always export inferred types
5. **Default Values**: Export default values when used in forms
6. **Documentation**: Add JSDoc comments for complex schemas

## Usage Example

### Importar Schemas Comunes (desde shared)
```typescript
// Schemas reutilizables - desde shared/schemas
import { FileUploadSchema, ContactInfoSchema } from "@/shared/schemas";
```

### Importar Schemas de Features
```typescript
// Schemas específicos - desde el feature correspondiente
import { 
    OrderSchema, 
    type OrderFormData, 
    orderDefaultValues 
} from "@/features/orders/schemas";

// Usar en el formulario
const methods = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: orderDefaultValues,
});
```

### Componer Schemas (Feature usando Common)
```typescript
// En src/features/orders/schemas/issue.schema.ts
import { z } from "zod";
import { FileUploadSchema } from "@/shared/schemas"; // ✅ Importar común

export const IssueSchema = z.object({
    issue_files: z.array(FileUploadSchema).optional(),
    // ... otros campos
});
```
