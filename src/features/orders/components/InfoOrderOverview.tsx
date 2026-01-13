import dayjs from "dayjs";
import {
    Badge,
    Box,
    Button,
    Column,
    Divider,
    DropdownButton,
    DropdownButtonExample,
    Grid,
    Label,
    Row,
    Table,
    Text,
    useToast,
} from "../../../shared/components";
import type { Notes, WorkOrder } from "../models/OrderModel";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckmark, IoDocumentText, IoPencil, IoPrint, IoTrash } from "react-icons/io5";
import { BsNut } from "react-icons/bs";

export const InfoOrderOverview = ({ data }: { data: WorkOrder }) => {
    const { showSuccess } = useToast();

    const columns = useMemo<ColumnDef<Notes>[]>(
        () => [
            {
                accessorKey: "content",
                header: "NOTA",
            },
            {
                accessorKey: "author",
                header: "AUTOR",
            },
            {
                accessorKey: "timestamp",
                header: "FECHA DE CREACION",
                cell: ({ row }) => {
                    return dayjs(row.timestamp).format("DD/MM/YYYY HH:mm:ss");
                },
            },
        ],
        []
    );

    const acciones = [
        {
            id: "repair",
            label: "Iniciar Reparación",
            icon: <IoCheckmark />,
            onClick: () => showSuccess("Reparación iniciada"),
        },
        {
            id: "presupuesto",
            label: "Hacer Presupuesto",
            icon: <IoDocumentText />,
            onClick: () => showSuccess("Presupuesto creado"),
        },
        {
            id: "cancel",
            label: "Cancelar Orden",
            icon: <IoTrash />,
            isDanger: true,
            onClick: () => showSuccess("Orden cancelada"),
        },
    ];

    return (
        <>
            <Grid columns={"5fr 2fr"}>
                <div>
                    <Box
                        bg="white"
                        p={"lg"}
                        rounded
                        shadow
                        fullWidth
                        title={`Información de la orden`}
                        headerActions={
                            <Row $align="center" $justify="flex-end" $gap="sm">
                                <Button variant="secondary" leftIcon={<IoPrint />}>
                                    Imprimir etiqueta
                                </Button>
                                <DropdownButton
                                    label="Acciones"
                                    variant="primary"
                                    items={acciones}
                                    rightIcon={<HiDotsVertical />}
                                />
                            </Row>
                        }
                        showDivider={true}
                    >
                        <Grid columns={2}>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Codigo de Orden
                                </Text>
                                <Text variant="body1">{data.order_code}</Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Fecha de creación
                                </Text>
                                <Text variant="body1">{dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Prioridad
                                </Text>
                                <Text variant="body1">
                                    {data.priority} - {data.priority_description}
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Estado
                                </Text>
                                <Text variant="body1">
                                    <Badge variant="warning">{data.status_description}</Badge>
                                </Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Tecnico Asignado
                                </Text>
                                <Text variant="body1">
                                    {data.assigned_technician_id ? data.assigned_technician_id : "No asignado"}
                                </Text>
                            </Column>
                        </Grid>
                        <Divider />
                        <Table columns={columns} data={data.notes || []} />
                    </Box>
                </div>
                <div>
                    <Column>
                        <Box
                            bg="white"
                            p={"lg"}
                            rounded
                            shadow
                            title="Informacion del dispositivo"
                            subtitle={data.devices[0].serial_number}
                            headerActions={
                                <DropdownButton
                                    items={[
                                        {
                                            label: "Accion",
                                            options: [
                                                {
                                                    id: "edit",
                                                    label: "Editar",
                                                    onClick: () => {},
                                                    icon: <IoPencil />,
                                                },
                                                {
                                                    id: "info",
                                                    label: "Configuracion",
                                                    icon: <BsNut />,
                                                    onClick: () => {},
                                                },
                                            ],
                                        },
                                    ]}
                                    rightIcon={<HiDotsVertical />}
                                />
                            }
                            showDivider={false}
                        >
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Dispositivo:
                                </Text>
                                <Text variant="body1">{data.devices[0].device_name}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Tipo:
                                </Text>
                                <Text variant="body1">
                                    {data.devices[0].device_type} - {data.devices[0].device_type_name}
                                </Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Marca:
                                </Text>
                                <Text variant="body1">
                                    {data.devices[0].device_brand} - {data.devices[0].device_brand_name}
                                </Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Imei:
                                </Text>
                                <Text variant="body1">
                                    <Text>{data.devices[0].imei}</Text>
                                </Text>
                            </Row>

                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Serial:
                                </Text>
                                <Text variant="body1">
                                    <Text>{data.devices[0].serial_number}</Text>
                                </Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Color:
                                </Text>
                                <Text variant="body1">
                                    <Text>{data.devices[0].color}</Text>
                                </Text>
                            </Row>
                        </Box>
                        <Box
                            bg="white"
                            p={"lg"}
                            rounded
                            shadow
                            title="Informacion del cliente"
                            showDivider={false}
                            headerActions={
                                <DropdownButton
                                    items={[
                                        {
                                            label: "Accion",
                                            options: [
                                                {
                                                    id: "edit",
                                                    label: "Editar",
                                                    onClick: () => {},
                                                    icon: <IoPencil />,
                                                },
                                                {
                                                    id: "info",
                                                    label: "Configuracion",
                                                    icon: <BsNut />,
                                                    onClick: () => {},
                                                },
                                            ],
                                        },
                                    ]}
                                    rightIcon={<HiDotsVertical />}
                                />
                            }
                        >
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Nombre del cliente
                                </Text>
                                <Text variant="body1">{data.customer.customer_name}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Email
                                </Text>
                                <Text variant="body1">{data.customer.customer_email}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Telefono de contacto
                                </Text>
                                <Text variant="body1">{data.customer.customer_phone}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Tipo Cliente
                                </Text>
                                <Text variant="body1">{data.customer.customer_type}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Ciudad
                                </Text>
                                <Text variant="body1">{data.customer.customer_city}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                            <Row $align="center" $justify="space-between">
                                <Text weight="normal" variant="overline" color="muted">
                                    Pais
                                </Text>
                                <Text variant="body1">{data.customer.customer_country}</Text>
                            </Row>
                            <Divider margin={"sm"} />
                        </Box>
                    </Column>
                </div>
            </Grid>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </>
    );
};
