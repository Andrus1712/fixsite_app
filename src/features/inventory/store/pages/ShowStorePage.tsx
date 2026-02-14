import { Container } from "../../../../shared/components";
import Tabs from "../../../../shared/components/Tabs";
import RequestMaterial from "../components/RequestMaterial";
import StoreArticles from "../components/StoreArticles";

const ShowStorePage = () => {


    const tabs = [
        {
            label: "Descripción general",
            content: <>Descripción general</>,
        },
        {
            label: "Inventario",
            content: <StoreArticles />,
        },
        {
            label: "Solicitudes",
            content: <RequestMaterial />,
        },
        {
            label: "Historial",
            content: <>Historial</>,
        },
    ];

    return (
        <Container $size="full">
            <Tabs tabs={tabs} defaultTab={0} />
        </Container>
    );
};
export default ShowStorePage;