import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "../../shared/components/ErrorBoundary";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "../../shared/types/theme";
import { persistor, store } from "../../shared/store";
import { GlobalStyle } from "../../shared/styles/GlobalStyle";
import DynamicRoutes from "../router/DynamicRoutes";
import { AlertContainer, LoadingSpinner } from "../../shared/components";

export const AppProviders = () => (
    <ErrorBoundary>
        <Provider store={store}>
            <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <DynamicRoutes />
                    <AlertContainer />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </ErrorBoundary>
);
