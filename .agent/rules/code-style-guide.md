# Guía de Estilo y Diseño (Design System)

Toda la aplicación debe seguir estrictamente el sistema de diseño definido en `src/shared/types/theme.ts`. Se prohíbe el uso de valores hardcodeados (hexadecimales directos, px de padding/margin, etc.) a menos que sea estrictamente necesario.

## 🎨 Paleta de Colores

Se deben utilizar las variables del tema a través de `props.theme.colors`.

| Categoría | Variables Principales | Uso |
| :--- | :--- | :--- |
| **Primarios** | `primary`, `primaryLight`, `primaryDark` | Acciones principales, branding (Deep Indigo). |
| **Secundarios** | `secondary`, `secondaryLight`, `secondaryDark` | Acciones secundarias, indicadores positivos (Emerald). |
| **Semánticos** | `success`, `warning`, `error`, `info` | Estados de feedback y validaciones. |
| **Superficie** | `background`, `surface`, `surfaceHover` | Fondos de página, cards y estados hover. |
| **Texto** | `text`, `textSecondary`, `textMuted`, `textInverse` | Jerarquía tipográfica. |

---

## 📏 Espaciado y Layout

Utilizar siempre la escala de `spacing` para mantener la consistencia rítmica.

- **Tokens:** `xxs` (2px), `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `xxl` (48px).
- **Layout Fijo:**
  - `headerHeight`: 3.33rem
  - `sidebarWidth`: 18.625rem
  - `containerMaxWidth`: 1200px

---

## 🔡 Tipografía

- **Tamaños:** Escala desde `xs` (12px) hasta `6xl` (60px). Usar `base` (16px) por defecto.
- **Pesos:**
  - `normal` (400)
  - `medium` (500)
  - `semibold` (600)
  - `bold` (700)

---

## ✨ Estética y Acabados

Para lograr el look "Premium" requerido por Antigravity:

1. **Bordes:** Usar `borderRadius.lg` (8px) para la mayoría de contenedores y `borderRadius.md` (6px) para inputs/botones.
2. **Sombras:** Aplicar `shadows.sm` o `shadows.base` para elevaciones sutiles. Usar `shadows.lg` para modales y elementos flotantes.
3. **Interactive:** Todos los elementos interactivos deben tener una transición (`transition: all 0.2s ease`) y un estado `surfaceHover` o cambio de color de borde.

---

## 🛠️ Implementación en Código (Styled Components)

```typescript
// Ejemplo de uso correcto
const StyledCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.base};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.surfaceHover};
    border-color: ${props => props.theme.colors.primaryLight};
  }
`;
```

## 🚨 Regla de Oro
**"Si no está en `theme.ts`, pregúntate si realmente lo necesitas."** Si un color o espaciado no existe en el tema, intenta ajustarte al token más cercano.