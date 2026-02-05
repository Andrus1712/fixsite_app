import React from 'react';
import styled from 'styled-components';
import { Text, Container, Divider, Flex } from '../index';

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Example = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TextExample: React.FC = () => {
  return (
    <Container size="xl" style={{ padding: '2rem 0' }}>
      <h1>Text Component - Variantes Completas</h1>

      {/* VARIANTES */}
      <Section>
        <SectionTitle>Variantes Predefinidas</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>body1</Label>
            <Text variant="body1">
              Este es un texto body1. Se usa para contenido principal con tamaño base y line-height de 1.5.
            </Text>
          </Example>
          <Example>
            <Label>body2</Label>
            <Text variant="body2">
              Este es un texto body2. Más pequeño que body1, ideal para contenido secundario.
            </Text>
          </Example>
          <Example>
            <Label>paragraph</Label>
            <Text variant="paragraph">
              Este es un párrafo completo con mejor spacing. Ideal para bloques de texto más largos y legibles con line-height de 1.6.
            </Text>
          </Example>
          <Example>
            <Label>paragraph-sm</Label>
            <Text variant="paragraph-sm">
              Párrafo pequeño para secciones compactas. Mantiene buena legibilidad con tamaño reducido.
            </Text>
          </Example>
          <Example>
            <Label>paragraph-lg</Label>
            <Text variant="paragraph-lg">
              Párrafo grande para textos destacados. Perfecto para introducciones o textos principales en páginas grandes.
            </Text>
          </Example>
          <Example>
            <Label>lead</Label>
            <Text variant="lead">
              Este es un texto lead. Introduce el contenido principal con un tamaño más grande y elegante.
            </Text>
          </Example>
          <Example>
            <Label>label</Label>
            <Text variant="label">Etiqueta de formulario</Text>
          </Example>
          <Example>
            <Label>label-sm</Label>
            <Text variant="label-sm">Etiqueta pequeña</Text>
          </Example>
          <Example>
            <Label>label-lg</Label>
            <Text variant="label-lg">Etiqueta grande</Text>
          </Example>
          <Example>
            <Label>caption</Label>
            <Text variant="caption">Texto pequeño para captions y notas al pie</Text>
          </Example>
          <Example>
            <Label>overline</Label>
            <Text variant="overline">Texto en mayúsculas con espaciado</Text>
          </Example>
          <Example>
            <Label>small</Label>
            <Text variant="small">Texto pequeño alternativo</Text>
          </Example>
          <Example>
            <Label>micro</Label>
            <Text variant="micro">Texto micro para detalles muy pequeños</Text>
          </Example>
          <Example>
            <Label>code</Label>
            <Text variant="code">const variable = "código";</Text>
          </Example>
          <Example>
            <Label>code-sm</Label>
            <Text variant="code-sm">let x = 42;</Text>
          </Example>
          <Example>
            <Label>monospace</Label>
            <Text variant="monospace">MONOSPACE_FONT_FAMILY</Text>
          </Example>
          <Example>
            <Label>quote</Label>
            <Text variant="quote">
              Cita importante con estilo especial y borde izquierdo.
            </Text>
          </Example>
          <Example>
            <Label>muted</Label>
            <Text variant="muted">Texto atenuado con opacidad para contenido secundario</Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* COLORES */}
      <Section>
        <SectionTitle>Variantes de Color</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>primary (defecto)</Label>
            <Text color="primary">Texto color primario</Text>
          </Example>
          <Example>
            <Label>secondary</Label>
            <Text color="secondary">Texto color secundario</Text>
          </Example>
          <Example>
            <Label>muted</Label>
            <Text color="muted">Texto color muted/atenuado</Text>
          </Example>
          <Example>
            <Label>success</Label>
            <Text color="success">Texto de éxito</Text>
          </Example>
          <Example>
            <Label>warning</Label>
            <Text color="warning">Texto de advertencia</Text>
          </Example>
          <Example>
            <Label>error</Label>
            <Text color="error">Texto de error</Text>
          </Example>
          <Example>
            <Label>info</Label>
            <Text color="info">Texto informativo</Text>
          </Example>
          <Example>
            <Label>accent</Label>
            <Text color="accent">Texto de acento</Text>
          </Example>
          <Example>
            <Label>disabled</Label>
            <Text color="disabled">Texto deshabilitado</Text>
          </Example>
          <Example>
            <Label>inverse</Label>
            <Text color="inverse" style={{ background: '#111827', padding: '0.5rem' }}>
              Texto invertido
            </Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* PESO */}
      <Section>
        <SectionTitle>Pesos de Fuente</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>thin</Label>
            <Text weight="thin">Texto muy delgado</Text>
          </Example>
          <Example>
            <Label>light</Label>
            <Text weight="light">Texto ligero</Text>
          </Example>
          <Example>
            <Label>normal</Label>
            <Text weight="normal">Texto normal (defecto)</Text>
          </Example>
          <Example>
            <Label>medium</Label>
            <Text weight="medium">Texto medio</Text>
          </Example>
          <Example>
            <Label>semibold</Label>
            <Text weight="semibold">Texto semi-negrita</Text>
          </Example>
          <Example>
            <Label>bold</Label>
            <Text weight="bold">Texto en negrita</Text>
          </Example>
          <Example>
            <Label>extrabold</Label>
            <Text weight="extrabold">Texto extra-negrita</Text>
          </Example>
          <Example>
            <Label>black</Label>
            <Text weight="black">Texto negro/muy negrita</Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* DECORACIÓN */}
      <Section>
        <SectionTitle>Decoración de Texto</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>underline</Label>
            <Text underline>Texto subrayado</Text>
          </Example>
          <Example>
            <Label>lineThrough</Label>
            <Text lineThrough>Texto tachado</Text>
          </Example>
          <Example>
            <Label>underline + lineThrough</Label>
            <Text underline lineThrough>
              Texto subrayado y tachado
            </Text>
          </Example>
          <Example>
            <Label>italic</Label>
            <Text italic>Texto en cursiva</Text>
          </Example>
          <Example>
            <Label>uppercase</Label>
            <Text uppercase>texto en mayúsculas</Text>
          </Example>
          <Example>
            <Label>lowercase</Label>
            <Text lowercase>TEXTO EN minúsculas</Text>
          </Example>
          <Example>
            <Label>capitalize</Label>
            <Text capitalize>cada palabra capitalizada</Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* ALINEACIÓN Y ESPACIADO */}
      <Section>
        <SectionTitle>Alineación y Espaciado</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>align: left</Label>
            <Text align="left">Texto alineado a la izquierda (defecto)</Text>
          </Example>
          <Example>
            <Label>align: center</Label>
            <Text align="center">Texto alineado al centro</Text>
          </Example>
          <Example>
            <Label>align: right</Label>
            <Text align="right">Texto alineado a la derecha</Text>
          </Example>
          <Example>
            <Label>align: justify</Label>
            <Text align="justify">
              Texto justificado que se distribuye de forma uniforme en toda el ancho del contenedor disponible para una lectura más profesional.
            </Text>
          </Example>
          <Example>
            <Label>letterSpacing: tight</Label>
            <Text letterSpacing="tight">Espaciado de letra compacto</Text>
          </Example>
          <Example>
            <Label>letterSpacing: wide</Label>
            <Text letterSpacing="wide">Espaciado de letra amplio</Text>
          </Example>
          <Example>
            <Label>lineHeight: tight (1.2)</Label>
            <Text lineHeight="tight">
              Este es un texto con line height compacto. Ideal para títulos y encabezados donde el espaciado vertical debe ser mínimo.
            </Text>
          </Example>
          <Example>
            <Label>lineHeight: relaxed (1.75)</Label>
            <Text lineHeight="relaxed">
              Este es un texto con line height relajado. Perfecto para párrafos largos donde se necesita mejor espaciado vertical para la legibilidad.
            </Text>
          </Example>
          <Example>
            <Label>lineHeight: loose (2)</Label>
            <Text lineHeight="loose">
              Este es un texto con line height muy relajado. Ideal para contenido que necesita máxima legibilidad y espaciado.
            </Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* TRUNCAMIENTO Y CLIPPING */}
      <Section>
        <SectionTitle>Truncamiento</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>truncate (1 línea)</Label>
            <Text truncate>
              Este es un texto muy largo que será truncado en una sola línea con puntos suspensivos al final cuando exceda el ancho del contenedor.
            </Text>
          </Example>
          <Example>
            <Label>multiline: 2</Label>
            <Text multiline={2}>
              Este es un texto que se limita a dos líneas máximo. Si el texto es más largo que dos líneas, se cortará con puntos suspensivos al final. Perfecto para previsualizaciones.
            </Text>
          </Example>
          <Example>
            <Label>multiline: 3</Label>
            <Text multiline={3}>
              Este es un texto que se limita a tres líneas máximo. Si el contenido excede tres líneas, se cortará automáticamente con puntos suspensivos. Ideal para tarjetas y resúmenes de contenido largo.
            </Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* OPACIDAD */}
      <Section>
        <SectionTitle>Opacidad</SectionTitle>
        <ExampleGrid>
          <Example>
            <Label>opacity: 1 (completa)</Label>
            <Text opacity={1}>Opacidad completa - Visible al 100%</Text>
          </Example>
          <Example>
            <Label>opacity: 0.8</Label>
            <Text opacity={0.8}>Opacidad 80% - Ligeramente transparente</Text>
          </Example>
          <Example>
            <Label>opacity: 0.6</Label>
            <Text opacity={0.6}>Opacidad 60% - Moderadamente transparente</Text>
          </Example>
          <Example>
            <Label>opacity: 0.4</Label>
            <Text opacity={0.4}>Opacidad 40% - Muy transparente</Text>
          </Example>
          <Example>
            <Label>opacity: 0.2</Label>
            <Text opacity={0.2}>Opacidad 20% - Casi invisible</Text>
          </Example>
        </ExampleGrid>
      </Section>

      <Divider margin="lg" />

      {/* COMBINACIONES */}
      <Section>
        <SectionTitle>Combinaciones de Variantes</SectionTitle>
        <Example>
          <Label>Ejemplo 1: Título con estilo</Label>
          <Text variant="paragraph-lg" weight="bold" color="primary" align="center">
            Este es un título grande y destacado
          </Text>
        </Example>

        <Example style={{ marginTop: '1rem' }}>
          <Label>Ejemplo 2: Subtítulo</Label>
          <Text variant="paragraph" color="secondary" italic letterSpacing="wide">
            Subtítulo elegante con espaciado amplio
          </Text>
        </Example>

        <Example style={{ marginTop: '1rem' }}>
          <Label>Ejemplo 3: Texto de error con contexto</Label>
          <Flex direction="column" gap="sm">
            <Text weight="bold" color="error">⚠️ Error de validación</Text>
            <Text size="sm" color="error" opacity={0.9}>
              El campo de email no tiene un formato válido
            </Text>
          </Flex>
        </Example>

        <Example style={{ marginTop: '1rem' }}>
          <Label>Ejemplo 4: Resumen de producto</Label>
          <Flex direction="column" gap="sm">
            <Text weight="semibold" size="lg">
              iPhone 13 Pro Max
            </Text>
            <Text variant="paragraph" multiline={2} color="secondary">
              Smartphone de última generación con cámara de 48MP, pantalla ProMotion de 120Hz y el poderoso procesador A16 Bionic.
            </Text>
            <Text size="sm" color="success" weight="medium">
              ✓ En stock
            </Text>
          </Flex>
        </Example>
      </Section>
    </Container>
  );
};

export default TextExample;
