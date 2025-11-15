import { useEffect, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { logout } from "../../features/auth/store/authSlice";
import { useAlerts } from "./Alert/useAlerts";

const TokenExpirationWatcher = () => {
    const { currentToken, isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { showWarning } = useAlerts();
    const alertShown = useRef(false);
    
    const stableShowWarning = useCallback(showWarning, []);
    
    useEffect(() => {
        if (!currentToken || !isAuthenticated) return;
        
        // Reset alert flag when token changes
        console.log('useEffect ejecutándose, alertShown antes:', alertShown.current);
        alertShown.current = false;
        console.log('TokenExpirationWatcher iniciado, alertShown después:', alertShown.current);
        
        try {
            const payload = JSON.parse(atob(currentToken.split('.')[1]));
            const expirationTime = payload.exp * 1000;
            console.log('Token expira el:', new Date(expirationTime));
            
            const interval = setInterval(() => {
                const now = Date.now();
                const timeRemaining = Math.floor((expirationTime - now) / 1000);
                
                // Log para validar funcionamiento
                if (timeRemaining % 60 === 0) {
                    console.log(`Token expira en: ${Math.floor(timeRemaining / 60)} minutos`);
                }
                
                if (timeRemaining <= 60 && timeRemaining > 0 && !alertShown.current) {
                    console.log('Entrando a mostrar alerta, alertShown antes:', alertShown.current);
                    alertShown.current = true;
                    console.log('Mostrando alerta de expiración, alertShown después:', alertShown.current);
                    stableShowWarning(
                        `Tu sesión expirará en ${timeRemaining} segundos`,
                        "Sesión por expirar",
                        timeRemaining * 1000
                    );
                }
                
                if (timeRemaining <= 0) {
                    dispatch(logout());
                    clearInterval(interval);
                }
            }, 1000);
            
            return () => clearInterval(interval);
        } catch (error) {
            console.error('Error parsing token:', error);
        }
    }, [currentToken, isAuthenticated, dispatch, stableShowWarning]);
    
    return null;
};

export default TokenExpirationWatcher;