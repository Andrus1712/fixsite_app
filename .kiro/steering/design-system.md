# Design System — Estilos y Componentes

> Documentacion actualizada desde el codigo fuente en `src/shared/components`.

## Regla de Oro
**Usar siempre variables del tema.** Si un color, espaciado o radio no existe en `theme.ts`, ajustarse al token mas cercano. Prohibido hardcodear valores (hex, px de padding/margin) salvo casos excepcionales.

---

## Paleta de Colores (`props.theme.colors`)

| Categoria | Variables | Uso |
|---|---|---|
| Primarios | `primary`, `primaryLight`, `primaryDark` | Acciones principales, branding (Indigo #4338CA) |
| Secundarios | `secondary`, `secondaryLight`, `secondaryDark` | Acciones secundarias, indicadores positivos (Emerald #10B981) |
| Semanticos | `success`, `warning`, `error`, `info` | Estados de feedback y validaciones |
| Superficie | `background`, `surface`, `surfaceHover` | Fondos de pagina, cards y hover |
| Texto | `text`, `textSecondary`, `textMuted`, `textInverse`, `textDisabled` | Jerarquia tipografica |
| Borde | `border`, `borderLight` | Bordes de inputs, cards, separadores |
| Grises | `gray25` a `gray950` | Escala completa de grises |

---

## Espaciado (`props.theme.spacing`)

| Token | Valor |
|---|---|
| `xxs` | 2px |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `xxl` | 48px |
| `xxxl` | 64px |

**Layout fijo:**
- `headerHeight`: 3.33rem
- `sidebarWidth`: 18.625rem
- `containerMaxWidth`: 1200px

---

## Tipografia

**Tamanos** (`theme.fontSize`): `xs`(12) · `sm`(14) · `base`(16) · `lg`(18) · `xl`(20) · `2xl`(24) · `3xl`(30) · `4xl`(36) · `5xl`(48) · `6xl`(60)

**Pesos** (`theme.fontWeight`): `normal`(400) · `medium`(500) · `semibold`(600) · `bold`(700)

---

## Bordes y Sombras

**Border Radius** (`theme.borderRadius`):
- Inputs y botones: `md` (6px)
- Cards y contenedores: `lg` (8px)
- Modales: `xl` (12px)
- Pills/badges: `full` (9999px)

**Sombras** (`theme.shadows`):
- Elevacion sutil: `sm`
- Cards estandar: `base`
- Modales y dropdowns: `lg`

---

## Implementacion con Styled Components

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
`;
```

---

## Componentes UI Disponibles (`@/shared/components`)

### Tipografia

```tsx
// Heading — level: "h1"|"h2"|"h3"|"h4"|"h5"|"h6"
// color: "primary"|"secondary"|"muted"|"success"|"warning"|"error"|"info"|"inverse"|"accent"|"white"|"black"|"gray[25-950]"
// align: "left"|"center"|"right" | truncate?: boolean
<Heading level="h1" color="primary" align="left" truncate>Titulo</Heading>

// Text — variant: "body1"|"body2"|"caption"|"overline"|"paragraph"|"paragraph-sm"|"paragraph-lg"
//              |"label"|"label-sm"|"label-lg"|"code"|"code-sm"|"quote"|"lead"|"muted"|"small"|"micro"|"monospace"
// size: "xs"|"sm"|"base"|"lg"|"xl"|"2xl"|"3xl"|"4xl"|"5xl"|"6xl"
// weight: "thin"|"light"|"normal"|"medium"|"semibold"|"bold"|"extrabold"|"black"
// color: igual que Heading + "disabled"
// align: "left"|"center"|"right"|"justify"
// italic, underline, lineThrough, uppercase, lowercase, capitalize, truncate?: boolean
// multiline?: number (lineas antes de truncar)
// letterSpacing: "tight"|"normal"|"wide"
// lineHeight: "tight"|"normal"|"relaxed"|"loose"|number
// opacity?: number (0-1)
<Text variant="body1" weight="semibold" color="muted" align="center">Texto</Text>

// Subtitle — variant: "subtitle1"|"subtitle2"
// color: igual que Heading | align: "left"|"center"|"right" | truncate?: boolean
<Subtitle variant="subtitle2" color="muted">Subtitulo</Subtitle>

// Label — size: "sm"|"md"|"lg" | weight: "normal"|"medium"|"semibold"|"bold"
// color: igual que Heading | uppercase?: boolean | required?: boolean | htmlFor?: string
<Label size="md" weight="semibold" required htmlFor="campo">Campo</Label>
```

---

### Layout

```tsx
// Container — size: "sm"|"md"|"lg"|"xl"|"full" | padding: SpacingKey|number|string
// center?: boolean | title?: string | headerActions?: ReactNode
<Container size="xl" padding="lg" center>...</Container>

// Box — padding: p, pt, pb, pl, pr (SpacingKey|number|string)
// margin: m, mt, mb, ml, mr | bg?: string | rounded?: boolean|string
// shadow?: boolean|string | fullWidth?: boolean | fullHeight?: boolean
// border?: string | title?: string | subtitle?: string|ReactNode
// headerActions?: ReactNode | showDivider?: boolean (default true)
<Box p="md" bg="white" rounded shadow title="Seccion" subtitle="Descripcion">...</Box>

// Flex — direction: "row"|"column"|"row-reverse"|"column-reverse"
// justify: "flex-start"|"flex-end"|"center"|"space-between"|"space-around"|"space-evenly"
// align: "flex-start"|"flex-end"|"center"|"stretch"|"baseline"
// wrap: "nowrap"|"wrap"|"wrap-reverse" | gap: SpacingKey|number|string
// fullWidth?: boolean | fullHeight?: boolean
<Flex direction="row" justify="space-between" align="center" gap="md">...</Flex>

// Grid — columns: number|"auto"|string | ResponsiveGridColumns: {xs,sm,md,lg,xl,"2xl"}
// rows: igual que columns | gap: SpacingKey|number|string | ResponsiveGap
// align?: string | justify?: string | fullWidth?: boolean | fullHeight?: boolean
<Grid columns={3} gap="lg">...</Grid>
<Grid columns={{ xs: 1, md: 2, lg: 3 }} gap="md">...</Grid>

// Row — justify, align, gap, wrap?: boolean, fullWidth?, fullHeight?
<Row justify="flex-end" align="center" gap="md">...</Row>

// Column — justify, align, gap, fullWidth?, fullHeight?
<Column align="center" gap="sm">...</Column>

// Spacer — size: SpacingKey|number|string | horizontal?: boolean
<Spacer size="lg" />
<Spacer size="md" horizontal />

// Divider — orientation: "horizontal"|"vertical" | color?: string | thickness?: number
// margin: SpacingKey|number|string | width?: string|number | opacity?: number | gradient?: boolean
<Divider />
<Divider orientation="vertical" margin="sm" gradient />
```

---

### Botones

```tsx
// Button — variant: "primary"|"secondary"|"danger"|"success"|"outline"|"warning"
//                  |"info"|"dark"|"light"|"purple"|"pink"|"indigo"
// size: "sm"|"md"|"lg" | fullWidth?: boolean | width?: string|number
// loading?: boolean | leftIcon?: ReactNode | rightIcon?: ReactNode
<Button variant="primary" size="md" loading leftIcon={<FaPlus />}>Guardar</Button>

// IconButton — icon: ReactNode (requerido)
// variant: "ghost"|"solid"|"outline" | size: "xs"|"sm"|"md"|"lg"
// color: "primary"|"secondary"|"danger"|"warning"|"success"|"info"|"white"|"neutral"
// shape: "circle"|"rounded"
<IconButton icon={<FaEdit />} variant="ghost" color="primary" size="md" shape="rounded" />

// ButtonGroup — orientation: "horizontal"|"vertical" | spacing: "sm"|"md"|"lg"
<ButtonGroup orientation="horizontal" spacing="md">
  <Button variant="outline">Cancelar</Button>
  <Button variant="primary">Guardar</Button>
</ButtonGroup>

// DropdownButton — label?: string | variant | size | disabled?: boolean | fullWidth?: boolean
// items: DropdownMenuOption[] | DropdownMenuSection[]
// DropdownMenuOption: { id, label, onClick, disabled?, isDanger?, icon? }
// DropdownMenuSection: { label?, options: DropdownMenuOption[] }
// leftIcon?, rightIcon?, closeOnSelect?: boolean, onToggle?: (isOpen) => void
<DropdownButton
  label="Acciones"
  variant="outline"
  items={[
    { id: "edit", label: "Editar", onClick: () => {}, icon: <FaEdit /> },
    { id: "delete", label: "Eliminar", onClick: () => {}, isDanger: true },
  ]}
/>

// FloatingActionButton — icon: ReactNode
// position: "bottom-right"|"bottom-left"|"top-right"|"top-left"
// size: "md"|"lg"
<FloatingActionButton icon={<FaPlus />} position="bottom-right" size="md" />

// TableIconButton — icon: ReactNode | size: "xs"|"sm"|"md"
// color: "primary"|"secondary"|"danger"|"warning"|"success"|"info"|"neutral"
// tooltip?: string
// TableIconButton.Group — agrupa botones con gap minimo
<TableIconButton.Group>
  <TableIconButton icon={<FaEdit />} color="primary" tooltip="Editar" />
  <TableIconButton icon={<FaTrash />} color="danger" tooltip="Eliminar" />
</TableIconButton.Group>
```

---

### Formularios

```tsx
// Input — label?, error?, fullWidth?, variant: "outlined"|"filled"
// startIcon?, endIcon? | Extiende InputHTMLAttributes
<Input label="Nombre" placeholder="..." error={errors.name?.message} fullWidth startIcon={<FaUser />} />

// Select — label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string, disabled? }[]
<Select label="Estado" options={[{ value: "active", label: "Activo" }]} placeholder="Seleccione..." />

// TextArea — label?, error?, fullWidth?
// resize: "none"|"vertical"|"horizontal"|"both" (default "vertical")
<TextArea label="Descripcion" rows={4} resize="vertical" error={errors.desc?.message} />

// Checkbox — label?: string|ReactNode | error?: string | indeterminate?: boolean
<Checkbox label="Acepto terminos" checked={checked} onChange={onChange} indeterminate={partial} />

// Switch — label?, error?, size: "sm"|"md"|"lg"
<Switch label="Activo" checked={active} onChange={onChange} size="md" />

// Radio — label?, error? | Extiende InputHTMLAttributes
<Radio label="Opcion A" value="a" checked={val === "a"} onChange={onChange} />

// RadioGroup — name, options: { value, label, disabled? }[], value?, onChange?
// label?, error?, direction: "horizontal"|"vertical"
<RadioGroup
  name="tipo"
  label="Tipo"
  options={[{ value: "a", label: "Opcion A" }, { value: "b", label: "Opcion B" }]}
  value={val}
  onChange={setVal}
  direction="horizontal"
/>

// MultiSelect — label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string }[]
// value?: (string|number)[] | onChange?: (values) => void
<MultiSelect
  label="Categorias"
  options={options}
  value={selected}
  onChange={setSelected}
  placeholder="Seleccionar..."
/>

// SearchableSelect — label?, error?, fullWidth?, placeholder?
// options: { value: string|number, label: string, disabled? }[]
// value?: string|number|null | onChange?: (value) => void
// onSearch?: (term) => void | loading?, isLoading?, serverError?
// allowClear?: boolean (default true) | disabled?: boolean
<SearchableSelect
  label="Cliente"
  options={clients}
  value={clientId}
  onChange={setClientId}
  onSearch={handleSearch}
  loading={isLoading}
  placeholder="Buscar cliente..."
/>

// FileInput — label?, error?, fullWidth?, maxFiles?: number, maxSize?: number (MB)
// showPreview?: boolean | multiple?, accept?, disabled?
// filesUplaod: { filename, originalName, size, url }[] (archivos ya subidos)
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

// FormGroup — title?, description?, direction: "horizontal"|"vertical"
// gap: "xs"|"sm"|"md"|"lg"|"xl" | fullWidth?: boolean
<FormGroup title="Datos personales" description="Informacion basica" direction="vertical" gap="md">
  <Input label="Nombre" />
  <Input label="Email" />
</FormGroup>

// ColorPicker — value?, onChange?, label?
// Colores disponibles: gris-espacial, negro, blanco, rojo, azul, verde, naranja, rosa, morado, dorado
<ColorPicker label="Color del dispositivo" value={color} onChange={setColor} />

// FormTabs (requiere FormProvider) — tabs: { label, content, validationFields? }[]
// onSubmit?, submitLabel?, loading?, showNavigation?
// ref: FormTabsRef con metodo resetToFirstTab()
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
// Card — variant: "default"|"outlined"|"elevated"|"filled"|"selected"|"disabled"
// size: "xs"|"sm"|"md"|"lg"|"full" | padding: "none"|"small"|"medium"|"large"
// title?, subtitle?, header?: ReactNode, footer?: ReactNode
// onClick hace la card clickeable
<Card title="Titulo" subtitle="Subtitulo" variant="default" size="md" padding="medium">
  Contenido
</Card>

// CollapsibleCard — title (requerido) | badge?: { text, variant: "critica"|"alta"|"media"|"baja" }
// defaultExpanded?: boolean | onDelete?: () => void | onToggle?: (expanded) => void
<CollapsibleCard
  title="Seccion colapsable"
  badge={{ text: "Alta", variant: "alta" }}
  defaultExpanded={false}
  onDelete={handleDelete}
>
  Contenido colapsable
</CollapsibleCard>
```

---

### Badge

```tsx
// variant: "success"|"warning"|"danger"|"info"|"default"|"secondary"|"outline"
<Badge variant="success">Activo</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="danger">Error</Badge>
```

---

### Modal y Aside

```tsx
// Modal — isOpen, onClose (requeridos)
// title?, footer?: ReactNode | size: "sm"|"md"|"lg"|"xl"
// closeOnOverlayClick?: boolean (default true) | showCloseButton?: boolean (default true)
<Modal isOpen={isOpen} onClose={onClose} title="Titulo" size="md" footer={<ButtonGroup>...</ButtonGroup>}>
  Contenido del modal
</Modal>

// Aside (panel lateral deslizante) — isOpen, onClose (requeridos)
// title?, subtitle?: string|ReactNode | footer?: ReactNode
// width?: string | closeOnOverlayClick?: boolean (default true)
<Aside isOpen={isOpen} onClose={onClose} title="Detalles" width="480px" footer={<Button>Guardar</Button>}>
  Contenido del aside
</Aside>
```

---

### AlertModal y Notificaciones

```tsx
// AlertModal — isOpen, onClose, title, message, buttons (todos requeridos)
// type: "success"|"warning"|"error"|"info"|"default"
// animation: "fade"|"scale"|"slideDown" | duration?: number (ms)
// buttons: { label, variant?, icon?, onClick }[]
<AlertModal
  isOpen={isOpen}
  onClose={onClose}
  title="Confirmar"
  message="Esta accion no se puede deshacer"
  type="warning"
  animation="scale"
  buttons={[
    { label: "Cancelar", variant: "outline", onClick: onClose },
    { label: "Confirmar", variant: "danger", onClick: handleConfirm },
  ]}
/>

// useAlert — hook para mostrar AlertModal desde cualquier componente
const { showSuccess, showError, showWarning, showInfo, closeAlert } = useAlert();
showSuccess("Titulo", "Mensaje", [{ label: "OK", onClick: closeAlert }]);
showError("Error", "Descripcion del error", [{ label: "Cerrar", onClick: closeAlert }]);

// useToast — hook para notificaciones tipo toast
const { showSuccess, showError, showWarning, showInfo } = useToast();
showSuccess("Guardado correctamente");
showError("Error al guardar", "Titulo opcional", 5000); // duracion en ms
showWarning("Advertencia");
showInfo("Informacion");
```

---

### Tablas

```tsx
// SimpleTable (Table) — columnas TanStack Table ColumnDef
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

// DataTable — columnas TanStack Table ColumnDef, con mas funcionalidades
// pageSizeOptions?, initialPageSize? | serverSide?: boolean
// page?, total?, totalPages? (para server-side)
// searchValue?, onSearchChange?, onPageChange?, onPageSizeChange?, onSortingChange?
// enableRowSelection?, rowSelection?, onRowSelectionChange?, getRowId?
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
```

---

### Tabs

```tsx
// Tabs (sin formulario) — tabs: { label, content }[] | defaultTab?: number
<Tabs
  tabs={[
    { label: "General", content: <GeneralTab /> },
    { label: "Avanzado", content: <AdvancedTab /> },
  ]}
  defaultTab={0}
/>

// FormTabs (con react-hook-form) — ver seccion Formularios
```

---

### Accordion

```tsx
// Accordion — title (requerido) | badge?: { text, variant: BadgeVariant }
// headerActions?: ReactNode | defaultExpanded?: boolean
// AccordionItem — misma API, para anidar dentro de Accordion
<Accordion title="Seccion principal" badge={{ text: "3", variant: "info" }} defaultExpanded>
  <AccordionItem title="Sub-seccion" headerActions={<IconButton icon={<FaEdit />} />}>
    Contenido anidado
  </AccordionItem>
</Accordion>
```

---

### Tooltip

```tsx
// content: ReactNode | position: "top"|"bottom"|"left"|"right"
// delay?: number (ms, default 200) | disabled?: boolean | fullWidth?: boolean
<Tooltip content="Texto del tooltip" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

---

### ImageGallery

```tsx
// images: string[] (rutas relativas, se prefija con VITE_API_BASE_URL)
// thumbnailSize?: number (px, default 80) | modalSize: "sm"|"md"|"lg"|"xl"
// alt?: string | showCounter?: boolean
<ImageGallery
  images={["/uploads/img1.jpg", "/uploads/img2.jpg"]}
  thumbnailSize={80}
  modalSize="lg"
  showCounter
/>
```

---

### TimePicker

```tsx
// mode: "single"|"range" | label?, error?, disabled?
// format: "12h"|"24h" | step?: number (minutos, default 15)
// Modo single: value?, onChange?: (time: string) => void
// Modo range: startTime?, endTime?, onRangeChange?: (start, end) => void
<TimePicker label="Hora" mode="single" value={time} onChange={setTime} format="24h" step={30} />
<TimePicker label="Horario" mode="range" startTime={start} endTime={end} onRangeChange={handleRange} />
```

---

### Spinner

```tsx
// LoadingSpinner — mensaje?: string
<LoadingSpinner mensaje="Cargando datos..." />
```

---

### Componentes Especializados

```tsx
// PageTitle — lee el titulo/descripcion del handle de la ruta actual + Breadcrumbs
// No recibe props, se usa directamente en layouts de pagina
<PageTitle />

// Breadcrumbs — genera breadcrumbs automaticamente desde la ruta actual
// Lee labels del router handle o de los permisos del usuario
<Breadcrumbs />

// SearchInput — busqueda con dropdown de resultados
// value, onChange (requeridos) | onSelect?, onSearch?: async (query) => SearchResult[]
// placeholder?, debounceMs?, minChars?, loading?, results?, selectedItem?, error?
<SearchInput
  value={query}
  onChange={setQuery}
  onSearch={async (q) => fetchResults(q)}
  onSelect={(result) => setSelected(result)}
  placeholder="Buscar..."
/>

// StatusDot — variant: "active"|"inactive"|"away"|"busy"
// "active" tiene animacion de pulso
<StatusDot variant="active" />

// PriorityIndicator — priority: "low"|"medium"|"high" | size?: number (default 12)
<PriorityIndicator priority="high" size={14} />

// Badge (StatusDot semantico) — ya documentado arriba

// ExpandableList — muestra el primer item y colapsa el resto
// items: any[] | displayField: string | string[] | emptyText?: string
<ExpandableList items={tags} displayField="name" emptyText="Sin etiquetas" />

// PermissionsSelector — selector de permisos agrupados por modulo
// permissions: Record<string, Permission[]> | selectedPermissions?: number[]
// onChange?: (selectedIds: number[]) => void
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

// PatternLock — patron de desbloqueo tipo Android
// onPatternComplete: (patternSequence: string) => void (ej: "1-5-9-8")
// initialPattern?: string (patron precargado desde BD)
<PatternLock onPatternComplete={setPattern} initialPattern={savedPattern} />

// ErrorBoundary — captura errores de React en el arbol de componentes
<ErrorBoundary>
  <ComponenteThatMightFail />
</ErrorBoundary>
```

---

## Ejemplo: Pagina Completa

```tsx
import {
  Container, Flex, Heading, Text, Button, Card, DataTable, Badge,
  TableIconButton, Modal, useToast
} from "@/shared/components";
import type { ColumnDef } from "@tanstack/react-table";

export default function MyPage() {
  const { showSuccess, showError } = useToast();

  const columns: ColumnDef<MyEntity>[] = [
    { accessorKey: "name", header: "Nombre" },
    { accessorKey: "status", header: "Estado",
      cell: ({ row }) => <Badge variant="success">{row.original.status}</Badge>
    },
    { id: "actions", header: "Acciones",
      cell: ({ row }) => (
        <TableIconButton.Group>
          <TableIconButton icon={<FaEdit />} color="primary" tooltip="Editar" onClick={() => handleEdit(row.original)} />
          <TableIconButton icon={<FaTrash />} color="danger" tooltip="Eliminar" onClick={() => handleDelete(row.original)} />
        </TableIconButton.Group>
      )
    },
  ];

  return (
    <Container size="xl" padding="lg">
      <Flex justify="space-between" align="center" gap="md">
        <div>
          <Heading level="h2">Titulo de Pagina</Heading>
          <Text variant="body2" color="muted">Descripcion breve</Text>
        </div>
        <Button variant="primary" leftIcon={<FaPlus />}>Nueva accion</Button>
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
    </Container>
  );
}
```
