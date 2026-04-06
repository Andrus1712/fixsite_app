import type { RequestInventory } from "../../movement/services/MaterialReceiptsApi";
import { Flex, Text } from "../../../../shared/components";
import styled from "styled-components";
const StatsCard = styled.div`
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;
    padding: ${(props) => props.theme.spacing.md};
    width: 100%;
`;

const ReasonBox = styled.div`
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 16px;
    margin: 16px 0;
`;

const ItemCard = styled.div`
    display: flex;
    gap: 12px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    margin-bottom: 8px;
`;

const IconBox = styled.div`
    width: 48px;
    height: 48px;
    background: #f3f4f6;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #6b7280;
`;

const ItemInfo = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
`;

const ItemQuantity = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: ${(props) => props.theme.spacing.xs};
`;

const UserSection = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 10px 0;
    border-top: 1px solid #e5e7eb;
`;

const Avatar = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    color: #6b7280;
`;

const DetailsRequest = ({ data }: { data: RequestInventory; }) => {
    const totalItems = data.items.reduce((sum, item) => sum + (item?.quantity || 0), 0);
    const totalCost = data.items.reduce((sum, item) => sum + ((item?.quantity || 0) * parseFloat(item?.unitcost || "0")), 0);

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <Flex justify="space-between" direction="column" fullHeight>
            <Flex direction="column" $flex={1} style={{ minHeight: 0 }}>
                <Flex gap="12px" style={{ marginBottom: '16px', flexShrink: 0 }}>
                    <StatsCard>
                        <Text variant="label-sm" color="gray600" uppercase>TOTAL ARTICULOS</Text>
                        <Text size="2xl" weight="bold">{totalItems} Units</Text>
                    </StatsCard>
                    <StatsCard>
                        <Text variant="label-sm" color="gray600" uppercase>FINANCIAL IMPACT</Text>
                        <Text size="2xl" weight="bold" color="error">-${totalCost.toFixed(2)}</Text>
                    </StatsCard>
                </Flex>

                {data.reason && (
                    <div style={{ flexShrink: 0 }}>
                        <Text variant="label-sm" color="gray600" uppercase>REASON FOR ADJUSTMENT</Text>
                        <ReasonBox>
                            <Text variant="paragraph-sm" color="gray700">"{data.reason}"</Text>
                        </ReasonBox>
                    </div>
                )}

                <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
                    <Text variant="label-sm" color="gray600" uppercase style={{ flexShrink: 0 }}>LISTADO DE ARTICULOS</Text>
                    <div style={{ marginTop: '12px', overflow: 'auto', flex: 1 }}>
                        {data.items.map((item) => (
                            <>
                                <ItemCard key={item?.id}>
                                    <IconBox>📦</IconBox>
                                    <ItemInfo>
                                        <Text weight="semibold">{item?.article_name}</Text>
                                        <Text variant="label-sm" color="gray600">SKU: {item?.article_sku}</Text>
                                    </ItemInfo>
                                    <ItemQuantity>
                                        <Text weight="medium">{item?.quantity} {item?.article_unit_measurement} {item?.difference && `(${item?.difference})`}</Text>
                                        <Text variant="label-sm" color="gray600">{item?.newQuantity}</Text>
                                    </ItemQuantity>
                                </ItemCard>
                            </>
                        ))}
                    </div>
                </div>
            </Flex>
            <UserSection style={{ flexShrink: 0 }}>
                <Avatar>{getInitials(data.created_by)}</Avatar>
                <Flex align="flex-start" direction="column" gap={"xs"}>
                    <Text weight="semibold">Solicitado por {data.created_by}</Text>
                    <Text variant="label" color="gray600">{new Date(data.created_at).toLocaleString()}</Text>
                    {data.store_to_name && <Text variant="label" color="gray600">DESTINO • {data.store_to_name}</Text>}
                    {data.store_from_name && <Text variant="label" color="gray600">ORIGEN • {data.store_from_name}</Text>}
                </Flex>
            </UserSection>
        </Flex>
    );
};
export default DetailsRequest;