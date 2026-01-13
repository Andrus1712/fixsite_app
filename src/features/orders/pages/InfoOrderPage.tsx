import { useParams } from "react-router";
import { Badge, Box, Container, DropdownButton, Row, Text, useToast } from "../../../shared/components";
import { IoPrint, IoCheckmark, IoDocumentText, IoTrash } from "react-icons/io5";
import Button from "../../../shared/components/Buttons/Button";
import { HiDotsVertical } from "react-icons/hi";
import Tabs from "../../../shared/components/Tabs";
import { InfoOrderOverview } from "../components/InfoOrderOverview";
import { useGetOrdersByCodeQuery } from "../services/orderApi";
import { useEffect } from "react";

const InfoOrderPage = () => {
    const { code } = useParams<{ code: string }>();
    const { showSuccess } = useToast();

    const { data, isLoading, isError, error } = useGetOrdersByCodeQuery({ order_code: code });

    const { showError } = useToast();

    useEffect(() => {
        if (isError) showError(error.data.message, "Error");
    }, [data, isError]);

    const tabs = [
        {
            label: "Overview",
            content: data ? <InfoOrderOverview data={data} /> : null,
        },
        {
            label: "Historial",
            content: <div>Historial</div>,
        },
        {
            label: "Problemas",
            content: <div>Tabs 2</div>,
        },
        {
            label: "Piezas",
            content: <div>Tabs 2</div>,
        },
    ];

    if (isLoading) {
        return "Loading...";
    }

    return (
        <Container className="container" size="full" center padding={"xs"}>
            <Tabs tabs={tabs} defaultTab={0} onChange={(index) => console.log("Pestaña:", index)} />
        </Container>
    );
};

export default InfoOrderPage;
