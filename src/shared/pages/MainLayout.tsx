import { Outlet, useLocation } from "react-router";
import { Suspense, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { Divider, LoadingSpinner, Row } from "../components";
import PageTitle from "../components/PageTitle";
import Breadcrumbs from "../components/Breadcrumbs";

export const MainLayoutContainer = styled.div<{ $sidebarOpen: boolean; $isCollapsed: boolean }>`
    height: 100vh;
    display: grid;
    grid-template-columns: ${(props) => {
        if (props.$sidebarOpen && !props.$isCollapsed) return `${props.theme.layout.sidebarWidth} 1fr`;
        if (props.$sidebarOpen && props.$isCollapsed) return `${props.theme.layout.sidebarCollapsedWidth} 1fr`;
        // Si el sidebar no está abierto en desktop, la columna del sidebar desaparece
        return "0fr 1fr";
    }};
    position: relative;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        grid-template-columns: 1fr; // Siempre 1 columna para móviles/tabletas pequeñas
    }
`;

export const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
    /* Por defecto, se comporta como un elemento de la grilla */
    @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        height: 100vh;
        /* Solo se hace visible si $isOpen es true en móvil, de lo contrario se oculta con el transform del SidebarContainer */
        transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

export const Container = styled.div`
    padding: 0;
    height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
`;

export const Content = styled.main`
    padding: ${(props) => props.theme.layout.contentPaddingY} ${(props) => props.theme.layout.contentPaddingX};
    background-color: ${(props) => props.theme.colors.background};
    overflow-y: auto;
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
        <MainLayoutContainer $sidebarOpen={isSidebarOpen} $isCollapsed={isSidebarCollapsed}>
            <Overlay
                $isVisible={isSidebarOpen && window.innerWidth < parseInt(theme.breakpoints.lg)}
                onClick={toggleSidebar}
            />
            <SidebarWrapper $isOpen={isSidebarOpen}>
                <Sidebar
                    isOpen={isSidebarOpen}
                    isCollapsed={isSidebarCollapsed}
                    onToggle={toggleSidebar}
                    onToggleCollapse={toggleSidebarCollapse}
                />
            </SidebarWrapper>
            <Container>
                <Header
                    onToggleSidebar={toggleSidebar}
                    onToggleCollapse={toggleSidebarCollapse}
                    isSidebarCollapsed={isSidebarCollapsed}
                />
                <Content>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Row $align="center" $justify="space-between" $gap={"xs"}>
                            <PageTitle />
                            <Breadcrumbs />
                        </Row>
                        <Divider margin={"xs"} />
                        <Outlet />
                    </Suspense>
                </Content>
                <Footer>
                    <p>© 2025 Mi Proyecto</p>
                </Footer>
            </Container>
        </MainLayoutContainer>
    );
}

export default MainLayout;
