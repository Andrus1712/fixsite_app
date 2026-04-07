import { io, type Socket } from "socket.io-client";
import { RealtimeEvents, type JoinPayload, type ChatMessagePayload, type ChatTypingPayload } from "./realtime.types";

class SocketService {
    private socket: Socket | null = null;

    connect(): Socket {
        if (this.socket?.connected) return this.socket;

        this.socket = io(import.meta.env.VITE_SOCKET_URL, {
            withCredentials: true,
            autoConnect: true,
        });

        return this.socket;
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = null;
    }

    getSocket(): Socket | null {
        return this.socket;
    }

    // ─── Room helpers ────────────────────────────────────────────────────────

    join(payload: JoinPayload) {
        this.socket?.emit(RealtimeEvents.JOIN, payload);
    }

    leave(payload: JoinPayload) {
        this.socket?.emit(RealtimeEvents.LEAVE, payload);
    }

    requestStats(tenantId: string) {
        this.socket?.emit(RealtimeEvents.STATS_REQUEST, { tenantId });
    }

    // ─── Chat helpers ────────────────────────────────────────────────────────

    chatJoin(chatId: string) {
        this.socket?.emit(RealtimeEvents.CHAT_JOIN, { chatId });
    }

    chatLeave(chatId: string) {
        this.socket?.emit(RealtimeEvents.CHAT_LEAVE, { chatId });
    }

    chatSendMessage(payload: ChatMessagePayload) {
        this.socket?.emit(RealtimeEvents.CHAT_MESSAGE, payload);
    }

    chatTyping(payload: ChatTypingPayload) {
        this.socket?.emit(RealtimeEvents.CHAT_TYPING, payload);
    }
}

export const socketService = new SocketService();