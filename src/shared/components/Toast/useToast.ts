import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { addToast, removeToast } from "../../store/toastSlice";


export const useToast = () => {
    const dispatch = useAppDispatch();
    const Toast = useAppSelector((state) => state.toast.Toast);

    const showSuccess = useCallback((message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "success", message, title, duration }));
    }, [dispatch]);

    const showError = useCallback((message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "error", message, title, duration }));
    }, [dispatch]);

    const showWarning = useCallback((message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "warning", message, title, duration }));
    }, [dispatch]);

    const showInfo = useCallback((message: string, title?: string, duration?: number) => {
        dispatch(addToast({ type: "info", message, title, duration }));
    }, [dispatch]);

    const handleRemoveToast = useCallback((id: string) => {
        dispatch(removeToast(id));
    }, [dispatch]);

    return {
        Toast,
        removeToast: handleRemoveToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};