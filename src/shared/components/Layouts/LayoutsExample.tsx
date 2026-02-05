import React from 'react';
import styled from 'styled-components';
import { Container, Divider, Text, Box, Flex, Column, Row, Grid, Spacer } from '../index';

const ExampleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const DemoBox = styled(Box)`
  background: ${({ theme }) => theme.colors.primary}20;
  border: 1px dashed ${({ theme }) => theme.colors.primary};
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

export const LayoutsExample: React.FC = () => {
  return (
    <Container $size="lg" style={{ padding: '2rem 0' }}>
      <h1>Layouts Component - Ejemplos de Uso</h1>
      <Text color="secondary" $mb="xl">
        Refactorizados para usar tokens del tema y props transitorias ($) para evitar advertencias de React.
      </Text>

      <ExampleSection>
        <SectionTitle>Flex - Dirección Row (Horizontal)</SectionTitle>
        <Flex $gap="md">
          <DemoBox $flex={1}>Item 1</DemoBox>
          <DemoBox $flex={1}>Item 2</DemoBox>
          <DemoBox $flex={1}>Item 3</DemoBox>
        </Flex>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Flex - Dirección Column (Vertical)</SectionTitle>
        <Flex $direction="column" $gap="md">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Flex>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Flex - Justify Space-Between</SectionTitle>
        <Flex $justify="space-between" $gap="md">
          <DemoBox $flex={1}>Izquierda</DemoBox>
          <DemoBox $flex={1}>Centro</DemoBox>
          <DemoBox $flex={1}>Derecha</DemoBox>
        </Flex>
      </ExampleSection>

      <Divider $margin="lg" />

      <ExampleSection>
        <SectionTitle>Row - Shortcut para Flex Horizontal (con alineación centro por defecto)</SectionTitle>
        <Row $gap="md">
          <Text>Etiqueta:</Text>
          <DemoBox $flex={1}>Contenido alineado al centro verticalmente</DemoBox>
        </Row>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Column - Shortcut para Flex Vertical</SectionTitle>
        <Column $gap="md" style={{ maxWidth: '300px' }}>
          <Text weight="bold">Título del Grupo</Text>
          <Text variant="body2" color="secondary">Descripción corta del contenido de la columna</Text>
          <DemoBox>Contenido</DemoBox>
        </Column>
      </ExampleSection>

      <Divider $margin="lg" />

      <ExampleSection>
        <SectionTitle>Grid - Basado en Columnas</SectionTitle>
        <Grid $columns={3} $gap="md">
          <DemoBox>Columna 1</DemoBox>
          <DemoBox>Columna 2</DemoBox>
          <DemoBox>Columna 3</DemoBox>
          <DemoBox>Columna 4</DemoBox>
          <DemoBox>Columna 5</DemoBox>
          <DemoBox>Columna 6</DemoBox>
        </Grid>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Grid - Responsivo (Auto-fit por defecto)</SectionTitle>
        <Grid $gap="md">
          <DemoBox>Item Automático</DemoBox>
          <DemoBox>Item Automático</DemoBox>
          <DemoBox>Item Automático</DemoBox>
        </Grid>
      </ExampleSection>

      <Divider $margin="lg" />

      <ExampleSection>
        <SectionTitle>Box - Contenedor con Estilos de Tema</SectionTitle>
        <Row $gap="lg" $wrap>
          <Box $p="lg" $bg="white" $rounded $shadow $flex={1}>
            <Text weight="bold" $mb="xs">Título del Box</Text>
            <Text variant="body2">
              Este Box usa tokens: $p="lg", $rounded, $shadow.
            </Text>
          </Box>
          <Box $p="lg" $bg="#f8fafc" $border="1px solid #e2e8f0" $rounded $flex={1}>
            <Text weight="bold" $mb="xs">Box con Borde</Text>
            <Text variant="body2">
              Usa $bg personalizado y $border manual.
            </Text>
          </Box>
        </Row>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Box con Header Integrado</SectionTitle>
        <Box
          title="Facturación"
          subtitle="Resumen de los últimos movimientos"
          headerActions={<Text color="primary" style={{ cursor: 'pointer' }}>Ver todo</Text>}
          $bg="white"
          $rounded
          $shadow
          $p="lg"
        >
          <DemoBox>Área de Contenido Principal</DemoBox>
        </Box>
      </ExampleSection>

      <Divider $margin="lg" />

      <ExampleSection>
        <SectionTitle>Spacer y Divider</SectionTitle>
        <Box $bg="white" $p="md" $rounded $shadow>
          <Text weight="bold">Elemento Superior</Text>
          <Spacer $size="lg" />
          <Divider $gradient />
          <Spacer $size="lg" />
          <Text weight="bold">Elemento Inferior después de Spacer y Divider Gradiente</Text>
        </Box>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Spacer Horizontal</SectionTitle>
        <Row $align="center" $bg="white" $p="md" $rounded $shadow>
          <Text>Inicio</Text>
          <Spacer $size="xl" $horizontal />
          <Text>Fin (Con gran espacio horizontal)</Text>
        </Row>
      </ExampleSection>

      <Divider $margin="xl" />

      <ExampleSection>
        <SectionTitle>Nuevas Props Disponibles (Usar preferiblemente con $)</SectionTitle>
        <Grid $columns={2} $gap="lg">
          <Column $gap="xs">
            <Text weight="bold" size="sm">Espaciado ($gap, $p, $m)</Text>
            <Text variant="body2" color="secondary">xxs, xs, sm, md, lg, xl, xxl, xxxl | number | string</Text>
          </Column>
          <Column $gap="xs">
            <Text weight="bold" size="sm">Dirección / Grid ($columns, $rows, $direction)</Text>
            <Text variant="body2" color="secondary">Number o strings personalizados</Text>
          </Column>
          <Column $gap="xs">
            <Text weight="bold" size="sm">Alineación ($justify, $align)</Text>
            <Text variant="body2" color="secondary">Standard Flex/Grid properties</Text>
          </Column>
          <Column $gap="xs">
            <Text weight="bold" size="sm">Compatibilidad</Text>
            <Text variant="body2" color="secondary">Soporta props antiguas (gap, padding, etc) pero se recomienda $.</Text>
          </Column>
        </Grid>
      </ExampleSection>
    </Container>
  );
};

export default LayoutsExample;
