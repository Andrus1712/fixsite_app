import { useState, type ReactNode } from "react";
import { TabsContainer, TabsNav, TabButton, TabContent } from "./TabsStyles";

interface Tab {
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: number;
}

const Tabs = ({ tabs, defaultTab = 0 }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    return (
        <>
            <TabsContainer>
                <TabsNav>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            onClick={() => setActiveTab(index)}
                            $active={activeTab === index}
                        >
                            {tab.label}
                        </TabButton>
                    ))}
                </TabsNav>
            </TabsContainer>

            <TabContent>{tabs[activeTab]?.content}</TabContent>
        </>
    );
};

export default Tabs;
