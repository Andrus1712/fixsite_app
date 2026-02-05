import dayjs from "dayjs";
import {
    Badge,
    Box,
    Button,
    Card,
    Column,
    Divider,
    DropdownButton,
    DropdownButtonExample,
    Flex,
    Grid,
    Modal,
    Row,
    SearchableSelect,
    SearchInput,
    Table,
    Text,
    useToast,
} from "../../../shared/components";
import { ReportedFailures } from "./ReportedFailures";
import type { Notes, WorkOrder } from "../models/OrderModel";
import { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { HiDotsVertical } from "react-icons/hi";
import { IoCheckmark, IoDocumentText, IoPencil, IoPrint, IoTrash } from "react-icons/io5";
import { BsNut } from "react-icons/bs";
import { FaCopy } from "react-icons/fa";
import { useGetAllTechnicniansQuery } from "../../technician/services/TechnicianApi";
import { useAssignOrderToTechnicianMutation } from "../services/orderApi";
import { Link } from "react-router";

interface DropdownMenuOption {
    id: string;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isDanger?: boolean;
    icon?: React.ReactNode;
}

interface DropdownMenuSection {
    label?: string;
    options: DropdownMenuOption[];
}

export const InfoOrderOverview = ({ data }: { data: WorkOrder }) => {
    const { showSuccess, showError } = useToast();
    const [showModalSetTechnician, setShowModalSetTechnician] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | number | null>(null);

    const [assignOrderToTechnician, { isLoading: isAssigning }] = useAssignOrderToTechnicianMutation();

    const { data: technicians, isLoading } = useGetAllTechnicniansQuery(
        { filter: searchValue, limit: "todos" },
        { skip: !showModalSetTechnician }
    );

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
                    return dayjs(row.original.timestamp).format("DD/MM/YYYY HH:mm:ss");
                },
            },
        ],
        []
    );

    const acciones = useMemo<DropdownMenuOption[] | DropdownMenuSection[]>(() => {
        const base: DropdownMenuOption[] = [
            {
                id: "repair",
                label: "Iniciar Reparación",
                onClick: () => showSuccess("Reparación iniciada"),
                disabled: true,
            },
            {
                id: "presupuesto",
                label: "Hacer Presupuesto",
                onClick: () => showSuccess("Presupuesto creado"),
            },
        ];

        if (data.assigned_technician_id == null) {
            base.unshift({
                id: "assign_technician",
                label: "Asignar Tecnico",
                onClick: () => setShowModalSetTechnician(true),
            });
        }

        return [
            {
                label: "Gestión",
                options: base,
            },
            {
                label: "Administración",
                options: [
                    {
                        id: "edit",
                        label: "Editar Orden",
                        onClick: () => showSuccess("Orden editada"),
                    },
                    {
                        id: "cancel",
                        label: "Cancelar Orden",
                        icon: <IoTrash />,
                        isDanger: true,
                        onClick: () => showSuccess("Orden cancelada"),
                    },
                ],
            },
        ];
    }, [data.assigned_technician_id, showSuccess]);

    // Datos mock para fallas reportadas
    const reportedFailures = data.issues;

    const asignarTecnico = async () => {
        if (!selectedTechnicianId) {
            showError("Selecciona un técnico antes de asignar", "Error");
            return;
        }

        try {
            await assignOrderToTechnician({
                order_code: data.order_code,
                technician_id: Number(selectedTechnicianId),
            }).unwrap();
            setShowModalSetTechnician(false);
            showSuccess("Técnico asignado correctamente");
        } catch (err) {
            console.error("Error asignando técnico:", err);
            showError("Error al asignar técnico. Intenta nuevamente.", "Error");
        }
    };

    return (
        <div>
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
                                    variant="pink"
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
                                {data.assigned_technician_id ? (
                                    <Link to={`/app/technicians/${data.assigned_technician_id}`}>
                                        <Text variant="body1">{data.technician?.name}</Text>
                                    </Link>
                                ) : (
                                    "No asignado"
                                )}
                            </Column>
                        </Grid>
                        <Divider />
                        <Table columns={columns} data={data.notes || []} />
                    </Box>
                    <div
                        style={{
                            backgroundColor: "white",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1) }}",
                        }}
                    >
                        <Text variant="label-lg" align="center">
                            Fallas Reportadas
                        </Text>
                    </div>
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
            <Modal
                isOpen={showModalSetTechnician}
                onClose={() => setShowModalSetTechnician(false)}
                title="Asignar Tecnico"
                footer={
                    <Flex $justify="flex-end" $gap="sm">
                        <Button variant="outline" onClick={() => setShowModalSetTechnician(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={asignarTecnico}
                            disabled={
                                !selectedTechnicianId || !technicians || technicians.data.length === 0 || isAssigning
                            }
                        >
                            Asignar Tecnico
                        </Button>
                    </Flex>
                }
            >
                <SearchableSelect
                    label="Listado de Tecnicos Activos"
                    allowClear
                    fullWidth
                    isLoading={isLoading}
                    onSearch={setSearchValue}
                    value={selectedTechnicianId || undefined}
                    onChange={(val) => setSelectedTechnicianId(val)}
                    options={technicians?.data.map((tech: any) => ({ label: tech.name, value: tech.id })) || []}
                />
            </Modal>
        </div>
    );
};
