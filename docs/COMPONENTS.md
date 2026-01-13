# Documentación de Componentes de Estilo

## 📚 Índice

- [Typography](#typography)
- [Layouts](#layouts)
- [Buttons](#buttons)
- [Forms](#forms)
- [Cards](#cards)
- [Badge](#badge)
- [Alerts y Modales](#alerts-y-modales)
- [Tablas](#tablas)
- [Tema](#tema)
- [Ejemplos Completos](#ejemplos-completos)

---

## Typography

### Text
Componente base para texto con múltiples variantes y estilos.

```tsx
import { Text } from 'shared/components';

// Variantes predefinidas
<Text variant="body1">Texto body1 (default)</Text>
<Text variant="paragraph">Párrafo completo</Text>
<Text variant="label">Etiqueta de formulario</Text>
<Text variant="code">const x = 42;</Text>
<Text variant="quote">Cita importante</Text>
<Text variant="muted">Texto atenuado</Text>

// Con props combinadas
<Text 
  variant="paragraph-lg" 
  weight="bold" 
  color="success" 
  align="center"
>
  Texto personalizado
</Text>

// Con decoraciones
<Text underline>Subrayado</Text>
<Text lineThrough>Tachado</Text>
<Text uppercase>mayúsculas</Text>

// Con truncamiento
<Text truncate>Texto muy largo que se truncará en una línea...</Text>
<Text multiline={3}>Texto limitado a 3 líneas máximo...</Text>
```

**Variantes disponibles:**
- `body1`, `body2` - Texto base
- `paragraph`, `paragraph-sm`, `paragraph-lg` - Párrafos
- `label`, `label-sm`, `label-lg` - Etiquetas
- `lead`, `quote` - Introducción y citas
- `code`, `code-sm` - Código
- `caption`, `overline` - Pequeños textos
- `small`, `micro` - Textos muy pequeños
- `monospace` - Fuente monoespaciada
- `muted` - Texto atenuado

**Props principales:**
- `variant`: Variante predefinida
- `size`: `"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"`
- `weight`: `"thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"`
- `color`: Ver [Colores disponibles](#colores)
- `align`: `"left" | "center" | "right" | "justify"`
- `italic`, `underline`, `lineThrough`, `uppercase`, `lowercase`, `capitalize`: Decoraciones
- `letterSpacing`: `"tight" | "normal" | "wide"`
- `lineHeight`: `"tight" | "normal" | "relaxed" | "loose" | number`
- `truncate`: Trunca en una línea
- `multiline`: Limita a N líneas
- `opacity`: 0-1

### Heading
Componente para títulos H1-H6.

```tsx
import { Heading } from 'shared/components';

<Heading level="h1" color="primary">Título Principal</Heading>
<Heading level="h3" color="secondary">Subtítulo</Heading>
```

**Props:**
- `level`: `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`
- `color`: Ver [Colores disponibles](#colores)
- `align`: `"left" | "center" | "right"`
- `truncate`: `boolean`

### Subtitle
Componente para subtítulos y descripciones.

```tsx
import { Subtitle } from 'shared/components';

<Subtitle variant="subtitle1" color="muted">
  Descripción principal
</Subtitle>
```

**Props:**
- `variant`: `"subtitle1" | "subtitle2"`
- `color`: Ver [Colores disponibles](#colores)
- `align`: `"left" | "center" | "right"`
- `truncate`: `boolean`

### Label
Componente para etiquetas de formularios.

```tsx
import { Label } from 'shared/components';

<Label size="md" weight="semibold" required>
  Nombre
</Label>
```

**Props:**
- `size`: `"sm" | "md" | "lg"`
- `weight`: `"normal" | "medium" | "semibold" | "bold"`
- `color`: Ver [Colores disponibles](#colores)
- `uppercase`: `boolean`
- `required`: `boolean` (muestra asterisco)

### Colores

**Colores semánticos:**
- `primary` - Texto principal
- `secondary` - Texto secundario
- `muted` - Texto atenuado
- `success` - Verde (#10B981)
- `warning` - Amarillo (#F59E0B)
- `error` - Rojo (#EF4444)
- `info` - Azul (#3B82F6)
- `accent` - Color de acento
- `inverse` - Texto inverso
- `disabled` - Texto deshabilitado

**Colores básicos:**
- `white` - Blanco
- `black` - Negro

**Escala de grises:**
- `gray25` a `gray950` (12 tonos)

---

## Layouts

### Box
Contenedor flexible con padding, margin y estilos.

```tsx
import { Box } from 'shared/components';

<Box p="md" bg="white" rounded shadow>
  Contenido
</Box>
```

**Props:**
- `p`, `pt`, `pb`, `pl`, `pr`: Padding
- `m`, `mt`, `mb`, `ml`, `mr`: Margin
- `bg`: Color de fondo
- `rounded`: `boolean` - Bordes redondeados
- `shadow`: `boolean` - Sombra
- `fullWidth`, `fullHeight`: `boolean`
- `title`: Título del contenedor
- `headerActions`: Acciones del header

### Flex
Contenedor flexbox con control completo.

```tsx
import { Flex } from 'shared/components';

<Flex direction="row" justify="space-between" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

**Props:**
- `direction`: `"row" | "column" | "row-reverse" | "column-reverse"`
- `justify`: `"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"`
- `align`: `"flex-start" | "flex-end" | "center" | "stretch" | "baseline"`
- `wrap`: `"nowrap" | "wrap" | "wrap-reverse"`
- `gap`: Ver [Espaciado](#espaciado)

### Grid
Sistema de grillas CSS Grid.

```tsx
import { Grid } from 'shared/components';

<Grid columns={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

**Props:**
- `columns`: `1 | 2 | 3 | 4 | 5 | 6 | 12 | "auto" | "1fr" | string`
- `rows`: Igual que columns
- `gap`: Ver [Espaciado](#espaciado)

### Row / Column
Shortcuts para Flex con dirección predefinida.

```tsx
import { Row, Column } from 'shared/components';

<Row justify="space-between" gap="md">
  <div>Izquierda</div>
  <div>Derecha</div>
</Row>

<Column align="center" gap="sm">
  <div>Arriba</div>
  <div>Abajo</div>
</Column>
```

### Container
Contenedor con ancho máximo y centrado.

```tsx
import { Container } from 'shared/components';

<Container size="lg" padding="md" center>
  Contenido centrado
</Container>
```

**Props:**
- `size`: `"sm" | "md" | "lg" | "xl" | "full"`
- `padding`: Ver [Espaciado](#espaciado)
- `center`: `boolean`

### Espaciado

**Tamaños disponibles:**
- `xxs`: 2px
- `xs`: 4px
- `sm`: 8px
- `md`: 16px (default)
- `lg`: 24px
- `xl`: 32px
- `xxl`: 48px
- `xxxl`: 64px
- `number`: Valor en píxeles

---

## Buttons

### Button
Botón principal con múltiples variantes.

```tsx
import { Button } from 'shared/components';

<Button variant="primary" size="md" loading={false}>
  Guardar
</Button>
```

**Props:**
- `variant`: `"primary" | "secondary" | "danger" | "success" | "outline" | "warning" | "info" | "dark" | "light" | "purple" | "pink" | "indigo"`
- `size`: `"sm" | "md" | "lg"`
- `fullWidth`: `boolean`
- `loading`: `boolean`
- `leftIcon`, `rightIcon`: `ReactNode`

### IconButton
Botón solo con icono.

```tsx
import { IconButton } from 'shared/components';

<IconButton 
  icon={<FaEdit />} 
  size="md" 
  variant="ghost"
  onClick={handleEdit}
/>
```

### ButtonGroup
Agrupa botones relacionados.

```tsx
import { ButtonGroup, Button } from 'shared/components';

<ButtonGroup orientation="horizontal" spacing="md">
  <Button variant="outline">Cancelar</Button>
  <Button variant="primary">Guardar</Button>
</ButtonGroup>
```

---

## Forms

### Tabs
Componente de pestañas sin lógica de formularios acoplada.

```tsx
import { Tabs } from 'shared/components';

const tabs = [
  {
    label: 'Información General',
    content: <div>Contenido pestaña 1</div>
  },
  {
    label: 'Detalles',
    content: <div>Contenido pestaña 2</div>
  },
  {
    label: 'Deshabilitada',
    content: <div>No visible</div>,
    disabled: true
  }
];

<Tabs 
  tabs={tabs} 
  defaultTab={0}
  onChange={(index) => console.log('Pestaña:', index)}
/>
```

**Props:**
- `tabs`: Array de `{ label: string, content: ReactNode, disabled?: boolean }`
- `defaultTab`: Índice de pestaña inicial (default: 0)
- `onChange`: Callback `(index: number) => void`
- `variant`: `"default" | "minimal" | "pill"` (para futuras mejoras)

### FormTabs
Componente de pestañas con integración de react-hook-form.

```tsx
import { FormTabs } from 'shared/components';
import { FormProvider, useForm } from 'react-hook-form';
import type { FormTabsRef } from 'shared/components/Forms/FormTabs';

const formTabsRef = useRef<FormTabsRef>(null);
const methods = useForm();

const tabs = [
  {
    label: 'Datos Personales',
    content: <Input name="nombre" />,
    validationFields: ['nombre']
  },
  {
    label: 'Dirección',
    content: <Input name="direccion" />,
    validationFields: ['direccion']
  }
];

<FormProvider {...methods}>
  <FormTabs 
    ref={formTabsRef}
    tabs={tabs}
    onSubmit={handleSubmit}
    submitLabel="Guardar"
    showNavigation
  />
</FormProvider>
```

**Props:**
- `tabs`: Array de pestañas con validación
- `onSubmit`: Función al enviar
- `submitLabel`: Texto botón envío
- `loading`: Estado de carga
- `showNavigation`: Mostrar botones anterior/siguiente

### Input
Campo de entrada de texto.

```tsx
import { Input } from 'shared/components';

<Input
  label="Nombre"
  placeholder="Ingrese su nombre"
  error="Campo requerido"
  fullWidth
  startIcon={<FaUser />}
/>
```

### Select
Lista desplegable de opciones.

```tsx
import { Select } from 'shared/components';

<Select
  label="País"
  options={[
    { value: "mx", label: "México" },
    { value: "us", label: "Estados Unidos" }
  ]}
  placeholder="Seleccione un país"
/>
```

### Checkbox
Casilla de verificación.

```tsx
import { Checkbox } from 'shared/components';

<Checkbox
  label="Acepto los términos"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>
```

### Switch
Interruptor de encendido/apagado.

```tsx
import { Switch } from 'shared/components';

<Switch
  label="Notificaciones"
  checked={notifications}
  onChange={(e) => setNotifications(e.target.checked)}
  size="md"
/>
```

---

## Cards

### Card
Contenedor de tarjeta con estilos predefinidos.

```tsx
import { Card } from 'shared/components';

<Card title="Mi Tarjeta" subtitle="Subtítulo opcional">
  Contenido de la tarjeta
</Card>

// Con acciones
<Card 
  title="Tarjeta con acciones"
  actions={
    <ButtonGroup>
      <Button variant="outline">Cancelar</Button>
      <Button variant="primary">Guardar</Button>
    </ButtonGroup>
  }
>
  Contenido
</Card>
```

**Props:**
- `title`: Título de la tarjeta
- `subtitle`: Subtítulo opcional
- `children`: Contenido principal
- `actions`: Elementos de acción (botones, etc)
- `footer`: Pie de tarjeta

### CollapsibleCard
Tarjeta colapsable/expandible.

```tsx
import { CollapsibleCard } from 'shared/components';

<CollapsibleCard title="Información adicional">
  Contenido que se puede contraer/expandir
</CollapsibleCard>
```

---

## Badge

### Badge
Componente para mostrar estados, etiquetas y tags.

```tsx
import { Badge } from 'shared/components';

// Diferentes variantes
<Badge variant="success">Completado</Badge>
<Badge variant="warning">Pendiente</Badge>
<Badge variant="danger">Error</Badge>
<Badge variant="info">Información</Badge>
<Badge variant="default">Estándar</Badge>
<Badge variant="secondary">Secundario</Badge>
<Badge variant="outline">Outline</Badge>

// En lista de órdenes
<Flex justify="space-between">
  <Text>Orden #001</Text>
  <Badge variant="success">Entregado</Badge>
</Flex>
```

**Props:**
- `variant`: `"success" | "info" | "warning" | "danger" | "default" | "secondary" | "outline"`
- `children`: Contenido del badge

---

## Alerts y Modales

### Modal
Diálogo modal para confirmar acciones o mostrar contenido.

```tsx
import { Modal } from 'shared/components';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Modal
  title="Confirmar acción"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  actions={
    <ButtonGroup>
      <Button variant="outline" onClick={() => setIsOpen(false)}>
        Cancelar
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirmar
      </Button>
    </ButtonGroup>
  }
>
  ¿Estás seguro de que deseas continuar?
</Modal>
```

### AlertModal (useAlert)
Hook para mostrar alertas modales.

```tsx
import { useAlert } from 'shared/components';

const { showSuccess, showError, closeAlert } = useAlert();

showSuccess('Operación exitosa', 'Los cambios se guardaron');
showError('Error', 'Algo salió mal');
```

### Toast (useToast)
Hook para mostrar notificaciones tipo toast.

```tsx
import { useToast } from 'shared/components';

const { showSuccess, showError, showWarning, showInfo } = useToast();

showSuccess('Guardado correctamente');
showError('Error al procesar');
showWarning('Advertencia importante');
showInfo('Información relevante');
```

---

## Tablas

### Table
Tabla básica para mostrar datos.

```tsx
import { Table } from 'shared/components';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'estado', label: 'Estado' }
];

const data = [
  { id: 1, nombre: 'Producto 1', estado: 'Activo' },
  { id: 2, nombre: 'Producto 2', estado: 'Inactivo' }
];

<Table columns={columns} data={data} />
```

### DataTable
Tabla avanzada con paginación, búsqueda y filtros.

```tsx
import { DataTable } from 'shared/components';

<DataTable
  columns={columns}
  data={data}
  searchable
  paginated
  pageSize={10}
/>
```

---

## Tema

### Configuración
El tema soporta modo claro y oscuro con configuración automática.

```tsx
import { lightThemeConfig, darkThemeConfig } from 'shared/types/theme';

// Usar tema claro (default)
<ThemeProvider theme={lightThemeConfig}>
  <App />
</ThemeProvider>

// Usar tema oscuro
<ThemeProvider theme={darkThemeConfig}>
  <App />
</ThemeProvider>
```

### Colores del tema

**Paleta principal:**
- `primary`: #4338CA (Indigo)
- `secondary`: #10B981 (Emerald)
- `accent`: #F59E0B (Amber)

**Colores semánticos:**
- `success`: #10B981 - Para operaciones exitosas
- `warning`: #F59E0B - Para advertencias
- `error`: #EF4444 - Para errores
- `info`: #3B82F6 - Para información

**Grises (12 tonos):**
```
gray25, gray50, gray100, gray200, gray300, gray400,
gray500, gray600, gray700, gray800, gray900, gray950
```

### Tamaños de fuente

```tsx
// Disponibles en theme.fontSize
xs: 12px
sm: 14px
base: 16px
lg: 18px
xl: 20px
2xl: 24px
3xl: 30px
4xl: 36px
5xl: 48px
6xl: 60px
```

### Pesos de fuente

```tsx
// Disponibles en theme.fontWeight
thin: 100
light: 300
normal: 400
medium: 500
semibold: 600
bold: 700
extrabold: 800
black: 900
```

### Espaciado

```tsx
// Disponibles en theme.spacing
xxs: 2px
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
xxxl: 64px
```

### Sombras

```tsx
// Disponibles en theme.shadows
sm: Sombra sutil
base: Sombra estándar
md: Sombra media
lg: Sombra grande
xl: Sombra extra grande
2xl: Sombra máxima
inner: Sombra interna
```

### Bordes Redondeados

```tsx
// Disponibles en theme.borderRadius
none: 0
sm: 2px
base: 4px
md: 6px
lg: 8px
xl: 12px
2xl: 16px
3xl: 24px
full: 9999px
```

---

## Ejemplos Completos

### Formulario de Producto

```tsx
import { 
  Container, Box, Heading, FormTabs, 
  Input, Select, TextArea, Button, FormGroup
} from 'shared/components';
import { FormProvider, useForm } from 'react-hook-form';

function ProductForm() {
  const methods = useForm({
    defaultValues: {
      nombre: '',
      categoria: '',
      precio: '',
      descripcion: ''
    }
  });

  const tabs = [
    {
      label: 'Información Básica',
      content: (
        <FormGroup>
          <Input
            label="Nombre del producto"
            placeholder="Ej: iPhone 13 Pro"
            required
          />
          <Select
            label="Categoría"
            options={[
              { value: 'celular', label: 'Celulares' },
              { value: 'accesorios', label: 'Accesorios' }
            ]}
            required
          />
        </FormGroup>
      ),
      validationFields: ['nombre', 'categoria']
    },
    {
      label: 'Detalles',
      content: (
        <FormGroup>
          <Input
            label="Precio"
            type="number"
            placeholder="0.00"
            required
          />
          <TextArea
            label="Descripción"
            placeholder="Describe el producto..."
            rows={4}
          />
        </FormGroup>
      ),
      validationFields: ['precio', 'descripcion']
    }
  ];

  return (
    <Container size="md" padding="lg">
      <Box p="lg" bg="white" rounded shadow>
        <Heading level="h2">Nuevo Producto</Heading>
        
        <FormProvider {...methods}>
          <FormTabs
            tabs={tabs}
            onSubmit={methods.handleSubmit(onSubmit)}
            submitLabel="Crear Producto"
          />
        </FormProvider>
      </Box>
    </Container>
  );
}
```

### Lista de Órdenes

```tsx
import { 
  Container, Text, Flex, Badge, Card, Button
} from 'shared/components';

function OrdersList() {
  const orders = [
    { id: '001', device: 'iPhone 13', status: 'success', date: '2024-01-10' },
    { id: '002', device: 'Samsung S21', status: 'warning', date: '2024-01-09' },
    { id: '003', device: 'iPad Pro', status: 'danger', date: '2024-01-08' }
  ];

  return (
    <Container size="lg" padding="lg">
      {orders.map(order => (
        <Card key={order.id} title={`Orden #${order.id}`}>
          <Flex direction="column" gap="md">
            <Flex justify="space-between" align="center">
              <Text>{order.device}</Text>
              <Badge variant={order.status as any}>
                {order.status === 'success' ? 'Completado' :
                 order.status === 'warning' ? 'Pendiente' : 'Error'}
              </Badge>
            </Flex>
            <Text color="muted">{order.date}</Text>
            <Button variant="primary" fullWidth>
              Ver detalles
            </Button>
          </Flex>
        </Card>
      ))}
    </Container>
  );
}
```

### Dashboard con Tabs

```tsx
import { 
  Container, Heading, Tabs, Text, Flex, Badge, Grid
} from 'shared/components';

function Dashboard() {
  const tabs = [
    {
      label: 'Resumen',
      content: (
        <Flex direction="column" gap="lg">
          <Text variant="paragraph-lg" weight="bold">
            Estadísticas Generales
          </Text>
          <Grid columns={3} gap="md">
            <Card title="Total de Órdenes">
              <Text variant="2xl" weight="bold">145</Text>
            </Card>
            <Card title="Completadas">
              <Badge variant="success">98</Badge>
            </Card>
            <Card title="Pendientes">
              <Badge variant="warning">47</Badge>
            </Card>
          </Grid>
        </Flex>
      )
    },
    {
      label: 'Actividad Reciente',
      content: (
        <Flex direction="column" gap="md">
          <Text variant="paragraph">
            Aquí iría la lista de actividades recientes...
          </Text>
        </Flex>
      )
    }
  ];

  return (
    <Container size="xl" padding="lg">
      <Heading level="h1">Dashboard</Heading>
      <Tabs tabs={tabs} />
    </Container>
  );
}
```

### Formulario completo

```tsx
import { 
  Box, 
  Heading, 
  Input, 
  Select, 
  Checkbox, 
  Button, 
  Row 
} from 'shared/components';

function UserForm() {
  return (
    <Box p="lg" bg="white" rounded shadow>
      <Heading level="h2" color="primary">
        Nuevo Usuario
      </Heading>
      
      <Input
        label="Nombre completo"
        placeholder="Ingrese el nombre"
        fullWidth
        required
      />
      
      <Select
        label="Rol"
        options={roles}
        placeholder="Seleccione un rol"
        fullWidth
      />
      
      <Checkbox
        label="Usuario activo"
        checked={active}
        onChange={setActive}
      />
      
      <Row justify="flex-end" gap="md">
        <Button variant="outline">
          Cancelar
        </Button>
        <Button variant="primary">
          Guardar
        </Button>
      </Row>
    </Box>
  );
}
```

### Layout de página

```tsx
import { 
  Container, 
  Flex, 
  Heading, 
  Text, 
  Button 
} from 'shared/components';

function Dashboard() {
  return (
    <Container size="xl" padding="lg">
      <Flex direction="column" gap="xl">
        <Flex justify="space-between" align="center">
          <div>
            <Heading level="h1">Dashboard</Heading>
            <Text color="muted">
              Resumen de actividades
            </Text>
          </div>
          <Button variant="primary">
            Nueva acción
          </Button>
        </Flex>
        
        {/* Contenido del dashboard */}
      </Flex>
    </Container>
  );
}
```