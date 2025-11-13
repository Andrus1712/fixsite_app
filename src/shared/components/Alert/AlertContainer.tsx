import styled from "styled-components";
import Alert from "./Alert";
import { useAlerts } from "./useAlerts";

const Container = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
    
    & > * {
        pointer-events: auto;
    }
`;

export default function AlertContainer() {
    const { alerts, removeAlert } = useAlerts();

    return (
        <Container>
            {alerts.map((alert) => (
                <Alert
                    key={alert.id}
                    {...alert}
                    onClose={removeAlert}
                />
            ))}
        </Container>
    );
}