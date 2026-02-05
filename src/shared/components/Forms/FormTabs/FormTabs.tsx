import { useState, type ReactNode, useImperativeHandle, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import Button from "../../Buttons/Button";
import { NavigationContainer, TabButton, TabContent, TabsContainer, TabsNav } from "./FormTabsStyles";

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

export interface FormTabsRef {
    resetToFirstTab: () => void;
}

const FormTabs = forwardRef<FormTabsRef, FormTabsProps>(
    ({ tabs, onSubmit, submitLabel = "Enviar", loading = false, showNavigation = true }, ref) => {
        const { trigger } = useFormContext();

        const [activeTab, setActiveTab] = useState(0);

        useImperativeHandle(ref, () => ({
            resetToFirstTab: () => setActiveTab(0),
        }));

        const handleNext = async () => {
            const fieldsToValidate = tabs[activeTab].validationFields;

            if (fieldsToValidate && fieldsToValidate.length > 0) {
                const isTabValid = await trigger(fieldsToValidate as any);

                if (!isTabValid) {
                    return;
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
);

FormTabs.displayName = "FormTabs";

export default FormTabs;
