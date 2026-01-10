import { createContext } from "react";
import { AlertModal, useAlertModal } from "../../shared/components/AlertModal";

export const AlertContext = createContext<ReturnType<typeof useAlertModal> | null>(null);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const alert = useAlertModal();

    return (
        <AlertContext.Provider value={alert}>
            {children}
            {alert.alertProps && <AlertModal {...alert.alertProps} />}
        </AlertContext.Provider>
    );
};
