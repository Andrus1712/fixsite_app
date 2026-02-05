import styled from "styled-components";
import { useState, type ReactNode, useEffect } from "react";
import { TabButton, TabContent, TabsContainer, TabsNav } from "./Tabs.styles";

export type TabsVariant = "default" | "minimal" | "pill" | "outline" | "segmented" | "browser";

interface Tab {
    label: string;
    content: ReactNode;
    disabled?: boolean;
    icon?: ReactNode;
}

export interface TabsProps {
    tabs: Tab[];
    defaultTab?: number;
    activeTab?: number;
    onChange?: (tabIndex: number) => void;
    variant?: TabsVariant;
    fullWidth?: boolean;
}

/**
 * Componente Tabs - Selector de pestañas con múltiples variantes de estilo
 * Refactorizado para ser responsivo y adaptable.
 */
const TabsStyled = styled.div`
    width: 100%;
    position: relative;
`;

export const Tabs = ({
    tabs,
    defaultTab = 0,
    activeTab: externalActiveTab,
    onChange,
    variant = "default",
    fullWidth = false
}: TabsProps) => {
    const [activeTab, setActiveTab] = useState(externalActiveTab ?? defaultTab);

    useEffect(() => {
        if (externalActiveTab !== undefined) {
            setActiveTab(externalActiveTab);
        }
    }, [externalActiveTab]);

    const handleTabChange = (index: number) => {
        if (!tabs[index].disabled) {
            if (externalActiveTab === undefined) {
                setActiveTab(index);
            }
            onChange?.(index);
        }
    };

    if (tabs.length === 0) {
        return null;
    }

    return (
        <TabsStyled>
            <TabsContainer>
                <TabsNav $variant={variant} $fullWidth={fullWidth}>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            $active={activeTab === index}
                            $variant={variant}
                            $fullWidth={fullWidth}
                            onClick={() => handleTabChange(index)}
                            disabled={tab.disabled}
                            type="button"
                        >
                            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
                            <span className="tab-label">{tab.label}</span>
                        </TabButton>
                    ))}
                </TabsNav>
                <TabContent key={activeTab}>
                    {tabs[activeTab]?.content}
                </TabContent>
            </TabsContainer>
        </TabsStyled>
    );
};

export default Tabs;
