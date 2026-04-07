# Form Schemas Architecture Rule

## Ubicación de Schemas

### ✅ Schemas Comunes (Reutilizables)
**DEBEN estar en `src/shared/schemas/common/`**

Ejemplos: FileUploadSchema, ContactInfoSchema, AddressSchema, etc.

### ✅ Schemas Específicos de Features
**DEBEN estar en `src/features/[feature]/schemas/`**

Ejemplos: OrderSchema, DeviceDataSchema, CustomerDataSchema, etc.

## Estructura de Directorios

```
src/
├── shared/
│   └── schemas/                          # ✅ SOLO schemas comunes
│       ├── README.md
│       ├── QUICK_REFERENCE.md
│       ├── index.ts                      # Exporta solo common
│       └── common/
│           ├── index.ts
│           ├── file.schema.ts           # FileUploadSchema
│           ├── contact.schema.ts        # ContactInfoSchema
│           └── address.schema.ts        # AddressSchema (ejemplo)
└── features/
    ├── orders/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── schemas/                      # ✅ Schemas de orders
    │       ├── index.ts
    │       ├── order.schema.ts          # OrderSchema (principal)
    │       ├── device.schema.ts         # DeviceDataSchema
    │       ├── issue.schema.ts          # IssueSchema
    │       ├── customer.schema.ts       # CustomerDataSchema
    │       ├── cost.schema.ts           # CostInfoSchema
    │       └── timeline.schema.ts       # TimelineSchema
    ├── customers/
    │   └── schemas/                      # ✅ Schemas de customers
    │       ├── index.ts
    │       └── customer.schema.ts
    └── inventory/
        └── schemas/                      # ✅ Schemas de inventory
            ├── index.ts
            └── product.schema.ts
```

## Convenciones de Nomenclatura

### Archivos
- **Formato**: `[entidad].schema.ts`
- **Ejemplos**: `device.schema.ts`, `customer.schema.ts`, `order.schema.ts`

### Schemas (Objetos Zod)
- **Formato**: `[Entidad]Schema` o `[Entidad]DataSchema`
- **Ejemplos**: `DeviceDataSchema`, `OrderSchema`, `CustomerDataSchema`
- **Siempre en PascalCase**

### Tipos TypeScript
- **Formato**: `[Entidad]FormData` o `[Entidad]Data`
- **Ejemplos**: `OrderFormData`, `DeviceFormData`, `CustomerFormData`
- **Siempre usar `z.infer<typeof Schema>`**

### Valores por Defecto
- **Formato**: `[entidad]DefaultValues`
- **Ejemplos**: `orderDefaultValues`, `deviceDefaultValues`
- **Siempre en camelCase**

## Estructura de Archivo Schema

Cada archivo `.schema.ts` DEBE seguir esta estructura:

```typescript
import { z } from "zod";
// Importar schemas comunes si es necesario
import { FileUploadSchema } from "../../common";

/**
 * Schema para [descripción]
 * @description [Explicación detallada de qué valida]
 */
export const EntityNameSchema = z.object({
    field_name: z.string().min(1, "Mensaje de error en español."),
    // ... más campos con validaciones y mensajes
});

/**
 * Tipo inferido del schema
 */
export type EntityNameFormData = z.infer<typeof EntityNameSchema>;

/**
 * Valores por defecto para el formulario (OPCIONAL)
 */
export const entityNameDefaultValues: EntityNameFormData = {
    field_name: "",
    // ... valores por defecto
};
```

## Reglas de Validación

1. **Mensajes de Error**: SIEMPRE en español, claros y específicos
2. **Campos Opcionales**: Usar `.optional()` o `.nullable()` según corresponda
3. **Números**: Especificar `.int()` y `.positive()` cuando sea necesario
4. **Enums**: Usar `z.enum()` con mensaje de error
5. **Arrays**: Especificar `.min()` cuando se requiera al menos un elemento
6. **Emails**: Usar `.email({ message: "..." })`

## Uso en Componentes

### Importación de Schemas Comunes
```typescript
// ✅ CORRECTO - Importar schemas comunes desde shared
import { FileUploadSchema, ContactInfoSchema } from "@/shared/schemas";
```

### Importación de Schemas de Features
```typescript
// ✅ CORRECTO - Importar schemas de features desde su carpeta
import { 
    OrderSchema, 
    type OrderFormData, 
    orderDefaultValues 
} from "@/features/orders/schemas";

// ❌ INCORRECTO - No importar desde shared si es específico de feature
import { OrderSchema } from "@/shared/schemas";
```

### Composición: Feature usando Common
```typescript
// En src/features/orders/schemas/issue.schema.ts
import { z } from "zod";
import { FileUploadSchema } from "@/shared/schemas"; // ✅ Correcto

export const IssueSchema = z.object({
    issue_files: z.array(FileUploadSchema).optional(),
    // ...
});
```

### Uso con React Hook Form
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, type OrderFormData, orderDefaultValues } from "@/shared/schemas";

const methods = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: orderDefaultValues,
});
```

## Composición de Schemas

Para schemas complejos que combinan múltiples sub-schemas:

```typescript
import { DeviceDataSchema } from "./device.schema";
import { CustomerDataSchema } from "./customer.schema";

export const OrderSchema = z.object({
    device_data: DeviceDataSchema,
    customer_data: CustomerDataSchema,
    // ... otros campos
});
```

## Reutilización

- Schemas comunes (archivos, contactos, direcciones) van en `common/`
- Schemas específicos de features van en `features/[feature-name]/`
- SIEMPRE reutilizar schemas comunes en lugar de duplicar código

## Exportaciones

Cada directorio DEBE tener un `index.ts` que exporte todos sus schemas:

```typescript
// src/shared/schemas/features/orders/index.ts
export * from "./order.schema";
export * from "./device.schema";
export * from "./customer.schema";
// ... etc
```

El archivo principal `src/shared/schemas/index.ts` exporta todo:

```typescript
export * from "./common";
export * from "./features/orders";
export * from "./features/customers";
// ... etc
```

## Beneficios de esta Arquitectura

1. ✅ **Centralización**: Un solo lugar para todos los schemas
2. ✅ **Reutilización**: Evita duplicación de código
3. ✅ **Mantenibilidad**: Fácil de encontrar y actualizar
4. ✅ **Type Safety**: TypeScript infiere tipos automáticamente
5. ✅ **Consistencia**: Misma estructura en todo el proyecto
6. ✅ **Documentación**: JSDoc en cada schema
7. ✅ **Testing**: Fácil de testear schemas aisladamente

## Checklist al Crear un Nuevo Schema

### Para Schemas Comunes (Reutilizables)
- [ ] Archivo en `src/shared/schemas/common/[nombre].schema.ts`
- [ ] Nombre de archivo: `[entidad].schema.ts`
- [ ] Schema exportado: `[Entidad]Schema`
- [ ] Tipo exportado: `type [Entidad]Data = z.infer<typeof [Entidad]Schema>`
- [ ] JSDoc comentarios en schema y tipo
- [ ] Mensajes de error en español
- [ ] Exportado en `src/shared/schemas/common/index.ts`
- [ ] Importable desde `@/shared/schemas`

### Para Schemas de Features
- [ ] Crear carpeta `src/features/[feature]/schemas/` si no existe
- [ ] Archivo en `src/features/[feature]/schemas/[nombre].schema.ts`
- [ ] Nombre de archivo: `[entidad].schema.ts`
- [ ] Schema exportado: `[Entidad]Schema`
- [ ] Tipo exportado: `type [Entidad]FormData = z.infer<typeof [Entidad]Schema>`
- [ ] Valores por defecto (si aplica): `[entidad]DefaultValues`
- [ ] JSDoc comentarios en schema y tipo
- [ ] Mensajes de error en español
- [ ] Exportado en `src/features/[feature]/schemas/index.ts`
- [ ] Importado correctamente desde `@/features/[feature]/schemas` en componentes
- [ ] Si usa schemas comunes, importarlos desde `@/shared/schemas`
