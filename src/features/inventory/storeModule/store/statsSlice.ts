import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { InventoryStats } from "../../../../shared/utils/realtime.types";

interface StatsState {
    data: InventoryStats | null;
    error: string | null;
}

const statsSlice = createSlice({
    name: "stats",
    initialState: { data: null, error: null } as StatsState,
    reducers: {
        statsUpdated: (state, action: PayloadAction<InventoryStats>) => {
            state.data = action.payload;
            state.error = null;
        },
        statsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { statsUpdated, statsError } = statsSlice.actions;
export default statsSlice.reducer;