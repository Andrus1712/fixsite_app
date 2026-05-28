# Design System — Estilos y Componentes

> Generado desde el código fuente en `src/shared/components` y `src/shared/types/theme.ts`.

## Regla de Oro
**Usar siempre variables del tema.** Si un color, espaciado o radio no existe en `theme.ts`, ajustarse al token más cercano. Prohibido hardcodear valores (hex, px de padding/margin) salvo casos excepcionales documentados.

---

## Paleta de Colores (`props.theme.colors`)

### Primarios
| Variable | Valor (light) | Uso |
|---|---|---|
| `primary` | `#2E5BFF` | Acciones principales, branding (Digital Cobalt) |
| `primaryLight` | `#5E81FF` | Hover states, fondos suaves |
| `primaryDark` | `#1A3FB4` | Active states |
| `primaryHover` | `#254EDB` | Hover explícito |

### Secundarios
| Variable | Valor (light) | Uso |
|---|---|---|
| `secondary` | `#00D18F` | Acciones secundarias, indicadores positivos (Vibrant Emerald) |
| `secondaryLight` | `#34E8B0` | Fondos suaves |
| `secondaryDark` | `#00A873` | Active states |

### Accent
| Variable | Valor | Uso |
|---|---|---|
| `accent` | `#F59E0B` | Destacados, alertas suaves |
| `accentLight` | `#FCD34D` | Fondos accent |
| `accentDark` | `#D97706` | Active accent |

### Semánticos
| Variable | Valor | Uso |
|---|---|---|
| `success` / `successLight` / `successDark` | `#10B981` / `#D1FAE5` / `#065F46` | Estados positivos |
| `warning` / `warningLight` / `warningDark` | `#F59E0B` / `#FEF3C7` / `#92400E` | Advertencias |
| `error` / `errorLight` / `errorDark` | `#EF4444` / `#FEE2E2` / `#991B1B` | Errores |
| `info` / `infoLight` / `infoDark` | `#3B82F6` / `#DBEAFE` / `#1E40AF` | Información |

### Superficie y Texto
| Variable | Uso |
|---|---|
| `background` | Fondo de página (`#F9FAFB`) |
| `backgroundSecondary` | Fondo secundario (`#FFFFFF`) |
| `surface` | Cards, modales (`#FFFFFF`) |
| `surfaceHover` | Hover sobre surface (`#F9FAFB`) |
| `overlay` | Fondo de modales (`rgba(0,0,0,0.5)`) |
| `text` | Texto principal (`#111827`) |
| `textSecondary` | Texto secundario (`#6B7280`) |
| `textMuted` | Texto atenuado (`#9CA3AF`) |
| `textInverse` | Texto sobre fondos oscuros (`#FFFFFF`) |
| `textDisabled` | Texto deshabilitado (`#D1D5DB`) |

### Bordes
| Variable | Uso |
|---|---|
| `border` | Bordes estándar (`#E5E7EB`) |
| `borderLight` | Bordes sutiles (`#F3F4F6`) |
| `borderDark` | Bordes enfatizados (`#D1D5DB`) |
| `borderFocus` | Foco de inputs (`#3B82F6`) |

### Grises
Escala completa: `gray25` (#FCFCFD) → `gray50` → `gray100` → `gray200` → `gray300` → `gray400` → `gray500` → `gray600` → `gray700` → `gray800` → `gray900` → `gray950` (#030712)

### Colores Estándar (aliases)
`red` · `blue` · `green` · `yellow` · `orange` · `purple` · `pink` · `cyan` · `teal` · `lime`

### Paletas Completas (`theme.palette`)
Escalas 50–950 disponibles para: `red` · `blue` · `green` · `yellow` · `orange` · `purple` · `indigo` · `slate`

---

## Espaciado (`props.theme.spacing`)

| Token | Valor |
|---|---|
| `xxs` | 0.125rem (2px) |
| `xs` | 0.25rem (4px) |
| `sm` | 0.5rem (8px) |
| `md` | 1rem (16px) |
| `lg` | 1.5rem (24px) |
| `xl` | 2rem (32px) |
| `xxl` | 3rem (48px) |
| `xxxl` | 4rem (64px) |

**Layout fijo (`theme.layout`):**
- `sidebarWidth`: 18.625rem
- `sidebarCollapsedWidth`: 4rem
- `headerHeight`: 3.33333rem
- `containerMaxWidth`: 1200px
- `contentPaddingY`: 0.75rem
- `contentPaddingX`: 1.25rem

---

## Tipografía

**Tamaños (`theme.fontSize`):** `xs`(12px) · `sm`(14px) · `base`(16px) · `lg`(18px) · `xl`(20px) · `2xl`(24px) · `3xl`(30px) · `4xl`(36px) · `5xl`(48px) · `6xl`(60px)

**Pesos (`theme.fontWeight`):** `thin`(100) · `light`(300) · `normal`(400) · `medium`(500) · `semibold`(600) · `bold`(700) · `extrabold`(800) · `black`(900)

**Escala de Heading por nivel:**
| Nivel | fontSize | fontWeight |
|---|---|---|
| h1 | `4xl` (36px) | `bold` |
| h2 | `2xl` (24px) | `semibold` |
| h3 | `xl` (20px) | `semibold` |
| h4 | `lg` (18px) | `semibold` |
| h5 | `base` (16px) | `semibold` |
| h6 | `sm` (14px) | `semibold` |

---

## Bordes y Sombras

**Border Radius (`theme.borderRadius`):**
| Token | Valor | Uso recomendado |
|---|---|---|
| `none` | 0 | Sin radio |
| `sm` | 2px | Elementos muy pequeños |
| `base` | 4px | Elementos pequeños |
| `md` | 6px | Inputs y botones |
| `lg` | 8px | Cards y contenedores |
| `xl` | 12px | Modales |
| `2xl` | 16px | Paneles grandes |
| `3xl` | 24px | Elementos redondeados |
| `full` | 9999px | Pills, badges, avatares |

**Sombras (`theme.shadows`):**
| Token | Uso |
|---|---|
| `sm` | Elevación sutil, hover states |
| `base` | Cards estándar |
| `md` | Dropdowns, popovers |
| `lg` | Modales, overlays |
| `xl` | Elementos flotantes |
| `2xl` | Máxima elevación |
| `inner` | Inputs con foco, inset |

---

## Z-Index (`theme.zIndex`)

| Token | Valor | Uso |
|---|---|---|
| `content` | 1010 | Contenido general |
| `popover` | 1000 | Popovers |
| `sticky` | 1020 | Elementos sticky |
| `fixed` | 1030 | Elementos fixed |
| `modal` | 1040 | Modales |
| `dropdown` | 1050 | Dropdowns |
| `tooltip` | 1060 | Tooltips |

---

## Breakpoints (`theme.breakpoints`)

| Token | Valor |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## Implementación con Styled Components

```typescript
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.sm};
  }
`;
```

---

## Componentes UI Disponibles (`@/shared/components`)

### Tipografía

```tsx
// Heading — renderiza h1–h6 semánticamente
// level: "h1"|"h2"|"h3"|"h4"|"h5"|"h6" (default: "h2")
// color: "primary"|"secondary"|"muted"|"success"|"warning"|"error"|"info"
//       |"inverse"|"accent"|"white"|"black"|"gray25"..."gray950"
// align: "left"|"center"|"right" | truncate?: boolean
<Heading level="h2" color="primary" align="left">Título</Heading>
<Heading level="h3" color="muted" truncate>Título truncado</Heading>

// Text — componente de texto versátil
// variant: "body1"|"body2"|"caption"|"overline"|"paragraph"|"paragraph-sm"|"paragraph-lg"
//         |"label"|"label-sm"|"label-lg"|"code"|"code-sm"|"quote"|"lead"
//         |"muted"|"small"|"micro"|"monospace"
// size: "xs"|"sm"|"base"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"6xl"
// weight: "thin"|"light"|"normal"|"medium"|"semibold"|"bold"|"extrabold"|"black"
// color: igual que Heading + "disabled"
// align: "left"|"center"|"right"|"justify"
// italic, underline, lineThrough, uppercase, lowercase, capitalize, truncate?: boolean
// multiline?: number (líneas antes de truncar con ellipsis)
// letterSpacing: "tight"|"normal"|"wide"
// lineHeight: "tight"|"normal"|"relaxed"|"loose"|number
// opacity?: number (0–1)
<Text variant="body1" weight="semibold" color="muted">Texto</Text>
<Text variant="caption" color="textSecondary" multiline={2}>Texto largo...</Text>

// Subtitle — variant: "subtitle1"|"subtitle2"
// color: igual que Heading | align: "left"|"center"|"right" | truncate?: boolean
<Subtitle variant="subtitle2" color="muted">Subtítulo</Subtitle>

// Label — para etiquetas de formulario
// size: "sm"|"md"|"lg" | weight: "normal"|"medium"|"semibold"|"bold"
// color: igual que Heading | uppercase?: boolean | required?: boolean | htmlFor?: string
<Label size="md" weight="semibold" required htmlFor="campo">Campo</Label>
```

---

### Layout

```tsx
// Container — envuelve contenido con max-width y padding
// size: "sm"(640px)|"md"(768px)|"lg"(1024px)|"xl"(1280px)|"full"(100%)
// padding: SpacingKey|number|string | center?: boolean (default true)
// title?: string | headerActions?: ReactNode
<Container size="xl" padding="lg" center title="Sección" headerActions={<Button>Acción</Button>}>
  ...
</Container>

// Box — contenedor flexible con padding/margin/bg/shadow/border
// Padding: p, pt, pb, pl, pr (SpacingKey|number|string)
// Margin: m, mt, mb, ml, mr
// bg?: string | rounded?: boolean|string | shadow?: boolean|string
// fullWidth?: boolean | fullHeight?: boolean | border?: string
// title?: string | subtitle?: string|ReactNode | headerActions?: ReactNode
// showDivider?: boolean (default true — muestra línea bajo el header)
<Box p="md" bg="white" rounded shadow title="Sección" subtitle="Descripción" showDivider>
  ...
</Box>

// Flex — contenedor flexbox
// direction: "row"|"column"|"row-reverse"|"column-reverse"
// justify: "flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"
// align: "flex-start"|"flex-end"|"center"|"stretch"|"baseline"
// wrap: "nowrap"|"wrap"|"wrap-reverse" | gap: SpacingKey|number|string
// fullWidth?: boolean | fullHeight?: boolean
<Flex direction="row" justify="space-between" align="center" gap="md">...</Flex>

// Grid — contenedor CSS grid
// columns: number|"auto"|string | responsive: { xs, sm, md, lg, xl, "2xl" }
// rows: igual que columns | gap: SpacingKey|number|string | responsive gap
// align?: string | justify?: string | fullWidth?: boolean | fullHeight?: boolean
<Grid columns={3} gap="lg">...</Grid>
<Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={{ xs: "sm", md: "md" }}>...</Grid>

// Row — Flex horizontal con defaults convenientes
// justify, align, gap, wrap?: boolean, fullWidth?, fullHeight?
<Row justify="flex-end" align="center" gap="md">...</Row>

// Column — Flex vertical con defaults convenientes
// justify, align, gap, fullWidth?, fullHeight?
<Column align="center" gap="sm">...</Column>

// Spacer — espacio vacío
// size: SpacingKey|number|string | horizontal?: boolean (default: vertical)
<Spacer size="lg" />
<Spacer size="md" horizontal />

// Divider — línea separadora
// orientation: "horizontal"|"vertical" | color?: string | thickness?: number
// margin: SpacingKey|number|string | width?: string|number | opacity?: number | gradient?: boolean
<Divider />
<Divider orientation="vertical" margin="sm" gradient />
```

---

### Botones

```tsx
// Button — botón principal
// variant: "primary"|"secondary"|"danger"|"success"|"outline"|"warning"
//         |"info"|"dark"|"light"|"purple"|"pink"|"indigo"
// size: "sm"|"md"|"lg" (default: "md")
// fullWidth?: boolean | width?: string|number
// loading?: boolean | leftIcon?: ReactNode | rightIcon?: ReactNode
// Extiende ButtonHTMLAttributes — acepta onClick, disabled, type, etc.
<Button variant="primary" size="md" loading leftIcon={<FaPlus />}>Guardar</Button>
<Button variant="outline" onClick={handleCancel}>Cancelar</Button>
<Button variant="danger" fullWidth>Eliminar</Button>

// IconButton — botón solo con ícono
// icon: ReactNode (requerido)
// variant: "ghost"|"solid"|"outline" (default: "ghost")
// size: "xs"(28px)|"sm"(32px)|"md"(40px)|"lg"(48px) (default: "md")
// color: "primary"|"secondary"|"danger"|"warning"|"success"|"info"|"white"|"neutral" (default: "neutral")
// shape: "circle"|"rounded" (default: "rounded")
<IconButton icon={<FaEdit />} variant="ghost" color="primary" size="md" shape="rounded" />
<IconButton icon={<FaClose />} variant="solid" color="danger" shape="circle" />

// ButtonGroup — agrupa botones
// orientation: "horizontal"|"vertical" | spacing: "sm"|"md"|"lg"
<ButtonGroup orientation="horizontal" spacing="md">
  <Button variant="outline">Cancelar</Button>
  <Button variant="primary">Guardar</Button>
</ButtonGroup>

// DropdownButton — botón con menú desplegable
// label?: string | variant | size | disabled?: boolean | fullWidth?: boolean
// items: DropdownMenuOption[] | DropdownMenuSection[]
//   DropdownMenuOption: { id, label, onClick, disabled?, isDanger?, icon? }
//   DropdownMenuSection: { label?, options: DropdownMenuOption[] }
// leftIcon?, rightIcon?, closeOnSelect?: boolean, onToggle?: (isOpen) => void
<DropdownButton
  label="Acciones"
  variant="outline"
  items={[
    { id: "edit", label: "Editar", onClick: handleEdit, icon: <FaEdit /> },
    { id: "delete", label: "Eliminar", onClick: handleDelete, isDanger: true },
  ]}
/>

// FloatingActionButton — botón flotante
// icon: ReactNode | position: "bottom-right"|"bottom-left"|"top-right"|"top-left"
// size: "md"|"lg"
<FloatingActionButton icon={<FaPlus />} position="bottom-right" size="md" />

// TableIconButton — botón de ícono optimizado para tablas (sin borde, compacto)
// icon: ReactNode | size: "xs"(24px)|"sm"(28px)|"md"(32px) (default: "sm")
// color: "primary"|"secondary"|"danger"|"warning"|"success"|"info"|"neutral" (default: "neutral")
// tooltip?: string — muestra Tooltip automáticamente
// TableIconButton.Group — agrupa con gap mínimo (2px)
<TableIconButton.Group>
  <TableIconButton icon={<FaEdit />} color="primary" tooltip="Editar" onClick={handleEdit} />
  <TableIconButton icon={<FaTrash />} color="danger" tooltip="Eliminar" onClick={handleDelete} />
</TableIconButton.Group>
```

---

### Formularios

```tsx
// Input — campo de texto
// label?, error?, fullWidth?, variant: "outlined"|"filled" (default: "outlined")
// startIcon?, endIcon?: ReactNode
// Extiende InputHTMLAttributes — acepta ref, placeholder, type, disabled, etc.
<Input label="Nombre" placeholder="..." error={errors.name?.message} fullWidth startIcon={<FaUser />} />

// Select — selector nativo
// label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string, disabled? }[]
// Extiende SelectHTMLAttributes — acepta ref, onChange, value, etc.
<Select
  label="Estado"
  options={[{ value: "active", label: "Activo" }, { value: "inactive", label: "Inactivo" }]}
  placeholder="Seleccione..."
  error={errors.status?.message}
/>

// SearchableSelect — selector con búsqueda y portal (no se corta en modales)
// label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string, disabled? }[]
// value?: string|number|null | onChange?: (value: string|number|null) => void
// onSearch?: (term: string) => void — búsqueda externa (debounce 300ms interno)
// loading?, isLoading? — muestra "Buscando..." en dropdown
// serverError? — muestra "Error al cargar opciones"
// allowClear?: boolean (default true) | disabled?: boolean
<SearchableSelect
  label="Cliente"
  options={clients}
  value={clientId}
  onChange={setClientId}
  onSearch={handleSearch}
  loading={isLoading}
  placeholder="Buscar cliente..."
  error={errors.client_id?.message}
/>

// TextArea — área de texto
// label?, error?, fullWidth?
// resize: "none"|"vertical"|"horizontal"|"both" (default: "vertical")
// Extiende TextareaHTMLAttributes
<TextArea label="Descripción" rows={4} resize="vertical" error={errors.desc?.message} />

// Checkbox — casilla de verificación
// label?: string|ReactNode | error?: string | indeterminate?: boolean
// Extiende InputHTMLAttributes
<Checkbox label="Acepto términos" checked={checked} onChange={onChange} />
<Checkbox label="Parcial" indeterminate={partial} checked={false} onChange={onChange} />

// Switch — interruptor on/off
// label?, error?, size: "sm"|"md"|"lg" (default: "md")
<Switch label="Activo" checked={active} onChange={onChange} size="md" />

// Radio — botón de radio individual
// label?, error? | Extiende InputHTMLAttributes
<Radio label="Opción A" value="a" checked={val === "a"} onChange={onChange} />

// RadioGroup — grupo de radios
// name, options: { value, label, disabled? }[], value?, onChange?
// label?, error?, direction: "horizontal"|"vertical" (default: "vertical")
<RadioGroup
  name="tipo"
  label="Tipo de servicio"
  options={[{ value: "a", label: "Opción A" }, { value: "b", label: "Opción B" }]}
  value={val}
  onChange={setVal}
  direction="horizontal"
/>

// MultiSelect — selector múltiple con chips
// label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string }[]
// value?: (string|number)[] | onChange?: (values: (string|number)[]) => void
<MultiSelect
  label="Categorías"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Seleccionar..."
/>

// FileInput — carga de archivos con preview
// label?, error?, fullWidth?, multiple?, accept?, disabled?
// maxFiles?: number | maxSize?: number (MB)
// showPreview?: boolean
// filesUplaod: { filename, originalName, size, url }[] — archivos ya subidos
// onChange?: (files: FileList|null) => void
<FileInput
  label="Adjuntos"
  multiple
  accept=".jpg,.png,.pdf"
  maxFiles={5}
  maxSize={10}
  filesUplaod={uploadedFiles}
  onChange={handleFiles}
/>

// ColorPicker — selector de color predefinido
// value?, onChange?: (color: string) => void, label?
// Colores: gris-espacial, negro, blanco, rojo, azul, verde, naranja, rosa, morado, dorado
<ColorPicker label="Color del dispositivo" value={color} onChange={setColor} />

// FormGroup — agrupa campos con título y descripción
// title?, description?, direction: "horizontal"|"vertical" (default: "vertical")
// gap: "xs"|"sm"|"md"|"lg"|"xl" (default: "md") | fullWidth?: boolean
<FormGroup title="Datos personales" description="Información básica" direction="vertical" gap="md">
  <Input label="Nombre" />
  <Input label="Email" />
</FormGroup>

// FormTabs — tabs con validación por pestaña (requiere FormProvider)
// tabs: { label: string, content: ReactNode, validationFields?: string[] }[]
// onSubmit?, submitLabel?: string (default: "Enviar")
// loading?: boolean | showNavigation?: boolean (default: true)
// ref: FormTabsRef — expone resetToFirstTab()
const formTabsRef = useRef<FormTabsRef>(null);

<FormProvider {...methods}>
  <FormTabs
    ref={formTabsRef}
    tabs={[
      { label: "Paso 1", content: <Step1 />, validationFields: ["nombre", "email"] },
      { label: "Paso 2", content: <Step2 />, validationFields: ["direccion"] },
    ]}
    onSubmit={methods.handleSubmit(onSubmit)}
    submitLabel="Guardar"
    loading={isLoading}
    showNavigation
  />
</FormProvider>
```

---

### Cards

```tsx
// Card — contenedor con variantes visuales
// variant: "default"|"outlined"|"elevated"|"filled"|"selected"|"disabled" (default: "default")
// size: "xs"|"sm"|"md"|"lg"|"full" (default: "md")
// padding: "none"|"small"|"medium"|"large" (default: "medium")
// title?, subtitle?, header?: ReactNode, footer?: ReactNode
// onClick hace la card clickeable (cursor pointer + hover)
<Card title="Título" subtitle="Subtítulo" variant="default" size="md" padding="medium">
  Contenido
</Card>
<Card variant="outlined" footer={<Button>Acción</Button>}>...</Card>

// CollapsibleCard — card con header colapsable
// title: string (requerido)
// badge?: { text: string, variant: "critica"|"alta"|"media"|"baja" }
// defaultExpanded?: boolean (default: false)
// onDelete?: () => void — muestra botón de eliminar en header
// onToggle?: (expanded: boolean) => void
<CollapsibleCard
  title="Falla principal"
  badge={{ text: "Alta", variant: "alta" }}
  defaultExpanded={false}
  onDelete={handleDelete}
  onToggle={(expanded) => console.log(expanded)}
>
  Contenido colapsable
</CollapsibleCard>
```

---

### Badge

```tsx
// variant: "success"|"warning"|"danger"|"info"|"default"|"secondary"|"outline"
// Extiende HTMLAttributes<HTMLSpanElement>
<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Información</Badge>
<Badge variant="secondary">Secundario</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### Modal y Aside

```tsx
// Modal — diálogo centrado (renderiza en portal)
// isOpen, onClose (requeridos) | title?, footer?: ReactNode
// size: "sm"|"md"|"lg"|"xl" (default: "md")
// closeOnOverlayClick?: boolean (default: true)
// showCloseButton?: boolean (default: true)
// Cierra con Escape automáticamente
<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirmar acción"
  size="md"
  footer={
    <ButtonGroup>
      <Button variant="outline" onClick={onClose}>Cancelar</Button>
      <Button variant="primary" onClick={handleConfirm}>Confirmar</Button>
    </ButtonGroup>
  }
>
  Contenido del modal
</Modal>

// Aside — panel lateral deslizante desde la derecha (renderiza en portal)
// isOpen, onClose (requeridos) | title?, subtitle?: string|ReactNode
// footer?: ReactNode | width?: string (default: auto)
// closeOnOverlayClick?: boolean (default: true)
// Cierra con Escape automáticamente
<Aside
  isOpen={isOpen}
  onClose={onClose}
  title="Detalles del registro"
  subtitle="Información completa"
  width="480px"
  footer={<Button variant="primary" fullWidth>Guardar</Button>}
>
  Contenido del aside
</Aside>
```

---

### AlertModal y Notificaciones

```tsx
// AlertModal — modal de confirmación/alerta con animación
// isOpen, onClose, title, message, buttons (todos requeridos)
// type: "success"|"warning"|"error"|"info"|"default" (default: "default")
// animation: "fade"|"scale"|"slideDown" (default: "scale")
// duration?: number (ms, para auto-cierre)
// buttons: { label: string, variant?: ButtonVariant, icon?: ReactNode, onClick: () => void }[]
<AlertModal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirmar eliminación"
  message="Esta acción no se puede deshacer."
  type="warning"
  animation="scale"
  buttons={[
    { label: "Cancelar", variant: "outline", onClick: onClose },
    { label: "Eliminar", variant: "danger", onClick: handleDelete },
  ]}
/>

// useAlert — hook para AlertModal desde cualquier componente (requiere AlertProvider)
const { showSuccess, showError, showWarning, showInfo, closeAlert } = useAlert();

showSuccess("Guardado", "El registro fue guardado correctamente.", [
  { label: "OK", onClick: closeAlert }
]);
showError("Error", "No se pudo completar la operación.", [
  { label: "Cerrar", onClick: closeAlert }
]);
showWarning("Advertencia", "Revisa los datos antes de continuar.", [
  { label: "Cancelar", onClick: closeAlert },
  { label: "Continuar", onClick: handleContinue },
]);

// useToast — notificaciones tipo toast (requiere Redux store)
const { showSuccess, showError, showWarning, showInfo } = useToast();

showSuccess("Guardado correctamente");
showError("Error al guardar", "Título opcional", 5000); // duración en ms
showWarning("Advertencia");
showInfo("Información");
```

---

### Tablas

```tsx
// DataTable — tabla completa con paginación, búsqueda, ordenamiento y selección
// data: T[] | columns: ColumnDef<T>[] (TanStack Table v8)
// pageSizeOptions?: number[] (default: [10, 25, 50, 100])
// initialPageSize?: number (default: 25)
// serverSide?: boolean — activa paginación/búsqueda/ordenamiento server-side
// page?: number (1-based) | total?: number | totalPages?: number
// searchValue?, onSearchChange?, onPageChange?, onPageSizeChange?, onSortingChange?
// enableRowSelection?: boolean|((row) => boolean)
// rowSelection?, onRowSelectionChange?, getRowId?
import DataTable from "@/shared/components/Tables/DataTable";

<DataTable
  columns={columns}
  data={data}
  serverSide
  page={page}
  total={total}
  totalPages={totalPages}
  searchValue={search}
  onSearchChange={setSearch}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
  initialPageSize={25}
/>

// SimpleTable (Table) — tabla más simple
// isLoading?, page?, total?, totalPages?
// searchValue?, onSearchChange?, searchPlaceholder?, onPageChange?
import SimpleTable from "@/shared/components/Tables/Table";

<SimpleTable
  columns={columns}
  data={data}
  isLoading={isLoading}
  page={page}
  total={total}
  totalPages={totalPages}
  searchValue={search}
  onSearchChange={setSearch}
  onPageChange={setPage}
/>
```

---

### Tabs

```tsx
// Tabs — tabs sin formulario
// tabs: { label: string, content: ReactNode }[]
// defaultTab?: number (default: 0)
<Tabs
  tabs={[
    { label: "General", content: <GeneralTab /> },
    { label: "Avanzado", content: <AdvancedTab /> },
  ]}
  defaultTab={0}
/>
```

---

### Accordion

```tsx
// Accordion — acordeón raíz
// title: string (requerido)
// badge?: { text: string, variant: BadgeVariant }
// headerActions?: ReactNode — se detiene propagación del click automáticamente
// defaultExpanded?: boolean (default: false)
//
// AccordionItem — ítem anidado, misma API que Accordion
<Accordion
  title="Sección principal"
  badge={{ text: "3", variant: "info" }}
  headerActions={<IconButton icon={<FaPlus />} size="sm" />}
  defaultExpanded
>
  <AccordionItem title="Sub-sección A" badge={{ text: "Nuevo", variant: "success" }}>
    Contenido anidado A
  </AccordionItem>
  <AccordionItem title="Sub-sección B">
    Contenido anidado B
  </AccordionItem>
</Accordion>
```

---

### Tooltip

```tsx
// content: ReactNode | position: "top"|"bottom"|"left"|"right" (default: "top")
// delay?: number (ms, default: 200) | disabled?: boolean | fullWidth?: boolean
<Tooltip content="Texto del tooltip" position="top">
  <Button>Hover me</Button>
</Tooltip>
<Tooltip content={<span>HTML <strong>tooltip</strong></span>} position="bottom" delay={500}>
  <IconButton icon={<FaInfo />} />
</Tooltip>
```

---

### Componentes Especializados

```tsx
// LoadingSpinner — spinner de carga
// mensaje?: string
<LoadingSpinner mensaje="Cargando datos..." />

// StatusDot — indicador de estado circular (12px)
// variant: "active"|"inactive"|"away"|"busy"
// "active" tiene animación de pulso verde
<StatusDot variant="active" />   // verde con pulso
<StatusDot variant="inactive" /> // rojo
<StatusDot variant="away" />     // amarillo
<StatusDot variant="busy" />     // gris oscuro

// PriorityIndicator — indicador visual de prioridad
// priority: "low"|"medium"|"high" | size?: number (default: 12)
<PriorityIndicator priority="high" size={14} />

// ImageGallery — galería con thumbnails y modal de preview
// images: string[] (rutas relativas, se prefija con VITE_API_BASE_URL)
// thumbnailSize?: number (px, default: 80) | modalSize: "sm"|"md"|"lg"|"xl"
// alt?: string | showCounter?: boolean
<ImageGallery
  images={["/uploads/img1.jpg", "/uploads/img2.jpg"]}
  thumbnailSize={80}
  modalSize="lg"
  showCounter
/>

// TimePicker — selector de hora
// mode: "single"|"range" | label?, error?, disabled?
// format: "12h"|"24h" (default: "24h") | step?: number (minutos, default: 15)
// Modo single: value?: string, onChange?: (time: string) => void
// Modo range: startTime?, endTime?, onRangeChange?: (start: string, end: string) => void
<TimePicker label="Hora" mode="single" value={time} onChange={setTime} format="24h" step={30} />
<TimePicker label="Horario" mode="range" startTime={start} endTime={end} onRangeChange={handleRange} />

// SearchInput — búsqueda con dropdown de resultados
// value, onChange (requeridos)
// onSearch?: async (query: string) => SearchResult[]
// onSelect?: (result: SearchResult) => void
// placeholder?, debounceMs?, minChars?, loading?, results?, selectedItem?, error?
<SearchInput
  value={query}
  onChange={setQuery}
  onSearch={async (q) => fetchResults(q)}
  onSelect={(result) => setSelected(result)}
  placeholder="Buscar..."
/>

// PageTitle — título de página con breadcrumbs automáticos
// Lee título/descripción del handle de la ruta actual. Sin props.
<PageTitle />

// Breadcrumbs — breadcrumbs automáticos desde la ruta actual
<Breadcrumbs />

// ExpandableList — lista con primer ítem visible y resto colapsado
// items: any[] | displayField: string | string[] | emptyText?: string
<ExpandableList items={tags} displayField="name" emptyText="Sin etiquetas" />

// PermissionsSelector — selector de permisos agrupados por módulo
// permissions: Record<string, Permission[]>
// selectedPermissions?: number[] | onChange?: (selectedIds: number[]) => void
<PermissionsSelector
  permissions={permissionsGrouped}
  selectedPermissions={selectedIds}
  onChange={setSelectedIds}
/>

// RolesSelector — selector de rol activo (lee roles del store de auth)
// onSelect?: () => void
<RolesSelector onSelect={handleClose} />

// TenantSelector — selector de tenant activo (lee tenants del store de auth)
// isCollapsed?: boolean (modo sidebar colapsado)
<TenantSelector isCollapsed={false} />

// PatternLock — patrón de desbloqueo tipo Android (3x3)
// onPatternComplete: (patternSequence: string) => void (ej: "1-5-9-8")
// initialPattern?: string (patrón precargado desde BD)
<PatternLock onPatternComplete={setPattern} initialPattern={savedPattern} />

// ErrorBoundary — captura errores de React en el árbol de componentes
<ErrorBoundary>
  <ComponenteThatMightFail />
</ErrorBoundary>
```

---

## Ejemplo: Página Completa

```tsx
import {
  Container, Flex, Heading, Text, Button, Card, DataTable, Badge,
  TableIconButton, Modal, useToast
} from "@/shared/components";
import type { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

interface MyEntity {
  id: number;
  name: string;
  status: string;
}

export default function MyPage() {
  const { showSuccess, showError } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const columns: ColumnDef<MyEntity>[] = [
    { accessorKey: "name", header: "Nombre" },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => <Badge variant="success">{row.original.status}</Badge>,
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => (
        <TableIconButton.Group>
          <TableIconButton
            icon={<FaEdit />}
            color="primary"
            tooltip="Editar"
            onClick={() => handleEdit(row.original)}
          />
          <TableIconButton
            icon={<FaTrash />}
            color="danger"
            tooltip="Eliminar"
            onClick={() => handleDelete(row.original)}
          />
        </TableIconButton.Group>
      ),
    },
  ];

  return (
    <Container size="xl" padding="lg">
      <Flex justify="space-between" align="center" gap="md">
        <div>
          <Heading level="h2">Título de Página</Heading>
          <Text variant="body2" color="muted">Descripción breve</Text>
        </div>
        <Button variant="primary" leftIcon={<FaPlus />} onClick={() => setIsModalOpen(true)}>
          Nuevo registro
        </Button>
      </Flex>

      <Card title="Listado">
        <DataTable
          columns={columns}
          data={data}
          serverSide
          page={page}
          total={total}
          totalPages={totalPages}
          searchValue={search}
          onSearchChange={setSearch}
          onPageChange={setPage}
        />
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nuevo registro" size="md">
        {/* Formulario aquí */}
      </Modal>
    </Container>
  );
}
```

---

## Patrones de Uso Frecuente

### Formulario con React Hook Form + Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Select, Button, FormGroup } from "@/shared/components";
import { MySchema, type MyFormData, myDefaultValues } from "../schemas";

export default function MyForm({ onSubmit }: { onSubmit: (data: MyFormData) => void }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<MyFormData>({
    resolver: zodResolver(MySchema),
    defaultValues: myDefaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup direction="vertical" gap="md">
        <Input label="Nombre" {...register("name")} error={errors.name?.message} fullWidth />
        <Select
          label="Estado"
          options={[{ value: "active", label: "Activo" }]}
          {...register("status")}
          error={errors.status?.message}
          fullWidth
        />
      </FormGroup>
      <Button type="submit" variant="primary" loading={isSubmitting} fullWidth>
        Guardar
      </Button>
    </form>
  );
}
```

### Confirmación de Acción Destructiva

```tsx
const { showWarning, closeAlert } = useAlert();

const handleDelete = (id: number) => {
  showWarning(
    "Confirmar eliminación",
    "Esta acción no se puede deshacer.",
    [
      { label: "Cancelar", variant: "outline", onClick: closeAlert },
      {
        label: "Eliminar",
        variant: "danger",
        onClick: () => {
          closeAlert();
          deleteRecord(id);
        },
      },
    ]
  );
};
```

### Columna de Acciones Estándar para Tablas

```tsx
{
  id: "actions",
  header: "Acciones",
  size: 80,
  cell: ({ row }) => (
    <TableIconButton.Group>
      <TableIconButton icon={<FaEye />} color="info" tooltip="Ver detalle" onClick={() => handleView(row.original)} />
      <TableIconButton icon={<FaEdit />} color="primary" tooltip="Editar" onClick={() => handleEdit(row.original)} />
      <TableIconButton icon={<FaTrash />} color="danger" tooltip="Eliminar" onClick={() => handleDelete(row.original.id)} />
    </TableIconButton.Group>
  ),
}
```
