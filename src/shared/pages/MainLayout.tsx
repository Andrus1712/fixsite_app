import { Outlet, useLocation } from "react-router";
import { Suspense, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { LoadingSpinner } from "../components";
import PageTitle from "../components/PageTitle";

export const MainLayoutContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const Workspace = styled.div<{ $sidebarOpen: boolean; $isCollapsed: boolean }>`
    display: grid;
    grid-template-columns: ${(props) => {
        if (props.$sidebarOpen && !props.$isCollapsed) {
            return `${props.theme.layout.sidebarWidth} minmax(0, 1fr)`;
        }
        if (props.$sidebarOpen && props.$isCollapsed) {
            return `${props.theme.layout.sidebarCollapsedWidth} minmax(0, 1fr)`;
        }
        return "0 minmax(0, 1fr)";
    }};
    position: relative;
    overflow: hidden;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: minmax(0, 1fr);
    }
`;

export const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
    z-index: ${(props) => props.theme.zIndex.popover};
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        position: fixed;
        top: ${(props) => props.theme.layout.headerHeight};
        left: 0;
        height: calc(100vh - ${(props) => props.theme.layout.headerHeight});
        transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

export const Container = styled.div`
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    padding-bottom: 2rem;
`;

export const Content = styled.main`
    padding: ${(props) => props.theme.layout.contentPaddingY} ${(props) => props.theme.layout.contentPaddingX};
    background-color: ${(props) => props.theme.colors.background};
    overflow-y: auto;
    flex: 1;
`;

export const Footer = styled.footer`
    padding: ${(props) => props.theme.spacing.xs};
    background-color: ${(props) => props.theme.colors.surface};
    border-top: 1px solid ${(props) => props.theme.colors.gray200};
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
    display: none;
`;

export const Overlay = styled.div<{ $isVisible: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    display: ${(props) => (props.$isVisible ? "block" : "none")};

    @media (min-width: ${(props) => props.theme.breakpoints.lg}) {
        display: none;
    }
`;

function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Estado para abrir/cerrar completamente
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Estado para colapsar/expandir en desktop
    const location = useLocation();
    const theme = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleSidebarCollapse = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // Cerrar sidebar en pantallas pequeñas si se cambia la ruta
    useEffect(() => {
        if (window.innerWidth < parseInt(theme.breakpoints.lg)) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname]);

    // Determinar el estado inicial del sidebar y manejar cambios de tamaño de ventana
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < parseInt(theme.breakpoints.lg)) {
                setIsSidebarOpen(false); // Cerrar en móvil/tablet
                setIsSidebarCollapsed(false); // Asegurar que no esté colapsado en móvil
            } else {
                setIsSidebarOpen(true); // Abrir en desktop
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Establecer estado inicial
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <MainLayoutContainer>
            <Header
                onToggleSidebar={toggleSidebar}
                onToggleCollapse={toggleSidebarCollapse}
                isSidebarCollapsed={isSidebarCollapsed}
            />
            <Workspace $sidebarOpen={isSidebarOpen} $isCollapsed={isSidebarCollapsed}>
                <Overlay
                    $isVisible={isSidebarOpen && window.innerWidth < parseInt(theme.breakpoints.lg)}
                    onClick={toggleSidebar}
                />
                <SidebarWrapper $isOpen={isSidebarOpen}>
                    <Sidebar
                        isOpen={isSidebarOpen}
                        isCollapsed={isSidebarCollapsed}
                        onToggle={toggleSidebar}
                    />
                </SidebarWrapper>
                <Container>
                    <Content>
                        <Suspense fallback={<LoadingSpinner />}>
                            <PageTitle />
                            <Outlet />
                        </Suspense>
                    </Content>
                    <Footer>
                        <p>© 2025 Mi Proyecto</p>
                    </Footer>
                </Container>
            </Workspace>
        </MainLayoutContainer>
    );
}

export default MainLayout;
