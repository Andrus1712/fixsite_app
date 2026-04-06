export const RealtimeEvents = {
    JOIN: "join",
    LEAVE: "leave",
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    STATS_REQUEST: "stats:request",
    STATS_UPDATE: "stats:update",
    STATS_ERROR: "stats:error",
    NOTIFICATION_NEW: "notification:new",
    NOTIFICATION_READ: "notification:read",
    CHAT_JOIN: "chat:join",
    CHAT_LEAVE: "chat:leave",
    CHAT_MESSAGE: "chat:message",
    CHAT_TYPING: "chat:typing",
} as const;

export type RealtimeEvent = (typeof RealtimeEvents)[keyof typeof RealtimeEvents];

export interface JoinPayload { tenantId: string; userId: string; }
export interface ChatMessagePayload { chatId: string; userId: string; message: string; createdAt?: string; }
export interface ChatTypingPayload { chatId: string; userId: string; isTyping: boolean; }
export interface NotificationPayload {
    id: string;
    userId?: string;
    type: string;
    title: string;
    body: string;
    data?: Record<string, unknown>;
    createdAt: string;
}
export interface InventoryStats {
    totalItems: number;
    totalStock: number;
    lowStockItems: number;
    byStore: StoreStats[];
    pendingRequests: {
        materialReceipts: number;
        materialIssues: number;
        stockTransfers: number;
        inventoryAdjustments: number;
        total: number;
    };
    todayPendingRequests: {
        materialReceipts: number;
        materialIssues: number;
        stockTransfers: number;
        inventoryAdjustments: number;
        total: number;
    };
}

export interface StoreStats {
    storeId: number;
    storeName: string;
    storeType: string;
    totalItems: number;
    totalStock: number;
    lowStockItems: number;
    pendingRequests: {
        materialReceipts: number;
        materialIssues: number;
        stockTransfers: number;
        inventoryAdjustments: number;
        total: number;
    };
    todayPendingRequests: {
        materialReceipts: number;
        materialIssues: number;
        stockTransfers: number;
        inventoryAdjustments: number;
        total: number;
    };
};