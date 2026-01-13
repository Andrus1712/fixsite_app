import React from 'react';
import styled from 'styled-components';
import { Card, Container, Divider, Text, Flex, Button } from '../index';

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

export const CardExample: React.FC = () => {
  return (
    <Container size="lg" style={{ padding: '2rem 0' }}>
      <h1>Card Component - Ejemplos de Uso</h1>

      <ExampleSection>
        <SectionTitle>Card Simple</SectionTitle>
        <Card title="Tarjeta Básica">
          <Text variant="paragraph">
            Este es un ejemplo simple de tarjeta con solo título y contenido.
          </Text>
        </Card>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Card con Subtítulo</SectionTitle>
        <Card title="Título Principal" subtitle="Subtítulo descriptivo">
          <Text variant="paragraph">
            Contenido de la tarjeta con titulo y subtítulo para mayor contexto.
          </Text>
        </Card>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Card con Acciones</SectionTitle>
        <Card
          title="Tarjeta con Acciones"
          actions={
            <Flex gap="sm" justify="flex-end">
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
              <Button variant="primary" size="sm">
                Guardar
              </Button>
            </Flex>
          }
        >
          <Text variant="paragraph">
            Esta tarjeta tiene botones de acción en la parte superior derecha.
          </Text>
        </Card>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Card con Footer</SectionTitle>
        <Card
          title="Tarjeta con Pie"
          footer={
            <Text variant="caption" color="muted">
              Actualizado hace 2 horas
            </Text>
          }
        >
          <Text variant="paragraph">
            Contenido principal de la tarjeta con información en el pie.
          </Text>
        </Card>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Card Completa</SectionTitle>
        <Card
          title="Información de Producto"
          subtitle="iPhone 13 Pro Max"
          actions={
            <Flex gap="sm">
              <Button variant="outline" size="sm">
                Editar
              </Button>
              <Button variant="primary" size="sm">
                Comprar
              </Button>
            </Flex>
          }
          footer={
            <Text variant="caption" color="muted">
              Disponible en stock
            </Text>
          }
        >
          <Flex direction="column" gap="md">
            <div>
              <Text variant="label">Precio:</Text>
              <Text variant="body1" weight="bold">
                $999.00
              </Text>
            </div>
            <div>
              <Text variant="label">Descripción:</Text>
              <Text variant="paragraph">
                Smartphone de última generación con pantalla 6.7 pulgadas, cámara
                dual y batería de larga duración.
              </Text>
            </div>
            <div>
              <Text variant="label">Especificaciones:</Text>
              <Text variant="body2">
                • Pantalla OLED de 120Hz<br />
                • Procesador A16 Bionic<br />
                • Cámara 48MP<br />
                • Batería de 3200mAh
              </Text>
            </div>
          </Flex>
        </Card>
      </ExampleSection>

      <Divider margin="lg" />

      <ExampleSection>
        <SectionTitle>Props Disponibles</SectionTitle>
        <Flex direction="column" gap="md">
          <div>
            <Text variant="label">title (requerido)</Text>
            <Text variant="body2" color="muted">
              Título principal de la tarjeta
            </Text>
          </div>
          <div>
            <Text variant="label">subtitle (opcional)</Text>
            <Text variant="body2" color="muted">
              Subtítulo debajo del título
            </Text>
          </div>
          <div>
            <Text variant="label">children (requerido)</Text>
            <Text variant="body2" color="muted">
              Contenido principal de la tarjeta
            </Text>
          </div>
          <div>
            <Text variant="label">actions (opcional)</Text>
            <Text variant="body2" color="muted">
              Botones u otros elementos de acción
            </Text>
          </div>
          <div>
            <Text variant="label">footer (opcional)</Text>
            <Text variant="body2" color="muted">
              Contenido del pie de la tarjeta
            </Text>
          </div>
        </Flex>
      </ExampleSection>
    </Container>
  );
};

export default CardExample;