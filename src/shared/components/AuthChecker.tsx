import { useEffect, useState } from 'react';
import { useCheckAuthQuery } from '../../features/auth/services/authApi';
import { useAppDispatch, useAppSelector } from '../store';
import { saveAuthInfo, logout } from '../../features/auth/store/authSlice';

const AuthChecker = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector(state => state.auth);
    const [skipQuery, setSkipQuery] = useState(false);
    
    const { data, error } = useCheckAuthQuery(undefined, {
        skip: skipQuery,
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    useEffect(() => {
        if (data && !isAuthenticated) {
            dispatch(saveAuthInfo(data));
        } else if (error && 'status' in error && error.status === 401) {
            setSkipQuery(true); // Deshabilitar query permanentemente
            if (isAuthenticated) {
                dispatch(logout());
            }
        }
    }, [data, error, isAuthenticated, dispatch]);

    return null;
};

export default AuthChecker;