# Guía Rápida: Schemas de Formularios

## 📍 Ubicación

### Schemas Comunes (Reutilizables)
`src/shared/schemas/common/`

### Schemas de Features
`src/features/[feature]/schemas/`

## 📦 Importación

### Schemas Comunes
```typescript
// Importar schemas reutilizables
import { 
    FileUploadSchema,
    ContactInfoSchema
} from "@/shared/schemas";
```

### Schemas de Features
```typescript
// Importar schemas específicos del feature
import { 
    OrderSchema,           // Schema de validación
    type OrderFormData,    // Tipo TypeScript
    orderDefaultValues     // Valores por defecto
} from "@/features/orders/schemas";
```

## 🏗️ Estructura de Directorios

```
src/shared/schemas/
├── index.ts                    # ⭐ Exporta todo
├── common/                     # Schemas reutilizables
│   ├── file.schema.ts         # FileUploadSchema
│   └── contact.schema.ts      # ContactInfoSchema, PreferredContactSchema
└── features/                   # Por feature
    └── orders/
        ├── order.schema.ts    # OrderSchema (principal)
        ├── device.schema.ts   # DeviceDataSchema
        ├── issue.schema.ts    # IssueSchema
        ├── customer.schema.ts # CustomerDataSchema
        ├── cost.schema.ts     # CostInfoSchema
        └── timeline.schema.ts # TimelineSchema
```

## ✅ Uso con React Hook Form

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema, type OrderFormData, orderDefaultValues } from "@/shared/schemas";

const methods = useForm<OrderFormData>({
    resolver: zodResolver(OrderSchema),
    defaultValues: orderDefaultValues,
});
```

## 📝 Crear un Nuevo Schema

### 1. Crear archivo en ubicación correcta
- Común: `src/shared/schemas/common/[nombre].schema.ts`
- Feature: `src/shared/schemas/features/[feature]/[nombre].schema.ts`

### 2. Estructura del archivo

```typescript
import { z } from "zod";

/**
 * Schema para [descripción]
 * @description [Qué valida este schema]
 */
export const EntitySchema = z.object({
    field: z.string().min(1, "Mensaje de error en español."),
});

/**
 * Tipo inferido del schema
 */
export type EntityFormData = z.infer<typeof EntitySchema>;

/**
 * Valores por defecto (opcional)
 */
export const entityDefaultValues: EntityFormData = {
    field: "",
};
```

### 3. Exportar en index.ts

```typescript
// En el index.ts del directorio
export * from "./entity.schema";
```

## 🎯 Convenciones de Nombres

| Elemento | Formato | Ejemplo |
|----------|---------|---------|
| Archivo | `[nombre].schema.ts` | `device.schema.ts` |
| Schema | `[Nombre]Schema` | `DeviceDataSchema` |
| Tipo | `[Nombre]FormData` | `DeviceFormData` |
| Defaults | `[nombre]DefaultValues` | `deviceDefaultValues` |

## 🔄 Reutilización

```typescript
// Reutilizar schemas comunes
import { FileUploadSchema } from "../../common";

export const IssueSchema = z.object({
    issue_files: z.array(FileUploadSchema).optional(),
});
```

## ⚠️ Reglas Importantes

1. ✅ Mensajes de error SIEMPRE en español
2. ✅ Usar `.optional()` para campos no requeridos
3. ✅ Documentar con JSDoc
4. ✅ Exportar tipo con `z.infer<typeof Schema>`
5. ✅ Importar desde `@/shared/schemas` (no rutas directas)

## 📚 Schemas Disponibles

### Common (Reutilizables)
- `FileUploadSchema` - Archivos subidos
- `ContactInfoSchema` - Email y teléfono
- `PreferredContactSchema` - Método de contacto preferido

### Orders
- `OrderSchema` - Schema principal de orden
- `DeviceDataSchema` - Datos del dispositivo
- `IssueSchema` - Problemas/fallas
- `CustomerDataSchema` - Datos del cliente
- `CostInfoSchema` - Información de costos
- `TimelineSchema` - Línea de tiempo

## 🔍 Ejemplo Completo

```typescript
// En tu componente
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
    OrderSchema, 
    type OrderFormData, 
    orderDefaultValues 
} from "@/shared/schemas";

export default function NewOrderPage() {
    const methods = useForm<OrderFormData>({
        resolver: zodResolver(OrderSchema),
        defaultValues: orderDefaultValues,
    });

    const onSubmit = (data: OrderFormData) => {
        console.log(data); // Datos validados
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {/* Tus campos de formulario */}
            </form>
        </FormProvider>
    );
}
```

## 📖 Documentación Completa

Ver: `src/shared/schemas/README.md` y `.agent/rules/form-schemas-architecture.md`
