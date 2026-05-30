import { Box, Column, Divider, DropdownButton, Row, Text } from "../../../shared/components";
import type { Device } from "../models/OrderModel";
import { HiDotsVertical } from "react-icons/hi";
import { IoPencil } from "react-icons/io5";
import { BsNut } from "react-icons/bs";

interface OrderDeviceCardProps {
    device: Device;
}

export const OrderDeviceCard = ({ device }: OrderDeviceCardProps) => {
    const fields = [
        { label: "Dispositivo", value: device.device_name },
        { label: "Tipo", value: `${device.device_type_name ?? device.device_type}` },
        { label: "Marca", value: `${device.device_brand_name ?? device.device_brand}` },
        { label: "Modelo", value: device.device_model_name ?? "—" },
        { label: "IMEI", value: device.imei || "—" },
        { label: "Serial", value: device.serial_number || "—" },
        { label: "Color", value: device.color || "—" },
    ];

    return (
        <Box
            p="lg"
            title="Dispositivo"
            subtitle={device.serial_number}
            headerActions={
                <DropdownButton
                    items={[
                        {
                            label: "Acción",
                            options: [
                                { id: "edit", label: "Editar", onClick: () => { }, icon: <IoPencil /> },
                                { id: "config", label: "Configuración", icon: <BsNut />, onClick: () => { } },
                            ],
                        },
                    ]}
                    rightIcon={<HiDotsVertical />}
                    size="sm"
                />
            }
            showDivider
        >
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
