# FixSite App — Visión General del Proyecto

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Framework UI | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Estilos | Styled Components 6 |
| Estado Global | Redux Toolkit + Redux Persist |
| Fetching / Cache | RTK Query (dentro de Redux Toolkit) |
| Formularios | React Hook Form 7 + Zod 4 |
| Tablas | TanStack Table 8 |
| Gráficas | ApexCharts + react-apexcharts |
| Routing | React Router 7 |
| Fechas | date-fns + dayjs |
| Iconos | react-icons 5 |
| WebSockets | socket.io-client 4 |

## Comandos del Proyecto

```bash
npm run dev      # Servidor de desarrollo (con --host para red local)
npm run build    # Compilar TypeScript + build de producción
npm run lint     # ESLint
npm run preview  # Preview del build de producción
```

## Estructura de Carpetas

```
src/
├── app/                  # Infraestructura global (providers, router)
│   ├── providers/        # Redux, Theme, Toast, Auth providers
│   └── router/           # Rutas y layouts principales
├── assets/               # Imágenes y recursos estáticos
├── features/             # Módulos de negocio (ver folder-structure.md)
└── shared/               # Código reutilizable entre módulos
    ├── components/       # Librería UI base
    ├── schemas/          # Schemas Zod comunes
    ├── store/            # baseApi RTK-Query y store central
    ├── styles/           # Variables CSS globales
    ├── types/            # Tipos globales y theme.ts
    └── utils/            # Funciones utilitarias y constantes
```

## Módulos de Negocio Actuales (`src/features/`)

- **auth** — Login, permisos, slice de autenticación
- **Roles** — CRUD de roles de usuario
- **customers** — Gestión de clientes
- **inventory** — Inventario con submódulos:
  - `article` — Artículos
  - `brand` — Marcas
  - `category` — Categorías
  - `movement` — Movimientos (ajustes, recepciones, transferencias, salidas)
  - `storeModule` — Módulo de almacén
- **orders** — Órdenes de servicio (módulo principal)

## Alias de Importación

El proyecto usa `@/` como alias para `src/`. Ejemplo:
```typescript
import { Button } from "@/shared/components";
import { OrderSchema } from "@/features/orders/schemas";
```
