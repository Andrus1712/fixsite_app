import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
}

interface ToastState {
    Toast: ToastItem[];
}

const initialState: ToastState = {
    Toast: [],
};

const toastSlice = createSlice({
    name: "Toast",
    initialState,
    reducers: {
        addToast: (state, action: PayloadAction<Omit<ToastItem, "id">>) => {
            const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            state.Toast.push({ ...action.payload, id });
        },
        removeToast: (state, action: PayloadAction<string>) => {
            state.Toast = state.Toast.filter(alert => alert.id !== action.payload);
        },
    },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;