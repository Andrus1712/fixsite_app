import React, { useState } from "react";
import styled from "styled-components";
import { Tabs } from "./Tabs";
import { Text } from "../Typography";
import { Container, Divider } from "../Layouts";

const ExampleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const TabsExample: React.FC = () => {
    const [activeTab, setActiveTab] = useState<number>(0);

    const basicTabs = [
        {
            label: "Información General",
            content: (
                <div>
                    <Text variant="paragraph">
                        Este es el contenido de la pestaña de información general. Puedes incluir cualquier contenido
                        React aquí.
                    </Text>
                </div>
            ),
        },
        {
            label: "Detalles",
            content: (
                <div>
                    <Text variant="paragraph">
                        Aquí van los detalles adicionales del componente. Este componente es completamente flexible.
                    </Text>
                </div>
            ),
        },
        {
            label: "Configuración",
            content: (
                <div>
                    <Text variant="paragraph">Sección de configuración con opciones personalizables.</Text>
                </div>
            ),
        },
    ];

    const disabledTabs = [
        {
            label: "Disponible 1",
            content: (
                <div>
                    <Text variant="paragraph">Esta pestaña está habilitada y funciona correctamente.</Text>
                </div>
            ),
        },
        {
            label: "Deshabilitada",
            content: <div>Este contenido no debería verse</div>,
            disabled: true,
        },
        {
            label: "Disponible 2",
            content: (
                <div>
                    <Text variant="paragraph">Esta pestaña también está habilitada.</Text>
                </div>
            ),
        },
    ];

    const complexTabs = [
        {
            label: "Dashboard",
            content: (
                <div>
                    <Text variant="paragraph-lg" weight="semibold" style={{ marginBottom: "1rem" }}>
                        📊 Dashboard
                    </Text>
                    <Text variant="paragraph">
                        Bienvenido al panel de control. Aquí puedes ver un resumen de todas las actividades recientes.
                    </Text>
                </div>
            ),
        },
        {
            label: "Usuarios",
            content: (
                <div>
                    <Text variant="paragraph-lg" weight="semibold" style={{ marginBottom: "1rem" }}>
                        👥 Gestión de Usuarios
                    </Text>
                    <Text variant="paragraph">Administra los usuarios del sistema, asigna roles y permisos.</Text>
                </div>
            ),
        },
        {
            label: "Reportes",
            content: (
                <div>
                    <Text variant="paragraph-lg" weight="semibold" style={{ marginBottom: "1rem" }}>
                        📈 Reportes
                    </Text>
                    <Text variant="paragraph">Visualiza reportes detallados y estadísticas del sistema.</Text>
                </div>
            ),
        },
        {
            label: "Configuración",
            content: (
                <div>
                    <Text variant="paragraph-lg" weight="semibold" style={{ marginBottom: "1rem" }}>
                        ⚙️ Configuración
                    </Text>
                    <Text variant="paragraph">Ajusta las configuraciones generales del sistema.</Text>
                </div>
            ),
        },
    ];

    return (
        <Container size="xl" style={{ padding: "2rem 0" }}>
            <h1>Tabs Component - Ejemplos</h1>

            <ExampleSection>
                <SectionTitle>Ejemplo Básico</SectionTitle>
                <Text variant="body2" color="muted" style={{ marginBottom: "1rem" }}>
                    Tabs simple con 3 pestañas. Haz clic para cambiar de contenido.
                </Text>
                <Tabs tabs={basicTabs} />
            </ExampleSection>

            <Divider margin="lg" />

            <ExampleSection>
                <SectionTitle>Con Callback onChange</SectionTitle>
                <Text variant="body2" color="muted" style={{ marginBottom: "1rem" }}>
                    Esta versión tiene un callback que detecta el cambio de pestaña. Pestaña activa:{" "}
                    <strong>{activeTab}</strong>
                </Text>
                <Tabs
                    tabs={basicTabs}
                    defaultTab={0}
                    onChange={(index) => {
                        setActiveTab(index);
                        console.log("Cambió a pestaña:", index);
                    }}
                />
            </ExampleSection>

            <Divider margin="lg" />

            <ExampleSection>
                <SectionTitle>Con Pestañas Deshabilitadas</SectionTitle>
                <Text variant="body2" color="muted" style={{ marginBottom: "1rem" }}>
                    La segunda pestaña está deshabilitada y no se puede hacer clic en ella.
                </Text>
                <Tabs tabs={disabledTabs} />
            </ExampleSection>

            <Divider margin="lg" />

            <ExampleSection>
                <SectionTitle>Ejemplo Complejo</SectionTitle>
                <Text variant="body2" color="muted" style={{ marginBottom: "1rem" }}>
                    Tabs con más pestañas e iconos en el contenido.
                </Text>
                <Tabs tabs={complexTabs} defaultTab={0} />
            </ExampleSection>

            <Divider margin="lg" />

            <ExampleSection>
                <SectionTitle>Variantes de Estilo</SectionTitle>
                <Text variant="body2" color="muted" style={{ marginBottom: "1rem" }}>
                    Diferentes estilos disponibles para las pestañas.
                </Text>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Default (estilo predeterminado)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="default" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Minimal (sin bordes)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="minimal" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Pill (redondeadas)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="pill" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Browser (estilo navegador con bordes)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="browser" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Outline (contorno)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="outline" />
                </div>

                <div style={{ marginBottom: "2rem" }}>
                    <Text variant="label" style={{ marginBottom: "0.5rem", display: "block" }}>
                        Segmented (segmentado)
                    </Text>
                    <Tabs tabs={basicTabs.slice(0, 3)} variant="segmented" />
                </div>
            </ExampleSection>

            <Divider margin="lg" />

            <ExampleSection>
                <SectionTitle>Información del Componente</SectionTitle>
                <Text variant="paragraph">
                    El componente <code>Tabs</code> es un contenedor de pestañas flexible sin dependencias de
                    formularios. Puedes usarlo para:
                </Text>
                <ul style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <li>
                        <Text variant="body2">Organizador de contenido sin necesidad de formularios</Text>
                    </li>
                    <li>
                        <Text variant="body2">Paneles informativos y dashboards</Text>
                    </li>
                    <li>
                        <Text variant="body2">Documentación y tutoriales con pasos</Text>
                    </li>
                    <li>
                        <Text variant="body2">Cualquier UI que necesite tabs básicos</Text>
                    </li>
                </ul>

                <Divider margin="md" />

                <SectionTitle style={{ marginTop: "1.5rem" }}>Props Disponibles</SectionTitle>
                <Text variant="label">tabs (requerido)</Text>
                <Text variant="body2" color="muted">
                    Array de objetos con label, content y disabled (opcional)
                </Text>

                <Text variant="label" style={{ marginTop: "1rem" }}>
                    defaultTab
                </Text>
                <Text variant="body2" color="muted">
                    Índice de la pestaña activa inicial (por defecto 0)
                </Text>

                <Text variant="label" style={{ marginTop: "1rem" }}>
                    onChange
                </Text>
                <Text variant="body2" color="muted">
                    Callback que se ejecuta cuando cambia la pestaña activa
                </Text>

                <Text variant="label" style={{ marginTop: "1rem" }}>
                    variant
                </Text>
                <Text variant="body2" color="muted">
                    Tipo de estilo disponible: "default" (línea inferior), "minimal" (sin bordes), "pill" (redondeadas),
                    "browser" (estilo navegador con bordes), "outline" (contorno), "segmented" (segmentado)
                </Text>
            </ExampleSection>
        </Container>
    );
};

export default TabsExample;
