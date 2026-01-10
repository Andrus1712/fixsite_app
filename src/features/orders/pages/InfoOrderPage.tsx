import { useLocation, useParams } from "react-router";
import { Container, useToast } from "../../../shared/components";
import { useEffect } from "react";
import { useAlert } from "../../../shared/components/AlertModal";

const InfoOrderPage = () => {
    const { code } = useParams<{ code: string }>();
    const location = useLocation();
    const order = location.state;
    const { showError } = useToast();
    const { showSuccess, closeAlert } = useAlert();

    useEffect(() => {
        showError("Error al obtener la orden", "OJO valemia!");

        showSuccess("Orden obtenida exitosamente", "OJO valemia!", false);
    }, []);
    return (
        <Container className="container" center size="xl">
            <div>InfoOrderPage</div>
            <pre>{JSON.stringify(code, null, 2)}</pre>
            <pre>{JSON.stringify(order, null, 2)}</pre>
        </Container>
    );
};

export default InfoOrderPage;
