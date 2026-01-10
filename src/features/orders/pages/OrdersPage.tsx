import { useMemo, useState, useEffect } from "react";
import {
    // useGetAllOrdersQuery,
    useGetAllOrdersQueryExternal,
} from "../services/orderApi";
import { useNavigate } from "react-router";
import Button from "../../../shared/components/Buttons/Button";
import { Box, Container, Table, PriorityIndicator, ExpandableList, Grid, useToast } from "../../../shared/components";
import { formatDate } from "../../../shared/utils/DateFormatter";

function OrdersPage() {
    // const {} = useGetAllOrdersQuery();
    const { isLoading, data, isError, error, isSuccess, refetch } = useGetAllOrdersQueryExternal();

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
                        ? `(${row.original.technician.id})${row.original.technician.assigned_technician_name}`
                        : "No assigned";
                },
            },
            {
                accessorKey: "status_description",
                header: "STATUS",
                cell: ({ getValue }: { getValue: () => any }) => {
                    const status = getValue() as string;
                    const getStatusColor = (status: string) => {
                        switch (status?.toLowerCase()) {
                            case "pending":
                            case "pendiente":
                                return "#f59e0b";
                            case "completed":
                            case "completado":
                                return "#10b981";
                            case "cancelled":
                            case "cancelado":
                                return "#ef4444";
                            case "in progress":
                            case "en progreso":
                                return "#3b82f6";
                            default:
                                return "#6b7280";
                        }
                    };

                    return (
                        <span
                            style={{
                                backgroundColor: getStatusColor(status),
                                color: "white",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "500",
                            }}
                        >
                            {status}
                        </span>
                    );
                },
            },
            {
                accessorKey: "createdAt",
                header: "FECHA DE CREACION",
                cell: ({ getValue }: { getValue: () => any }) => {
                    return formatDate(getValue() as string, "es-CO");
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

                    return (
                        <div style={{ display: "flex", gap: "8px" }}>
                            <button
                                onClick={handleEdit}
                                style={{
                                    padding: "4px 8px",
                                    backgroundColor: "#3b82f6",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{
                                    padding: "4px 8px",
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    fontSize: "12px",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    );
                },
            },
        ],
        []
    );
    const [searchValue, setSearchValue] = useState("");

    return (
        <Container size="full" center>
            <Grid columns={"5fr 1fr"} fullHeight rows={2}>
                <Box
                    p="lg"
                    bg="white"
                    rounded
                    shadow
                    title="Listado de ordenes"
                    headerActions={
                        <Button variant="primary" size="md" onClick={() => navigator("new")}>
                            Nueva Orden
                        </Button>
                    }
                >
                    <Table
                        data={data?.data || []}
                        columns={columns}
                        isLoading={isLoading}
                        page={data?.page}
                        total={data?.total}
                        totalPages={data?.totalPages}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        searchPlaceholder="Buscar ordenes..."
                    />
                </Box>
                <Box p="lg" bg="white" rounded shadow title="Filtro">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quae, illum voluptates magni fuga
                        animi cupiditate tempore dicta, veniam, sequi maiores ut nemo accusamus temporibus iste aliquam
                        rem quod sed. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quae, illum
                        voluptates magni fuga animi cupiditate tempore dicta, veniam, sequi maiores ut nemo accusamus
                        temporibus iste aliquam rem quod sed. Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Esse quae, illum voluptates magni fuga animi cupiditate tempore dicta, veniam, sequi maiores ut
                        nemo accusamus temporibus iste aliquam rem quod sed. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Esse quae, illum voluptates magni fuga animi cupiditate tempore dicta, veniam,
                        sequi maiores ut nemo accusamus temporibus iste aliquam rem quod sed. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Esse quae
                    </p>
                </Box>
            </Grid>
        </Container>
    );
}

export default OrdersPage;
