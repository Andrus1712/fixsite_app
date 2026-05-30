import { Box, Column, Divider, Row, Text } from "../../../shared/components";
import type { Customer } from "../models/OrderModel";

interface OrderCustomerCardProps {
    customer: Customer;
}

export const OrderCustomerCard = ({ customer }: OrderCustomerCardProps) => {
    const fields = [
        { label: "Nombre", value: customer.customer_name },
        { label: "Email", value: customer.customer_email },
        { label: "Teléfono", value: customer.customer_phone },
        { label: "Tipo", value: customer.customer_type },
        { label: "Ciudad", value: customer.customer_city },
        { label: "País", value: customer.customer_country },
    ];

    return (
        <Box p="lg" title="Cliente" showDivider>
            <Column $gap="xs">
                {fields.map((field, idx) => (
                    <div key={field.label}>
                        <Row $align="center" $justify="space-between" $wrap>
                            <Text weight="normal" variant="overline" color="muted">
                                {field.label}
                            </Text>
                            <Text variant="body2">{field.value}</Text>
                        </Row>
                        {idx < fields.length - 1 && <Divider margin="xs" />}
                    </div>
                ))}
            </Column>
        </Box>
    );
};
