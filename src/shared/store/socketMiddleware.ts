import type { Middleware } from "@reduxjs/toolkit";
import { socketService } from "../utils/socketService";
import { RealtimeEvents, type InventoryStats, type NotificationPayload } from "../utils/realtime.types";
import { addToast } from "./toastSlice";
import { statsError, statsUpdated } from "../../features/inventory/storeModule/store/statsSlice";
import { socketTenantConected } from "../../features/auth/store/authSlice";

export const SOCKET_CONNECT = "socket/connect";
export const SOCKET_DISCONNECT = "socket/disconnect";

export const socketMiddleware: Middleware = (store) => (next) => (action: any) => {
    switch (action.type) {
        case SOCKET_CONNECT: {
            const socket = socketService.connect();

            // Unirse a rooms del tenant/usuario al conectar
            const { tenantId, userId } = action.payload;
            socket.on("connect", () => {
                socketService.join({ tenantId, userId });
            });

            socket.on(RealtimeEvents.CONNECTED, (data) => {
                console.log(data);
                store.dispatch(addToast({ type: "success", title: "Conexión establecida", message: "Conectado al servidor de tiempo real" }));
                store.dispatch(socketTenantConected(true)); // Dispatch para actualizar el estado de conexión del socket
            });

            socket.on(RealtimeEvents.DISCONNECTED, () => {
                store.dispatch(addToast({ type: "error", title: "Desconectado", message: "Desconectado del servidor de tiempo real" }));
                store.dispatch(socketTenantConected(false)); // Dispatch para actualizar el estado de conexión del socket
            });

            // ─── Eventos globales → Redux ────────────────────────────────
            socket.on(RealtimeEvents.STATS_UPDATE, (data: InventoryStats) => {
                console.log(data);
                alert("Estadísticas actualizadas: " + JSON.stringify(data));
                store.dispatch(statsUpdated(data));
            });

            socket.on(RealtimeEvents.STATS_ERROR, (data: { message: string; }) => {
                store.dispatch(statsError(data.message));
            });

            socket.on(RealtimeEvents.NOTIFICATION_NEW, (data: NotificationPayload) => {
                store.dispatch(addToast({ type: "info", title: data.title, message: data.body }));
                // También podrías dispatch a un notificationsSlice si lo necesitas
            });

            break;
        }

        case SOCKET_DISCONNECT: {
            const { tenantId, userId } = action.payload ?? {};
            if (tenantId && userId) socketService.leave({ tenantId, userId });
            store.dispatch(socketTenantConected(false)); // Dispatch para actualizar el estado de conexión del socket
            socketService.disconnect();
            break;
        }
    }

    return next(action);
};