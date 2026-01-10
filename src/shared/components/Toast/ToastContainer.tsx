import styled from "styled-components";
import { useToast } from "./useToast";
import ToastComponent from "./Toast";

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

export default function ToastContainer() {
    const { Toast, removeToast } = useToast();

    return (
        <Container>
            {Toast.map((toast) => (
                <ToastComponent key={toast.id} {...toast} onClose={removeToast} />
            ))}
        </Container>
    );
}
