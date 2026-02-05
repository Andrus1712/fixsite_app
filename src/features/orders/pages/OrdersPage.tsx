import { useMemo, useState, useEffect } from "react";
import { useGetAllOrdersQuery } from "../services/orderApi";
import { useNavigate } from "react-router";
import {
    Container,
    DataTable,
    PriorityIndicator,
    ExpandableList,
    useToast,
    Box,
    Badge,
    Tooltip,
    LoadingSpinner,
} from "../../../shared/components";
import ButtonGroup from "../../../shared/components/Buttons/ButtonGroup";
import IconButton from "../../../shared/components/Buttons/IconButton";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { format } from "date-fns";

function OrdersPage() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const { isLoading, data, isError, error, isSuccess, refetch } = useGetAllOrdersQuery({
        page,
        filter: searchValue,
        limit,
    });

    useEffect(() => {
        refetch();
    }, []);

    const { showSuccess, showError } = useToast();
    useEffect(() => {
        if (isError) {
            const errorMessage =
                "data" in error!
                    ? (error.data as any)?.message || "Error al obtener las órdenes"
                    : error?.message || "Error al obtener las órdenes";
            showError(errorMessage, "Error", 10000);
        }
    }, [isError, error]);

    useEffect(() => {
        if (isSuccess) {
            showSuccess("Órdenes obtenidas con éxito");
        }
    }, [isSuccess]);
    const navigator = useNavigate();

    const columns = useMemo(
        () => [
            {
                accessorKey: "order_code",
                header: "ORDER CODE",
                cell: ({ row }: { row: any }) => {
                    return (
                        <p
                            style={{
                                whiteSpace: "nowrap",
                            }}
                        >
                            {row.original.order_code}
                        </p>
                    );
                },
            },
            {
                accessorKey: "description",
                header: "DESCRIPTION",
            },
            {
                id: "issue",
                header: "ISSUE",
                cell: ({ row }: { row: any }) => {
                    return (
                        <ExpandableList
                            items={row.original.issues || []}
                            displayField={["issue_type", "issue_name"]}
                            emptyText="No issues"
                        />
                    );
                },
            },
            {
                accessorKey: "devices",
                header: "DEVICE INFO",
                cell: ({ row }: { row: any }) => {
                    return (
                        <ExpandableList
                            items={row.original.devices || []}
                            displayField={["serial_number", "device_name"]}
                            emptyText="No devices"
                        />
                    );
                },
            },
            {
                accessorKey: "priority_description",
                header: "PRIORITY",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const priority = getValue() as "low" | "medium" | "high";
                    return <PriorityIndicator priority={priority} />;
                },
            },
            {
                accessorKey: "technician_data",
                header: "ASSIGNED TO",
                cell: ({ row }: { row: any }) => {
                    return row.original.technician
                        ? `(${row.original.technician.id})${row.original.technician.name}`
                        : "No assigned";
                },
            },
            {
                accessorKey: "status_description",
                header: "STATUS",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const status = getValue() as string;
                    const getStatusColor = (
                        status: string
                    ): "success" | "info" | "warning" | "danger" | "default" | "secondary" | "outline" => {
                        switch (status?.toLowerCase()) {
                            case "pending":
                            case "pendiente":
                                return "warning";
                            case "completed":
                            case "completado":
                                return "success";
                            case "cancelled":
                            case "cancelado":
                                return "danger";
                            case "in progress":
                            case "en progreso":
                                return "info";
                            default:
                                return "default";
                        }
                    };

                    return <Badge variant={getStatusColor(status)}>{status}</Badge>;
                },
            },
            {
                accessorKey: "createdAt",
                header: "FECHA DE CREACION",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const date = new Date(getValue() as string);
                    return format(date, "dd/MM/yyyy HH:mm");
                },
            },
            {
                id: "actions",
                header: "ACTIONS",
                cell: ({ row }: { row: any }) => {
                    const handleEdit = () => {
                        console.log("Edit:", row.original);
                    };

                    const handleDelete = () => {
                        console.log("Delete:", row.original);
                    };

                    const handleInfoDetails = () => {
                        navigator(`/app/order/${row.original.order_code}/details`);
                    };

                    return (
                        <ButtonGroup spacing="sm">
                            <Tooltip content={"Informacion de la orden"} position="top">
                                <IconButton
                                    color="warning"
                                    variant="ghost"
                                    icon={<FaEye />}
                                    size="sm"
                                    onClick={handleInfoDetails}
                                />
                            </Tooltip>
                            <Tooltip content={"Editar"} position="top">
                                <IconButton
                                    color="info"
                                    variant="ghost"
                                    icon={<BsPencilSquare />}
                                    size="sm"
                                    onClick={handleEdit}
                                />
                            </Tooltip>
                            <Tooltip content={"Eliminar"} position="top">
                                <IconButton
                                    color="danger"
                                    variant="ghost"
                                    icon={<BsTrash />}
                                    size="sm"
                                    onClick={handleDelete}
                                />
                            </Tooltip>
                        </ButtonGroup>
                    );
                },
            },
        ],
        []
    );

    return (
        <Container size="full" center>
            <Box $p="lg" $shadow rounded $fullWidth title="Ordenes" bg="white">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <DataTable
                        data={data?.data || []}
                        columns={columns}
                        initialPageSize={limit ?? 25}
                        pageSizeOptions={[10, 25, 50, 100]}
                        serverSide={true}
                        page={data?.pagination.page}
                        total={data?.pagination.total}
                        totalPages={data?.pagination.totalPages}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                        maxHeight={500}
                    />
                )}
            </Box>
        </Container>
    );
}

export default OrdersPage;
