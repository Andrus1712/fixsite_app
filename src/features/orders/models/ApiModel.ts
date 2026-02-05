import type { StandardResponse } from "../../../shared/types/api";
import type { OrderDetail as WorkOrder } from "./OrderModel";

export interface ApiResponse extends StandardResponse<WorkOrder[]> {
    total: number;
    page: number;
    totalPages: number;
}

export * from "./OrderModel";