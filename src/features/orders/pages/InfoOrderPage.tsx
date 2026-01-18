import { useParams } from "react-router";
import { Container, useToast } from "../../../shared/components";
import Tabs from "../../../shared/components/Tabs";
import { InfoOrderOverview } from "../components/InfoOrderOverview";
import { useGetOrdersByCodeQuery } from "../services/orderApi";
import { useEffect } from "react";
import { InfoOrderHistory } from "../components/InfoOrderHistory";
import { PartsManagement } from "../components/PartsManagement";
import { FiActivity, FiClipboard, FiPackage } from "react-icons/fi";

const InfoOrderPage = () => {
    const { code } = useParams<{ code: string }>();

    const { data, isLoading, isError, error } = useGetOrdersByCodeQuery({ order_code: code });

    const { showError } = useToast();

    useEffect(() => {
        if (isError) showError(error.data.message, "Error");
    }, [data, isError]);

    const tabs = [
        {
            label: "Overview",
            icon: <FiActivity />,
            content: data ? <InfoOrderOverview data={data} /> : null,
        },
        {
            label: "Historial",
            icon: <FiClipboard />,
            content: <InfoOrderHistory />,
        },
        {
            label: "Piezas",
            icon: <FiPackage />,
            content: <PartsManagement
                orderId={code || ""}
                parts={[
                    {
                        id: "1",
                        name: "Pantalla LCD Samsung Galaxy S24 Ultra",
                        description: "Pantalla OLED de reemplazo con touch integrado",
                        partNumber: "SM-G998B-LCD-001",
                        quantity: 1,
                        estimatedCost: 299.99,
                        supplier: "Samsung Parts",
                        status: "requested",
                        requestedBy: "Carlos Rodríguez",
                        requestedDate: "2024-01-10T09:00:00Z",
                        category: "screen",
                    },
                    {
                        id: "2",
                        name: "Batería 5000mAh Samsung",
                        description: "Batería de litio de alta capacidad",
                        partNumber: "SM-G998B-BAT-002",
                        quantity: 1,
                        estimatedCost: 89.99,
                        supplier: "Samsung Parts",
                        status: "approved",
                        requestedBy: "Carlos Rodríguez",
                        requestedDate: "2024-01-12T11:15:00Z",
                        approvedBy: "Ana López",
                        approvedDate: "2024-01-12T16:45:00Z",
                        category: "battery",
                    },
                ]}
                canRequestParts={true}
                canApproveParts={true}
            />,
        },
    ];

    if (isLoading) {
        return "Loading...";
    }

    return (
        <Container className="container" size="full" center padding={"xs"}>
            <Tabs
                tabs={tabs}
                defaultTab={0}
                onChange={(index) => console.log("Pestaña:", index)}
                fullWidth={true}
                variant="default"
            />
        </Container>
    );
};

export default InfoOrderPage;
