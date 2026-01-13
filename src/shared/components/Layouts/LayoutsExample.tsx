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
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <h1>Layouts Component - Ejemplos de Uso</h1>

      <ExampleSection>
        <SectionTitle>Flex - Dirección Row (Horizontal)</SectionTitle>
        <Flex gap="md">
          <DemoBox flex={1}>Item 1</DemoBox>
          <DemoBox flex={1}>Item 2</DemoBox>
          <DemoBox flex={1}>Item 3</DemoBox>
        </Flex>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Flex - Dirección Column (Vertical)</SectionTitle>
        <Flex direction="column" gap="md">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
        </Flex>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Flex - Justify Space-Between</SectionTitle>
        <Flex justify="space-between" gap="md">
          <DemoBox flex={1}>Izquierda</DemoBox>
          <DemoBox flex={1}>Centro</DemoBox>
          <DemoBox flex={1}>Derecha</DemoBox>
        </Flex>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Flex - Align Center</SectionTitle>
        <Flex align="center" gap="md">
          <DemoBox style={{ minHeight: '40px' }}>Pequeño</DemoBox>
          <DemoBox style={{ minHeight: '80px' }}>Grande</DemoBox>
          <DemoBox style={{ minHeight: '60px' }}>Medio</DemoBox>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Row - Shortcut para Flex Horizontal</SectionTitle>
        <Row $align="center" gap="md">
          <Text>Etiqueta:</Text>
          <DemoBox flex={1}>Contenido</DemoBox>
        </Row>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Column - Shortcut para Flex Vertical</SectionTitle>
        <Column gap="md" style={{ maxWidth: '300px' }}>
          <Text weight="bold">Título</Text>
          <Text color="muted">Descripción corta del contenido</Text>
          <DemoBox>Contenido</DemoBox>
        </Column>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Grid - 3 Columnas</SectionTitle>
        <Grid columns={3} gap="md">
          <DemoBox>Columna 1</DemoBox>
          <DemoBox>Columna 2</DemoBox>
          <DemoBox>Columna 3</DemoBox>
          <DemoBox>Columna 4</DemoBox>
          <DemoBox>Columna 5</DemoBox>
          <DemoBox>Columna 6</DemoBox>
        </Grid>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Grid - 2 Columnas</SectionTitle>
        <Grid columns={2} gap="md">
          <DemoBox>Item 1</DemoBox>
          <DemoBox>Item 2</DemoBox>
          <DemoBox>Item 3</DemoBox>
          <DemoBox>Item 4</DemoBox>
        </Grid>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Box - Contenedor con Estilos</SectionTitle>
        <Box p="lg" bg="white" rounded shadow>
          <Text variant="paragraph">
            Este es un Box con padding large, fondo blanco, bordes redondeados y sombra.
          </Text>
        </Box>
      </ExampleSection>

      <ExampleSection>
        <SectionTitle>Box - Con Todos los Props</SectionTitle>
        <Box 
          p="lg" 
          pt="xl"
          pb="md"
          bg="primary"
          rounded
          shadow
          fullWidth
        >
          <Text color="inverse" weight="bold">
            Box completamente personalizado
          </Text>
        </Box>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Spacer - Espaciador Flexible</SectionTitle>
        <Flex direction="column" gap="md">
          <Row>
            <Text>Arriba</Text>
            <Spacer />
            <Text>Abajo</Text>
          </Row>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Container - Ancho Máximo</SectionTitle>
        <Flex direction="column" gap="md">
          <Text variant="label">size="sm" (640px)</Text>
          <Container size="sm">
            <DemoBox>Contenedor pequeño</DemoBox>
          </Container>
          
          <Text variant="label" style={{ marginTop: '1rem' }}>size="md" (768px)</Text>
          <Container size="md">
            <DemoBox>Contenedor mediano</DemoBox>
          </Container>
          
          <Text variant="label" style={{ marginTop: '1rem' }}>size="lg" (1024px)</Text>
          <Container size="lg">
            <DemoBox>Contenedor grande</DemoBox>
          </Container>
          
          <Text variant="label" style={{ marginTop: '1rem' }}>size="xl" (1200px)</Text>
          <Container size="xl">
            <DemoBox>Contenedor extra grande</DemoBox>
          </Container>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Props Principales de Flex</SectionTitle>
        <Flex direction="column" gap="md">
          <div>
            <Text variant="label">direction</Text>
            <Text variant="body2" color="muted">
              "row" | "column" | "row-reverse" | "column-reverse"
            </Text>
          </div>
          <div>
            <Text variant="label">justify</Text>
            <Text variant="body2" color="muted">
              "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
            </Text>
          </div>
          <div>
            <Text variant="label">align</Text>
            <Text variant="body2" color="muted">
              "flex-start" | "flex-end" | "center" | "stretch" | "baseline"
            </Text>
          </div>
          <div>
            <Text variant="label">gap</Text>
            <Text variant="body2" color="muted">
              "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | number
            </Text>
          </div>
          <div>
            <Text variant="label">wrap</Text>
            <Text variant="body2" color="muted">
              "nowrap" | "wrap" | "wrap-reverse"
            </Text>
          </div>
        </Flex>
      </ExampleSection>
    </Container>
  );
};

export default LayoutsExample;
