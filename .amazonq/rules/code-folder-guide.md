# Guía de Estructura de Carpetas y Schemas

Este documento define la responsabilidad de cada carpeta en el proyecto para asegurar la consistencia y escalabilidad.

## 📂 Contexto de Carpetas (Architecture)

### 1. `src/app/` (Configuración Core)
Contiene la infraestructura global de la aplicación que no pertenece a la lógica de negocio.
- **`providers/`**: Proveedores de contexto globales (Redux, Theme, Toast, Auth).
- **`router/`**: Configuración de rutas de la aplicación y layouts principales.

### 2. `src/features/` (Lógica de Negocio/Módulos)
Es el corazón de la aplicación, organizado por dominios de negocio.
- **`[nombre_modulo]/components/`**: Componentes visuales exclusivos del módulo.
- **`[nombre_modulo]/pages/`**: Páginas/vistas accesibles mediante rutas.
- **`[nombre_modulo]/services/`**: Definición de APIs de RTK-Query (endpoints).
- **`[nombre_modulo]/schemas/`**: Validaciones Zod y tipos específicos del módulo.
- **`[nombre_modulo]/store/`**: Slices de Redux específicos (si se requieren fuera de RTK-Query).

### 3. `src/shared/` (Recursos Reutilizables)
Código compartido que puede ser utilizado por cualquier módulo o directamente por la aplicación.
- **`components/`**: Nuestra librería UI base (Botones, Inputs, Layouts genéricos).
- **`schemas/common/`**: Schemas Zod que se repiten en varios módulos (ej: teléfonos, direcciones).
- **`store/`**: El `baseApi` de RTK-Query y la configuración del store central.
- **`styles/`**: Variables globales de CSS y configuración de Styled Components.
- **`types/`**: Definiciones de tipos globales y la configuración del tema (`theme.ts`).
- **`utils/`**: Funciones de utilidad puras y constantes globales.

### 4. `src/assets/` (Recursos Estáticos)
Imágenes, iconos, fuentes y otros archivos estáticos.

---

## 🏛️ Organización de Schemas

Los schemas deben organizarse según su alcance y reutilización:

### 1. Schemas Compartidos (Shared)
- **Ruta:** `src/shared/schemas/common/`
- **Uso:** Schemas que se reutilizan en **MÚLTIPLES** módulos (ej: `file.schema.ts`, `address.schema.ts`).
- **Exportación:** Deben exportarse a través de `src/shared/schemas/index.ts`.

### 2. Schemas de Módulo (Feature)
- **Ruta:** `src/features/[nombre_modulo]/schemas/`
- **Uso:** Schemas específicos de **UN** solo módulo (ej: `order.schema.ts`, `issue.schema.ts`).
- **Regla:** **NUNCA** colocar schemas específicos de un módulo en la carpeta shared.
- **Exportación:** Deben exportarse a través de `src/features/[modulo]/schemas/index.ts`.

---

## 🔑 Convenciones de Nombres

| Elemento | Formato | Ejemplo |
| :--- | :--- | :--- |
| **Archivo** | `[nombre].schema.ts` | `device.schema.ts` |
| **Schema Zod** | `[Nombre]Schema` | `DeviceDataSchema` |
| **Tipo TS** | `[Nombre]FormData` | `DeviceFormData` |
| **Defaults** | `[nombre]DefaultValues` | `deviceDefaultValues` |

---

## 🔄 Patrón de Importación/Exportación

1. **Shared a Feature:** Los schemas de módulo importan schemas compartidos desde el path absoluto o alias:
   ```typescript
   import { FileUploadSchema } from "@/shared/schemas";
   ```

2. **Feature a Componente:** Los componentes importan sus schemas y tipos desde el index del módulo:
   ```typescript
   import { OrderSchema, type OrderFormData } from "../schemas";
   ```

---

## 📋 Checklist de Creación de Schemas

1. **Ubicación:** ¿Se usa en más de un módulo? Si → `shared/schemas/common/`, No → `features/[modulo]/schemas/`.
2. **Archivo:** Nombrar como `[nombre].schema.ts`.
3. **Contenido:** Definir `[Nombre]Schema`, exportar `type [Nombre]FormData` y definir `[nombre]DefaultValues`.
4. **Index:** Exportar el nuevo archivo en el `index.ts` de la carpeta correspondiente.
5. **Idioma:** Todos los mensajes de validación deben estar en **español**.

---

## 🧩 Organización de Componentes

### 1. Librería de Componentes (Shared)
- **Ruta:** `src/shared/components/`
- **Uso:** Componentes atómicos y genéricos (Botones, Inputs, Modales, Cards).
- **Regla:** Sin lógica de negocio específica.

### 2. Componentes de Módulo (Feature)
- **Ruta:** `src/features/[nombre_modulo]/components/`
- **Uso:** Componentes con lógica de negocio (formularios específicos, listas de datos).
