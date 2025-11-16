import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, type PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './baseApi';
import authReducer from '../../features/auth/store/authSlice';
import alertReducer from './alertSlice';
// import { ordersApi } from '../../features/orders/services/orderApi';

const persistConfig: PersistConfig<any> = {
  key: "auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

/**
 * Configura el store de Redux.
 */
export const store = configureStore({
  // 1. Combinación de Reducers (equivalente a combineReducers)
  reducer: {
    // Reducer de RTK Query: el path y el reducer que importamos de baseApi
    [baseApi.reducerPath]: baseApi.reducer,

    // Aquí se añadirían otros slices de features...
    // users: usersSlice.reducer, 
    auth: persistedAuthReducer,
    alerts: alertReducer,
  },

  // 2. Middlewares: Necesario para que RTK Query funcione
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat([baseApi.middleware]),
});

export const persistor = persistStore(store);

/**
 * Tipos para el estado y el dispatch.
 * Es una buena práctica exportar hooks tipados para su uso en la aplicación.
 */

// Tipo de la función dispatch del store
export type AppDispatch = typeof store.dispatch;

// Tipo del estado raíz del store
export type RootState = ReturnType<typeof store.getState>;

// Hooks tipados para usar en lugar de los de 'react-redux'
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Llamada para configurar funcionalidades como refetchOnFocus
// import { setupListeners } from '@reduxjs/toolkit/query'
// setupListeners(store.dispatch)