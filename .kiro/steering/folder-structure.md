# Estructura de Carpetas y Convenciones

## Responsabilidad de Cada Carpeta

### `src/app/` — Configuración Core
Infraestructura global que no pertenece a la lógica de negocio.
- `providers/` — Proveedores de contexto globales (Redux, Theme, Toast, Auth)
- `router/` — Configuración de rutas y layouts principales

### `src/features/[modulo]/` — Lógica de Negocio
Cada módulo sigue esta estructura interna:
```
[modulo]/
├── components/   # Componentes visuales exclusivos del módulo (con lógica de negocio)
├── pages/        # Páginas/vistas accesibles mediante rutas
├── services/     # Definición de APIs RTK-Query (endpoints)
├── schemas/      # Validaciones Zod y tipos específicos del módulo
├── hooks/        # Hooks personalizados del módulo (opcional)
└── store/        # Slices de Redux específicos (solo si se requieren fuera de RTK-Query)
```

### `src/shared/` — Recursos Reutilizables
Código que puede ser usado por cualquier módulo.
- `components/` — Librería UI base (Botones, Inputs, Layouts, Tablas, etc.)
- `schemas/common/` — Schemas Zod reutilizables en múltiples módulos
- `store/` — `baseApi` de RTK-Query y configuración del store central
- `styles/` — Variables globales CSS y configuración de Styled Components
- `types/` — Tipos globales y `theme.ts`
- `utils/` — Funciones utilitarias puras y constantes globales

### `src/assets/` — Recursos Estáticos
Imágenes, iconos y fuentes.

---

## Organización de Schemas

### Schemas Compartidos
- **Ruta:** `src/shared/schemas/common/`
- **Cuándo:** Se reutilizan en **más de un** módulo (ej: archivos, contactos, direcciones)
- **Exportación:** A través de `src/shared/schemas/index.ts`

### Schemas de Módulo
- **Ruta:** `src/features/[modulo]/schemas/`
- **Cuándo:** Son específicos de **un solo** módulo
- **Regla:** NUNCA colocar schemas específicos de un módulo en `shared/`
- **Exportación:** A través de `src/features/[modulo]/schemas/index.ts`

---

## Convenciones de Nombres

| Elemento | Formato | Ejemplo |
|---|---|---|
| Archivo schema | `[nombre].schema.ts` | `device.schema.ts` |
| Schema Zod | `[Nombre]Schema` | `DeviceDataSchema` |
| Tipo TypeScript | `[Nombre]FormData` | `DeviceFormData` |
| Valores por defecto | `[nombre]DefaultValues` | `deviceDefaultValues` |
| Archivo de servicio | `[Nombre]Api.ts` | `OrdersApi.ts` |
| Componente | `PascalCase.tsx` | `OrderCard.tsx` |
| Hook | `use[Nombre].ts` | `useOrderStatus.ts` |

---

## Patrón de Importación

```typescript
// Shared → Feature (schemas comunes)
import { FileUploadSchema } from "@/shared/schemas";

// Feature → Componente (schemas del módulo)
import { OrderSchema, type OrderFormData } from "../schemas";

// Componentes shared
import { Button, Card, DataTable } from "@/shared/components";
```

---

## Checklist al Crear un Nuevo Módulo

1. Crear carpeta en `src/features/[nombre-modulo]/`
2. Agregar subcarpetas: `pages/`, `services/`, `schemas/`
3. Crear `schemas/index.ts` que exporte todos los schemas del módulo
4. Crear el servicio RTK-Query en `services/[Nombre]Api.ts` extendiendo `baseApi`
5. Registrar las rutas en `src/app/router/`
6. Si necesita estado global propio, crear `store/[nombre]Slice.ts`

---

## Checklist al Crear un Schema

1. ¿Se usa en más de un módulo? → `shared/schemas/common/` | No → `features/[modulo]/schemas/`
2. Nombrar archivo como `[nombre].schema.ts`
3. Exportar: `[Nombre]Schema`, `type [Nombre]FormData`, `[nombre]DefaultValues`
4. Mensajes de validación **siempre en español**
5. Agregar export en el `index.ts` correspondiente
