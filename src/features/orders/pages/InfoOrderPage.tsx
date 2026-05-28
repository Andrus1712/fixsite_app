import { useNavigate, useParams } from "react-router";
import { Button, Container, LoadingSpinner, useToast } from "../../../shared/components";
import Tabs from "../../../shared/components/Tabs";
import { InfoOrderOverview } from "../components/InfoOrderOverview";
import { useGetOrdersByCodeQuery } from "../services/orderApi";
import { useEffect } from "react";
import { InfoOrderHistory } from "../components/InfoOrderHistory";
import { PartsManagement } from "../components/PartsManagement";
import { FiActivity, FiClipboard, FiPackage } from "react-icons/fi";
import { useGetItemsByDestRefQuery } from "../../inventory/movement/services/MaterialIssuesApi";

const InfoOrderPage = () => {
    const { code } = useParams<{ code: string; }>();

    const { data: orderData, isLoading, isError, error } = useGetOrdersByCodeQuery({ order_code: code });

    const { data: itemsByDestRef } = useGetItemsByDestRefQuery(
        { destinationReference: String(orderData?.id) },
        { skip: !orderData?.id }
    );

    const { showError } = useToast();

    const navigator = useNavigate();

    useEffect(() => {
        if (isError) {
            const errorMessage = (error as any)?.data?.message || "Error al obtener la orden";
            showError(errorMessage, "Error");
        }
    }, [isError, error]);

    const tabs = [
        {
            label: "Overview",
            icon: <FiActivity />,
            content: orderData ? <InfoOrderOverview data={orderData} /> : null,
        },
        {
            label: "Historial",
            icon: <FiClipboard />,
            content: orderData ? <InfoOrderHistory data={orderData} /> : null,
        },
        {
            label: "Piezas",
            icon: <FiPackage />,
            content: (
                <PartsManagement
                    orderId={orderData?.id || ""}
                    orderCode={code || ""}
                    parts={itemsByDestRef?.data ?? []}
                    canRequestParts={true}
                    canApproveParts={true}
                />
            ),
        },
    ];
    const onChangeTab = (index: number) => {
        console.log("Cambio de pestaña", index);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Container size="full" center id="infoOrderPage">
            <Tabs
                tabs={tabs}
                defaultTab={0}
                onChange={() => onChangeTab}
                fullWidth={true}
                variant="segmented"
            />
            <Button onClick={() => navigator(-1)}>Volver</Button>
        </Container>
    );
};

export default InfoOrderPage;
