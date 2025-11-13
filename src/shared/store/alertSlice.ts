import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertItem {
    id: string;
    type: AlertType;
    title?: string;
    message: string;
    duration?: number;
}

interface AlertState {
    alerts: AlertItem[];
}

const initialState: AlertState = {
    alerts: [],
};

const alertSlice = createSlice({
    name: "alerts",
    initialState,
    reducers: {
        addAlert: (state, action: PayloadAction<Omit<AlertItem, "id">>) => {
            const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            state.alerts.push({ ...action.payload, id });
        },
        removeAlert: (state, action: PayloadAction<string>) => {
            state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
        },
    },
});

export const { addAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;