import React, { useState } from 'react';
import styled from 'styled-components';
import { IoAdd, IoRefresh, IoTrash } from 'react-icons/io5';
import Button from './Button';
import { Container, Divider, Flex } from '../Layouts';
import { Text } from '../Typography';
import ButtonGroup from './ButtonGroup';
import IconButton from './IconButton';

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

const VariantsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ButtonsExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <h1>Buttons Component - Ejemplos de Uso</h1>

      <ExampleSection>
        <SectionTitle>Variantes de Botón</SectionTitle>
        <VariantsGrid>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="light">Light</Button>
          <Button variant="purple">Purple</Button>
          <Button variant="pink">Pink</Button>
          <Button variant="indigo">Indigo</Button>
        </VariantsGrid>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Tamaños</SectionTitle>
        <Flex direction="column" gap="md">
          <Button size="sm">Botón pequeño</Button>
          <Button size="md">Botón mediano (default)</Button>
          <Button size="lg">Botón grande</Button>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Con Iconos</SectionTitle>
        <Flex direction="column" gap="md">
          <Button variant="primary" leftIcon={<IoAdd />}>
            Crear
          </Button>
          <Button variant="secondary" rightIcon={<IoRefresh />}>
            Recargar
          </Button>
          <Button variant="danger" leftIcon={<IoTrash />}>
            Eliminar
          </Button>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Estados</SectionTitle>
        <Flex direction="column" gap="md">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
          <Button 
            variant="primary" 
            loading={loading}
            onClick={handleLoadingClick}
          >
            {loading ? 'Procesando...' : 'Click para cargar'}
          </Button>
          <Button variant="primary" fullWidth>
            Ancho completo
          </Button>
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>ButtonGroup</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Text variant="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Horizontal (default)
            </Text>
            <ButtonGroup>
              <Button variant="outline">Opción 1</Button>
              <Button variant="outline">Opción 2</Button>
              <Button variant="outline">Opción 3</Button>
            </ButtonGroup>
          </div>
          <div>
            <Text variant="label" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Vertical
            </Text>
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Opción A</Button>
              <Button variant="outline">Opción B</Button>
              <Button variant="outline">Opción C</Button>
            </ButtonGroup>
          </div>
        </div>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>IconButton</SectionTitle>
        <Flex gap="md">
          <IconButton icon={<IoAdd />} size="md" />
          <IconButton icon={<IoRefresh />} size="md" />
          <IconButton icon={<IoTrash />} size="md" />
          <IconButton icon={<IoAdd />} size="md" />
        </Flex>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Props Principales</SectionTitle>
        <Flex direction="column" gap="md">
          <div>
            <Text variant="label">variant</Text>
            <Text variant="body2" color="muted">
              "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "outline" | "dark" | "light" | "purple" | "pink" | "indigo"
            </Text>
          </div>
          <div>
            <Text variant="label">size</Text>
            <Text variant="body2" color="muted">
              "sm" | "md" | "lg"
            </Text>
          </div>
          <div>
            <Text variant="label">loading</Text>
            <Text variant="body2" color="muted">
              boolean - Muestra spinner y desactiva
            </Text>
          </div>
          <div>
            <Text variant="label">disabled</Text>
            <Text variant="body2" color="muted">
              boolean - Desactiva el botón
            </Text>
          </div>
          <div>
            <Text variant="label">fullWidth</Text>
            <Text variant="body2" color="muted">
              boolean - Ocupa el ancho completo
            </Text>
          </div>
          <div>
            <Text variant="label">leftIcon / rightIcon</Text>
            <Text variant="body2" color="muted">
              ReactNode - Icono a la izquierda o derecha
            </Text>
          </div>
        </Flex>
      </ExampleSection>
    </Container>
  );
};

export default ButtonsExample;
