import dayjs from "dayjs";
import {
    Badge,
    Box,
    Button,
    Card,
    Column,
    Divider,
    DropdownButton,
    Grid,
    Row,
    Table,
    Text,
    useToast,
} from "../../../shared/components";
import { ReportedFailures } from "./ReportedFailures";
import type { Notes, WorkOrder } from "../models/OrderModel";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckmark, IoDocumentText, IoPencil, IoPrint, IoTrash } from "react-icons/io5";
import { BsNut } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";

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
    const images = [
        "https://i.redd.it/my-broken-s24-ultra-v0-8tv9o2nhdbrd1.jpg?width=4284&format=pjpg&auto=webp&s=91541b1c4ab42c5237cd3d79403fe92cf01e4077",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSBdcW_YpJMZBzdngFrhCY-wvlDumcAULddg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbQMsUo2fxH7NeIcuK2pmoo9xikJb8p50hig&s",
    ];
    const images2 = [
        "https://i.redd.it/my-broken-s24-ultra-v0-lt4gaxtme7sd1.jpg?width=3000&format=pjpg&auto=webp&s=5884d0da162a6a24e678e358eaff50cd588c8cfe",
        "https://i.redd.it/my-broken-s24-ultra-v0-gi7n23nhdbrd1.jpg?width=3024&format=pjpg&auto=webp&s=dbd929f8500fab67f70776f995b4c4a6a1d19335",
        "https://i.ytimg.com/vi/4t0g1tqGLEo/maxresdefault.jpg",
    ];

    // Datos mock para fallas reportadas
    const reportedFailures = [
        {
            id: "1",
            code: "HW-SP-003",
            title: "Tarjeta lógica dañada",
            description:
                "El cliente informa que el dispositivo se cayó y la pantalla se agrietó. El táctil funciona correctamente, pero el cristal está dañado.",
            type: "Hardware" as const,
            priority: "High" as const,
            status: "In Progress" as const,
            images: images,
            reportedDate: "15/01/2024",
            assignedTechnician: data?.assigned_technician_id?.toString() || "Juan Pérez",
        },
        {
            id: "2",
            code: "HW-DSP-001",
            title: "Pantalla táctil dañada",
            description:
                "El cliente informa que el dispositivo se cayó y la pantalla se agrietó. El táctil funciona correctamente, pero el cristal está dañado.",
            type: "Hardware" as const,
            priority: "Medium" as const,
            status: "Open" as const,
            images: images2,
            reportedDate: "14/01/2024",
            assignedTechnician: data?.assigned_technician_id?.toString() || "María García",
        },
    ];

    return (
        <>
            <Grid $columns={{ xs: 1, sm: 1, lg: "3fr 1fr" }} $gap={{ xs: "sm", lg: "sm" }}>
                <Column>
                    <Box
                        bg="white"
                        p={"lg"}
                        rounded
                        shadow
                        fullWidth
                        title={`Información de la orden`}
                        headerActions={
                            <Row $align="center" $justify="flex-end" $gap="xs" $wrap>
                                <Button variant="secondary" leftIcon={<IoPrint />} size="sm">
                                    Etiqueta
                                </Button>
                                <DropdownButton
                                    label="Acciones"
                                    variant="primary"
                                    size="sm"
                                    items={acciones}
                                    rightIcon={<HiDotsVertical />}
                                />
                            </Row>
                        }
                        showDivider={true}
                    >
                        <Grid $columns="repeat(auto-fit, minmax(180px, 1fr))" $gap="md">
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Codigo de Orden
                                </Text>
                                <Row $align="center" $gap={"xs"}>
                                    <Text variant="body1">{data.order_code}</Text>
                                    <FaCopy
                                        onClick={() => {
                                            alert("Click");
                                        }}
                                    />
                                </Row>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Fecha de creación
                                </Text>
                                <Text variant="body1">{dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Ultima Fecha de Modificación
                                </Text>
                                <Text variant="body1">{dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Fecha vencimiento
                                </Text>
                                <Text variant="body1">{dayjs(data.createdAt).format("DD/MM/YYYY HH:mm:ss")}</Text>
                            </Column>
                            <Column align="flex-start" justify="flex-start">
                                <Text weight="normal" variant="overline" color="muted">
                                    Prioridad
                                </Text>
                                <Text variant="body1">
                                    {data.priority} - {data.priority_description} ANS 1222
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
                    <Box title="Fallas Reportadas" p="lg" bg="white" shadow rounded showDivider={false}>
                        <ReportedFailures
                            failures={reportedFailures}
                            onEditFailure={(failure) => {
                                console.log("Editar falla:", failure);
                                // Aquí puedes agregar la lógica para editar la falla
                            }}
                            onConfigureFailure={(failure) => {
                                console.log("Configurar falla:", failure);
                                // Aquí puedes agregar la lógica para configurar la falla
                            }}
                        />
                    </Box>
                </Column>
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
                                                    onClick: () => { },
                                                    icon: <IoPencil />,
                                                },
                                                {
                                                    id: "info",
                                                    label: "Configuracion",
                                                    icon: <BsNut />,
                                                    onClick: () => { },
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
                                                    onClick: () => { },
                                                    icon: <IoPencil />,
                                                },
                                                {
                                                    id: "info",
                                                    label: "Configuracion",
                                                    icon: <BsNut />,
                                                    onClick: () => { },
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
