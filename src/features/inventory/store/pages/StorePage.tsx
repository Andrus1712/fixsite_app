import { FaSearch } from "react-icons/fa";
import { Badge, Box, Card, Column, Container, Flex, Grid, Input, Label, LoadingSpinner, Row, Text, Tooltip } from "../../../../shared/components";
import { useState } from "react";
import { useGetAllStoresQuery } from "../services/StoreApi";
import { BsBox } from "react-icons/bs";
import StatusDot from "../../../../shared/components/StatusDot";
import { FaAnglesDown, FaAnglesUp } from "react-icons/fa6";
import { useNavigate } from "react-router";

const storePage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const { data, isLoading } = useGetAllStoresQuery({
        page: page,
        limit: limit,
        filter: filter
    });

    const navigator = useNavigate();

    if (isLoading) {
        return <LoadingSpinner mensaje="Cargando bodegas" />;
    }

    return (
        <Container $size="full">
            <Flex direction="column" fullWidth fullHeight>
                <Flex>
                    <Input startIcon={<FaSearch />} placeholder="Buscar..." onChange={(e) => setFilter(e.target.value)} />
                </Flex>
                <Grid $columns={4} gap={"md"}>
                    {data?.data.map(store => (
                        <>
                            <Tooltip content={"Ingresar"} position="right" fullWidth>
                                <Card variant="elevated" header={
                                    <Flex align="center" justify="space-between">
                                        <Flex gap={"md"} align="center">
                                            <BsBox size={"24px"} />
                                            <Flex align="center" direction="row">
                                                <Text variant="body1">{store.name}</Text>
                                                <Badge variant="outline" ><Text variant="label-sm">{store.type}</Text></Badge>
                                            </Flex>
                                        </Flex>
                                        <StatusDot variant={store.active ? 'active' : 'inactive'} ></StatusDot>
                                    </Flex>
                                } onClick={() => navigator(`/app/inventory/store/${store.id}`, {
                                    state: { store }
                                })}>
                                    <Flex fullWidth align="baseline" direction="column">
                                        <Text variant="label">Inventario: 50</Text>
                                        <Text variant="label">Solicitudes: 4</Text>
                                        <Flex align="center">
                                            <Text variant="label">Movimientos:</Text>
                                            <Flex align="center" gap={"xs"}>
                                                <FaAnglesUp color="green" /> 5
                                            </Flex>
                                            <Flex align="center" gap={"xs"}>
                                                <FaAnglesDown color="red" /> 10
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </Tooltip>
                        </>
                    ))}
                </Grid>
            </Flex>
        </Container>
    );
};
export default storePage;