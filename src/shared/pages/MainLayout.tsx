import { Outlet, useMatches } from "react-router";
import { Suspense } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import { AlertContainer, LoadingSpinner, Row } from "../components";
import PageTitle from "../components/PageTitle";
import Breadcrumbs from "../components/Breadcrumbs";

export const MainLayoutContainer = styled.div<{ $sidebarOpen: boolean }>`
    height: 100vh;
    display: grid;
    grid-template-columns: ${(props) => props.theme.layout.sidebarWidth} 1fr;
    position: relative;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
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
    padding: ${(props) => props.theme.spacing.lg};
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

    @media (min-width: 769px) {
        display: none;
    }
`;

function MainLayout() {
    return (
        <MainLayoutContainer $sidebarOpen={true}>
            <AlertContainer />
            <Sidebar isOpen={true} onClose={() => []} />
            <Container>
                <Header onToggleSidebar={() => []} />
                <Content>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Row $align="center" $justify="flex-start" $gap={"xs"}>
                            <Breadcrumbs />
                        </Row>
                        <Outlet />
                    </Suspense>
                </Content>
                <Footer>
                    <p>© 2025 Mi Proyecto</p>
                </Footer>
            </Container>
            <Overlay $isVisible={true} onClick={() => []} />
        </MainLayoutContainer>
    );
}

export default MainLayout;
