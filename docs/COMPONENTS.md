# Documentación de Componentes de Estilo

## 📚 Índice

- [Typography](#typography)
- [Layouts](#layouts)
- [Buttons](#buttons)
- [Forms](#forms)
- [Alerts](#alerts)
- [Tema](#tema)

---

## Typography

### Text
Componente base para texto con múltiples variantes y estilos.

```tsx
import { Text } from 'shared/components';

<Text variant="body1" weight="bold" color="primary">
  Texto principal
</Text>
```

**Props:**
- `variant`: `"body1" | "body2" | "caption" | "overline"`
- `weight`: `"normal" | "medium" | "semibold" | "bold"`
- `color`: Ver [Colores disponibles](#colores)
- `align`: `"left" | "center" | "right" | "justify"`
- `italic`: `boolean`
- `underline`: `boolean`
- `uppercase`: `boolean`
- `truncate`: `boolean`

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

## Alerts

### Alert
Componente de alerta con diferentes tipos.

```tsx
import { useAlerts } from 'shared/components';

const { showSuccess, showError, showWarning, showInfo } = useAlerts();

// Mostrar alertas
showSuccess("Operación exitosa");
showError("Error al procesar");
showWarning("Advertencia importante");
showInfo("Información relevante");
```

**Tipos disponibles:**
- `success` - Verde, para operaciones exitosas
- `error` - Rojo, para errores
- `warning` - Amarillo, para advertencias
- `info` - Azul, para información

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
- `success`: #10B981
- `warning`: #F59E0B
- `error`: #EF4444
- `info`: #3B82F6

**Grises (12 tonos):**
- `gray25` a `gray950`

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

---

## Ejemplos de uso

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