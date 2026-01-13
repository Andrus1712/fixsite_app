import styled from "styled-components";
import { useState, type ReactNode } from "react";
import { TabButton, TabContent, TabsContainer, TabsNav } from "./Tabs.styles";

interface Tab {
    label: string;
    content: ReactNode;
    disabled?: boolean;
}

export interface TabsProps {
    tabs: Tab[];
    defaultTab?: number;
    onChange?: (tabIndex: number) => void;
    variant?: "default" | "minimal" | "pill" | "outline" | "segmented" | "browser";
}

/**
 * Componente Tabs - Selector de pestañas con múltiples variantes de estilo
 *
 * @example
 * // Estilo predeterminado
 * <Tabs tabs={tabs} variant="default" />
 *
 * @example
 * // Estilo navegador con bordes
 * <Tabs tabs={tabs} variant="browser" />
 *
 * @example
 * // Estilo minimalista sin bordes
 * <Tabs tabs={tabs} variant="minimal" />
 *
 * @example
 * // Con callback de cambio
 * <Tabs
 *   tabs={tabs}
 *   onChange={(index) => console.log('Tab changed to:', index)}
 * />
 */
const TabsStyled = styled.div`
    width: 100%;
    position: relative;
`;

export const Tabs = ({ tabs, defaultTab = 0, onChange, variant = "default" }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    const handleTabChange = (index: number) => {
        if (!tabs[index].disabled) {
            setActiveTab(index);
            onChange?.(index);
        }
    };

    if (tabs.length === 0) {
        return null;
    }

    return (
        <TabsStyled>
            <TabsContainer>
                <TabsNav $variant={variant}>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            $active={activeTab === index}
                            $variant={variant}
                            onClick={() => handleTabChange(index)}
                            disabled={tab.disabled}
                            type="button"
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </TabsNav>
                <TabContent>{tabs[activeTab]?.content}</TabContent>
            </TabsContainer>
        </TabsStyled>
    );
};

export default Tabs;
