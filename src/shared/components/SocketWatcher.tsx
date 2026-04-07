import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { SOCKET_CONNECT, SOCKET_DISCONNECT } from "../store/socketMiddleware";

const SocketWatcher = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, currentTenant, data } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated || !data?.user?.id) return;

        dispatch({
            type: SOCKET_CONNECT,
            payload: {
                tenantId: currentTenant?.id ?? null,
                userId: data.user.id,
            },
        });

        return () => {
            dispatch({
                type: SOCKET_DISCONNECT,
                payload: {
                    tenantId: currentTenant?.id ?? null,
                    userId: data.user.id,
                },
            });
        };
    }, [isAuthenticated, data?.user?.id, currentTenant?.id]);

    return null;
};

export default SocketWatcher;
