import React, { useState } from "react";
import { DropdownButton } from "./DropdownButton";
import { Container, Flex, Heading, Spacer, Text } from "../index";
import {
  IoCheckmark,
  IoDocumentText,
  IoTrash,
  IoEllipsisVertical,
  IoCheckmarkDone,
  IoPencil,
  IoCopy,
  IoDownload,
  IoShareSocial,
} from "react-icons/io5";

export const DropdownButtonExample: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string>("");

  return (
    <Container padding="lg">
      <Heading as="h2" size="lg" margin="0 0 2rem 0">
        DropdownButton Component
      </Heading>

      {/* Basic Usage */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Basic Usage
        </Heading>
        <Flex gap="md">
          <DropdownButton
            label="Acciones"
            variant="primary"
            items={[
              {
                id: "edit",
                label: "Editar",
                icon: <IoPencil />,
                onClick: () => setSelectedAction("Editar"),
              },
              {
                id: "view",
                label: "Ver Detalles",
                icon: <IoCheckmark />,
                onClick: () => setSelectedAction("Ver Detalles"),
              },
              {
                id: "delete",
                label: "Eliminar",
                icon: <IoTrash />,
                isDanger: true,
                onClick: () => setSelectedAction("Eliminar"),
              },
            ]}
          />
          {selectedAction && (
            <Text variant="body1" color="success">
              Acción seleccionada: {selectedAction}
            </Text>
          )}
        </Flex>
      </div>

      {/* Button Variants */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Button Variants
        </Heading>
        <Flex gap="md" wrap>
          <DropdownButton
            label="Primary"
            variant="primary"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Secondary"
            variant="secondary"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Success"
            variant="success"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Danger"
            variant="danger"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Outline"
            variant="outline"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
        </Flex>
      </div>

      {/* Button Sizes */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Button Sizes
        </Heading>
        <Flex gap="md">
          <DropdownButton
            label="Small"
            size="sm"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Medium"
            size="md"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Large"
            size="lg"
            items={[
              {
                id: "1",
                label: "Opción 1",
                onClick: () => {},
              },
              {
                id: "2",
                label: "Opción 2",
                onClick: () => {},
              },
            ]}
          />
        </Flex>
      </div>

      {/* With Icons */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          With Icons
        </Heading>
        <Flex gap="md" wrap>
          <DropdownButton
            label="Más"
            leftIcon={<IoEllipsisVertical />}
            items={[
              {
                id: "copy",
                label: "Copiar",
                icon: <IoCopy />,
                onClick: () => {},
              },
              {
                id: "download",
                label: "Descargar",
                icon: <IoDownload />,
                onClick: () => {},
              },
              {
                id: "share",
                label: "Compartir",
                icon: <IoShareSocial />,
                onClick: () => {},
              },
            ]}
          />
          <DropdownButton
            label="Más Acciones"
            rightIcon={<IoEllipsisVertical />}
            items={[
              {
                id: "done",
                label: "Marcar como hecho",
                icon: <IoCheckmarkDone />,
                onClick: () => {},
              },
              {
                id: "edit",
                label: "Editar",
                icon: <IoPencil />,
                onClick: () => {},
              },
            ]}
          />
        </Flex>
      </div>

      {/* Grouped Menu Sections */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Grouped Menu Sections
        </Heading>
        <DropdownButton
          label="Orden"
          variant="primary"
          items={[
            {
              label: "Acciones",
              options: [
                {
                  id: "repair",
                  label: "Iniciar Reparación",
                  icon: <IoCheckmark />,
                  onClick: () => setSelectedAction("Iniciar Reparación"),
                },
                {
                  id: "presupuesto",
                  label: "Hacer Presupuesto",
                  icon: <IoDocumentText />,
                  onClick: () => setSelectedAction("Hacer Presupuesto"),
                },
              ],
            },
            {
              label: "Peligro",
              options: [
                {
                  id: "cancel",
                  label: "Cancelar Orden",
                  icon: <IoTrash />,
                  isDanger: true,
                  onClick: () => setSelectedAction("Cancelar Orden"),
                },
              ],
            },
          ]}
        />
      </div>

      {/* Disabled Items */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Disabled Items
        </Heading>
        <DropdownButton
          label="Acciones"
          items={[
            {
              id: "1",
              label: "Opción activa",
              onClick: () => {},
            },
            {
              id: "2",
              label: "Opción deshabilitada",
              onClick: () => {},
              disabled: true,
            },
            {
              id: "3",
              label: "Otra opción",
              onClick: () => {},
            },
          ]}
        />
      </div>

      {/* Disabled Button */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Disabled Button
        </Heading>
        <DropdownButton
          label="Deshabilitado"
          disabled={true}
          items={[
            {
              id: "1",
              label: "Opción 1",
              onClick: () => {},
            },
          ]}
        />
      </div>

      {/* Full Width */}
      <Spacer height="md" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Full Width
        </Heading>
        <DropdownButton
          label="Acciones de Orden (Full Width)"
          variant="primary"
          fullWidth={true}
          items={[
            {
              id: "view",
              label: "Ver Detalles",
              icon: <IoCheckmark />,
              onClick: () => {},
            },
            {
              id: "edit",
              label: "Editar",
              icon: <IoPencil />,
              onClick: () => {},
            },
            {
              id: "delete",
              label: "Eliminar",
              icon: <IoTrash />,
              isDanger: true,
              onClick: () => {},
            },
          ]}
        />
      </div>

      {/* Real World Example - Order Actions */}
      <Spacer height="lg" />
      <div>
        <Heading as="h3" size="md" margin="0 0 1rem 0">
          Real World Example - Order Management
        </Heading>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "rgba(0,0,0,0.02)",
            borderRadius: "8px",
          }}
        >
          <Text variant="label" weight="600" margin="0 0 1rem 0">
            Order #12345
          </Text>
          <Flex gap="md">
            <DropdownButton
              label="Acciones"
              variant="primary"
              size="md"
              items={[
                {
                  label: "Gestión",
                  options: [
                    {
                      id: "repair",
                      label: "Iniciar Reparación",
                      icon: <IoCheckmark />,
                      onClick: () =>
                        setSelectedAction("Reparación iniciada"),
                    },
                    {
                      id: "presupuesto",
                      label: "Hacer Presupuesto",
                      icon: <IoDocumentText />,
                      onClick: () =>
                        setSelectedAction("Presupuesto creado"),
                    },
                  ],
                },
                {
                  label: "Exportar",
                  options: [
                    {
                      id: "print",
                      label: "Imprimir",
                      onClick: () => setSelectedAction("Imprimiendo..."),
                    },
                    {
                      id: "download",
                      label: "Descargar PDF",
                      icon: <IoDownload />,
                      onClick: () =>
                        setSelectedAction("Descargando PDF..."),
                    },
                  ],
                },
                {
                  label: "Peligro",
                  options: [
                    {
                      id: "cancel",
                      label: "Cancelar Orden",
                      icon: <IoTrash />,
                      isDanger: true,
                      onClick: () => setSelectedAction("Orden cancelada"),
                    },
                  ],
                },
              ]}
            />
            {selectedAction && (
              <Text variant="body1" color="success">
                ✓ {selectedAction}
              </Text>
            )}
          </Flex>
        </div>
      </div>
    </Container>
  );
};

export default DropdownButtonExample;
