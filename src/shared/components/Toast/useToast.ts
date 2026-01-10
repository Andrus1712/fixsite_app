import { useAppDispatch, useAppSelector } from "../../store";
import { addToast, removeToast } from "../../store/toastSlice";


export const useToast = () => {
    const dispatch = useAppDispatch();
    const Toast = useAppSelector((state) => state.toast.Toast);

    const showSuccess = (message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "success", message, title, duration }));
    };

    const showError = (message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "error", message, title, duration }));
    };

    const showWarning = (message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "warning", message, title, duration }));
    };

    const showInfo = (message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "info", message, title, duration }));
    };

    const handleRemoveToast = (id: string) => {
        dispatch(removeToast(id));
    };

    return {
        Toast,
        removeToast: handleRemoveToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};