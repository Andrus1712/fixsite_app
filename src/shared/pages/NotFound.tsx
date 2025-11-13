import styled from "styled-components";
import { Link } from "react-router";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 4rem;
    color: ${props => props.theme.colors.primary};
    margin: 0;
`;

const Subtitle = styled.h2`
    font-size: 1.5rem;
    color: ${props => props.theme.colors.textSecondary};
    margin: 1rem 0;
`;

const Message = styled.p`
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
    background: ${props => props.theme.colors.primary};
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    
    &:hover {
        opacity: 0.9;
    }
`;

function NotFound() {
    return (
        <Container>
            <Title>404</Title>
            <Subtitle>Página no encontrada</Subtitle>
            <Message>La ruta que buscas no existe o no tienes permisos para acceder.</Message>
            <BackButton to="/app">Volver al inicio</BackButton>
        </Container>
    );
}

export default NotFound;