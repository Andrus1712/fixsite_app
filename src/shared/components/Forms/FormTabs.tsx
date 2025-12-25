import styled from "styled-components";
import { useState, type ReactNode } from "react";
import { Button } from "../Buttons";
import { useFormContext } from "react-hook-form";

interface Tab {
    label: string;
    content: ReactNode;
    validationFields?: string[];
}

interface FormTabsProps {
    tabs: Tab[];
    onSubmit?: (data?: any) => void;
    submitLabel?: string;
    loading?: boolean;
    showNavigation?: boolean;
}

const TabsContainer = styled.div`
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 24px;
`;

const TabsNav = styled.nav`
    display: flex;
    gap: 32px;
    overflow-x: auto;
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 12px 4px;
    border-bottom: 2px solid ${(props) => (props.$active ? "#3b82f6" : "transparent")};
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    transition: color 0.2s;
    white-space: nowrap;

    &:hover {
        color: ${(props) => (props.$active ? "#2563eb" : "#374151")};
    }
`;

const TabContent = styled.div`
    min-height: 200px;
`;

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
`;

export default function FormTabs({
    tabs,
    onSubmit,
    submitLabel = "Enviar",
    loading = false,
    showNavigation = true,
}: FormTabsProps) {
    const { trigger } = useFormContext();

    const [activeTab, setActiveTab] = useState(0);

    const handleNext = async () => {
        const fieldsToValidate = tabs[activeTab].validationFields;

        // Si la pestaña tiene campos definidos, los validamos
        if (fieldsToValidate && fieldsToValidate.length > 0) {
            // trigger devuelve true si la validación pasa
            const isTabValid = await trigger(fieldsToValidate as any);

            if (!isTabValid) {
                return; // Si hay errores, no avanzamos
            }
        }

        setActiveTab(Math.min(tabs.length - 1, activeTab + 1));
    };

    const handlePrev = () => {
        setActiveTab(Math.max(0, activeTab - 1));
    };

    const isFirstTab = activeTab === 0;
    const isLastTab = activeTab === tabs.length - 1;

    return (
        <>
            <TabsContainer>
                <TabsNav>
                    {tabs.map((tab, index) => (
                        <TabButton key={index} onClick={() => setActiveTab(index)} $active={activeTab === index}>
                            {tab.label}
                        </TabButton>
                    ))}
                </TabsNav>
            </TabsContainer>

            <TabContent>{tabs[activeTab]?.content}</TabContent>

            {showNavigation && (
                <NavigationContainer>
                    <Button variant="secondary" onClick={handlePrev} disabled={isFirstTab}>
                        Anterior
                    </Button>

                    {isLastTab ? (
                        <Button variant="primary" onClick={onSubmit} loading={loading}>
                            {submitLabel}
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleNext}>
                            Siguiente
                        </Button>
                    )}
                </NavigationContainer>
            )}
        </>
    );
}
