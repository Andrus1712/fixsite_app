import { useAppDispatch, useAppSelector } from "../../store";
import { addAlert, removeAlert } from "../../store/alertSlice";


export const useAlerts = () => {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector((state) => state.alerts.alerts);

    const showSuccess = (message: string, title?: string, duration?: number) => {
        dispatch(addAlert({ type: "success", message, title, duration }));
    };

    const showError = (message: string, title?: string, duration?: number) => {
        dispatch(addAlert({ type: "error", message, title, duration }));
    };

    const showWarning = (message: string, title?: string, duration?: number) => {
        dispatch(addAlert({ type: "warning", message, title, duration }));
    };

    const showInfo = (message: string, title?: string, duration?: number) => {
        dispatch(addAlert({ type: "info", message, title, duration }));
    };

    const handleRemoveAlert = (id: string) => {
        dispatch(removeAlert(id));
    };

    return {
        alerts,
        removeAlert: handleRemoveAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};