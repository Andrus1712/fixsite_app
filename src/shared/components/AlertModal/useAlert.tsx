import { useContext } from "react";
import { AlertContext } from "../../../app/providers/AlertProvider";

export const useAlert = () => {
    const ctx = useContext(AlertContext);
    if (!ctx) {
        throw new Error("useAlert debe usarse dentro de AlertProvider");
    }
    return ctx;
};
