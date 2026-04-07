import { useMemo, useState } from "react";
import { Aside, Badge, Box, Button, Checkbox, DataTable, DropdownButton, Flex, LoadingSpinner, Text, useAlert, useToast } from "../../../../shared/components";
import { useParams } from "react-router";
import ButtonGroup from "../../../../shared/components/Buttons/ButtonGroup";
import { FaBan, FaCheck } from "react-icons/fa";
import { HiMiniArrowLeftOnRectangle, HiMiniArrowPath, HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { CgArrowsExchange } from "react-icons/cg";
import { format } from "date-fns";
import DetailsRequest from "./DetailsRequest";
import { useGetAllRequestByStoreIdQuery, type RequestInventory } from "../services/StoreApi";
import { IoIosSend } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { useApproveMaterialReceiptsMutation, useCancelMaterialReceiptsMutation, useRejectMaterialReceiptsMutation, useSubmitMaterialReceiptsRequestMutation } from "../../movement/services/MaterialReceiptsApi";
import { useApproveStockTransferMutation, useCancelStockTransferMutation, useRejectStockTransferMutation, useSubmitStockTransferMutation } from "../../movement/services/StockTransfersApi";
import { useApproveMaterialIssueMutation, useCancelMaterialIssueMutation, useRejectMaterialIssueMutation, useSubmitMaterialIssueMutation } from "../../movement/services/MaterialIssuesApi";
import { useApproveInventoryAdjustmentMutation, useCancelInventoryAdjustmentMutation, useRejectInventoryAdjustmentMutation, useSubmitInventoryAdjustmentMutation } from "../../movement/services/InventoryAdjustmentsApi";

const RequestMaterial = () => {
    const [filter, setFilter] = useState("");
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [openAside, setOpenAside] = useState(false);
    const [rowSelection, setRowSelection] = useState({});
    const [currentRequest, setCurrentRequest] = useState<RequestInventory>();

    const { store_id } = useParams();

    const { showConfirm } = useAlert();
    const { showError, showSuccess } = useToast();


    const { data, isLoading } = useGetAllRequestByStoreIdQuery({
        page,
        filter,
        limit,
        store_id: Number(store_id)
    }, {
        skip: !store_id
    });

    // Material receipts
    const [submitMR, { isLoading: isSubmittingMR }] = useSubmitMaterialReceiptsRequestMutation();
    const [cancelMR, { isLoading: isCancelingMR }] = useCancelMaterialReceiptsMutation();
    const [rejectMR, { isLoading: isRejectingMR }] = useRejectMaterialReceiptsMutation();
    const [approveMR, { isLoading: isApprovingMR }] = useApproveMaterialReceiptsMutation();

    // Stock transfers
    const [submitST, { isLoading: isSubmittingST }] = useSubmitStockTransferMutation();
    const [cancelST, { isLoading: isCancelingST }] = useCancelStockTransferMutation();
    const [rejectST, { isLoading: isRejectingST }] = useRejectStockTransferMutation();
    const [approveST, { isLoading: isApprovingST }] = useApproveStockTransferMutation();

    // Material issues
    const [submitMI, { isLoading: isSubmittingMI }] = useSubmitMaterialIssueMutation();
    const [cancelMI, { isLoading: isCancelingMI }] = useCancelMaterialIssueMutation();
    const [rejectMI, { isLoading: isRejectingMI }] = useRejectMaterialIssueMutation();
    const [approveMI, { isLoading: isApprovingMI }] = useApproveMaterialIssueMutation();

    // Inventory adjustments
    const [submitIA, { isLoading: isSubmittingIA }] = useSubmitInventoryAdjustmentMutation();
    const [cancelIA, { isLoading: isCancelingIA }] = useCancelInventoryAdjustmentMutation();
    const [rejectIA, { isLoading: isRejectingIA }] = useRejectInventoryAdjustmentMutation();
    const [approveIA, { isLoading: isApprovingIA }] = useApproveInventoryAdjustmentMutation();

    const getSubmitMethod = (reference: string) => {
        switch (reference) {
            case 'MATERIAL_RECEIPT': return submitMR;
            case 'STOCK_TRANSFER': return submitST;
            case 'MATERIAL_ISSUE': return submitMI;
            case 'INVENTORY_ADJUSTMENT': return submitIA;
            default: return submitMR;
        }
    };

    const getCancelMethod = (reference: string) => {
        switch (reference) {
            case 'MATERIAL_RECEIPT': return cancelMR;
            case 'STOCK_TRANSFER': return cancelST;
            case 'MATERIAL_ISSUE': return cancelMI;
            case 'INVENTORY_ADJUSTMENT': return cancelIA;
            default: return cancelMR;
        }
    };

    const getRejectMethod = (reference: string) => {
        switch (reference) {
            case 'MATERIAL_RECEIPT': return rejectMR;
            case 'STOCK_TRANSFER': return rejectST;
            case 'MATERIAL_ISSUE': return rejectMI;
            case 'INVENTORY_ADJUSTMENT': return rejectIA;
            default: return rejectMR;
        }
    };

    const getApproveMethod = (reference: string) => {
        switch (reference) {
            case 'MATERIAL_RECEIPT': return approveMR;
            case 'STOCK_TRANSFER': return approveST;
            case 'MATERIAL_ISSUE': return approveMI;
            case 'INVENTORY_ADJUSTMENT': return approveIA;
            default: return approveMR;
        }
    };

    // const referenceIcon = (reference: string) => {
    //     switch (reference) {
    //         case 'STOCK_TRANSFER': return <MdOutlineCompareArrows />;
    //         case 'MATERIAL_RECEIPT': return <MdArrowLeft />;
    //         case 'MATERIAL_ISSUE': return <MdArrowRightAlt />;
    //         case 'INVENTORY_ADJUSTMENT': return 'Orden de Compra';
    //         default: return null;
    //     }
    // };

    const REFERENCE_ICONS: Record<string, React.ReactNode> = {
        'STOCK_TRANSFER': <HiMiniArrowPath />,
        'MATERIAL_RECEIPT': <HiMiniArrowLeftOnRectangle />,
        'MATERIAL_ISSUE': <HiMiniArrowRightStartOnRectangle />,
        'INVENTORY_ADJUSTMENT': <CgArrowsExchange />,
    };

    const colorStatus = (status: string) => {
        switch (status) {
            case "APPROVED": return "success";
            case "REJECTED": return "danger";
            case "PENDING": return "warning";
            case "CANCELLED": return "default";
            default: return "info";
        }
    };

    const showInfoRequest = (data: any) => {
        setOpenAside(true);
        setCurrentRequest(data.original);
    };

    const handleSubmitRequest = (row: any) => {
        showConfirm(
            "Enviar solicitud",
            `¿Estás seguro de que deseas enviar la solicitud ${row.code}?`,
            async () => {
                try {
                    const submitMethod = getSubmitMethod(row.reference);
                    const payload = await submitMethod(row.id_request).unwrap();
                    if (payload.success) {
                        showSuccess(payload.message);
                    }
                } catch (error: any) {
                    console.error("Error al enviar la solicitud:", error);
                    showError(error.data?.message, "Ocurrió un error al enviar la solicitud.");
                }
            },
        );
    };

    const handleCancelRequest = (row: any) => {
        showConfirm(
            "Cancelar solicitud",
            `¿Estás seguro de que deseas cancelar la solicitud ${row.code}?`,
            async () => {
                try {
                    const cancelMethod = getCancelMethod(row.reference);
                    const payload = await cancelMethod(row.id_request).unwrap();
                    if (payload.success) {
                        showSuccess(payload.message);
                    }
                } catch (error: any) {
                    console.error("Error al enviar la solicitud:", error);
                    showError(error.data?.message, "Ocurrió un error al enviar la solicitud.");
                }
            },
        );
    };

    const handleRejectRequest = (row: any) => {
        setOpenAside(false);
        showConfirm(
            "Rechazar solicitud",
            `¿Estás seguro de que deseas Rechazar la solicitud ${row.code}?`,
            async () => {
                try {
                    const rejectMethod = getRejectMethod(row.reference);
                    const payload = await rejectMethod(row.id_request).unwrap();
                    if (payload.success) {
                        showSuccess(payload.message);
                    }
                } catch (error: any) {
                    console.error("Error al enviar la solicitud:", error);
                    showError(error.data?.message, "Ocurrió un error al enviar la solicitud.");
                }
            },
        );
    };

    const handleApproveRequest = (row: any) => {
        setOpenAside(false);
        showConfirm(
            "Aprobar solicitud",
            `¿Estás seguro de que deseas Aprobar la solicitud ${row.code}?`,
            async () => {
                try {
                    const approveMethod = getApproveMethod(row.reference);
                    const payload = await approveMethod(row.id_request).unwrap();
                    if (payload.success) {
                        showSuccess(payload.message);
                    }
                } catch (error: any) {
                    console.error("Error al enviar la solicitud:", error);
                    showError(error.data?.message, "Ocurrió un error al enviar la solicitud.");
                }
            },
        );
    };

    const columns = useMemo(() => [
        {
            id: "select",
            header: ({ table }: any) => (
                <Checkbox checked={table.getIsAllRowsSelected()} indeterminate={table.getIsSomeRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />
            ),
            cell: ({ row }: any) => (
                <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                        checked={row.getIsSelected()}
                        disabled={(row.original.status !== 'PENDING' && row.original.status !== 'DRAFT')}
                        onChange={row.getToggleSelectedHandler()}
                    />
                </div>
            ),
            size: 100
        },
        {
            header: "# de solicitud",
            accessorKey: "code",
            size: 200
        },
        {
            header: "Referencia",
            cell: ({ row }: any) => (
                <Badge variant="outline"><Flex>{REFERENCE_ICONS[row.original.reference]} {row.original.reference}</Flex></Badge>
            ),
            accessorKey: "reference"
        },
        {
            accessorKey: "store_from_name",
            header: "Bodega Origen",
        },
        {
            accessorKey: "store_to_name",
            header: "Bodega destino",
        },
        {
            accessorKey: "count_items",
            header: "Items",
            size: 50
        },
        {
            accessorKey: "created_by",
            header: "Solicitado por",
        },
        {
            accessorKey: "approved_by",
            header: "Aprobado por",
        },
        {
            accessorKey: "created_at",
            header: "Fecha de la solitud",
            cell: ({ getValue }: { getValue: () => any; }) => {
                const date = new Date(getValue() as string);
                return format(date, "yyyy-MM-dd HH:mm");
            },
        },
        {
            header: "Estado",
            cell: ({ row }: any) => (
                <Badge variant={colorStatus(row.original.status)}>{row.original.status}</Badge>
            )
        },
        {
            header: "Accion",
            cell: ({ row }: any) => {
                const actions = [];

                if (row.original.status === 'DRAFT') {
                    actions.push(
                        {
                            id: "update",
                            label: "Editar",
                            icon: <BsPencilSquare />,
                            onClick: () => null
                        },
                        {
                            id: "send",
                            label: "Enviar",
                            icon: <IoIosSend />,
                            onClick: () => handleSubmitRequest(row.original)
                        }
                    );
                }
                if (row.original.status === 'DRAFT' || row.original.status === 'PENDING') {
                    actions.push(
                        {
                            id: "cancel",
                            label: "Cancelar",
                            icon: <FaBan />,
                            onClick: () => handleCancelRequest(row.original)
                        }
                    );
                }
                // return (<TableIconButton.Group>
                //     <TableIconButton
                //         color="warning"
                //         size="md"
                //         icon={<FaEye />}
                //         tooltip="Ver detalles"
                //         onClick={() => showInfoRequest(row)}
                //     />
                //     {row.original.status === 'DRAFT' && (
                //         <>
                //             <TableIconButton color="primary" size="md" icon={<BsPencilSquare />} tooltip="Editar" />
                //             <TableIconButton color="success" size="md" icon={<IoIosSend />} tooltip="Enviar" />
                //         </>
                //     )}
                //     {(row.original.status === 'DRAFT' || row.original.status === 'PENDING') && (
                //         <TableIconButton color="danger" size="md" icon={<FaBan />} tooltip="Cancelar" />
                //     )}
                // </TableIconButton.Group>
                // )
                actions.push({
                    id: "view",
                    label: "Ver detalles",
                    icon: <IoEye />,
                    onClick: () => showInfoRequest(row)
                });
                return (
                    <Flex justify="center">
                        <DropdownButton
                            items={[{ label: "Acciones", options: actions }]}
                            rightIcon={<HiDotsVertical />}
                            size="sm"
                        />
                    </Flex>
                );
            },
            size: 100
        }
    ], []);

    const isProcessing = isLoading || isSubmittingMR || isCancelingMR || isRejectingMR || isApprovingMR ||
        isSubmittingST || isCancelingST || isRejectingST || isApprovingST ||
        isSubmittingMI || isCancelingMI || isRejectingMI || isApprovingMI ||
        isSubmittingIA || isCancelingIA || isRejectingIA || isApprovingIA;

    if (isProcessing) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Box
                $p="lg"
                $shadow
                rounded
                $fullWidth
                title="Solicitudes de ingreso de Material"
                bg="white"
                headerActions={
                    <>
                        {Object.keys(rowSelection).length > 0 ? <>
                            <ButtonGroup>
                                <Button onClick={() => null} variant="success" leftIcon={<FaCheck />}>Aprobar todos</Button>
                                <Button onClick={() => null} variant="danger" leftIcon={<FaBan />}>Rechazar todos</Button>
                            </ButtonGroup>
                        </> : null}
                    </>
                }
            >
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
                        searchValue={filter}
                        onSearchChange={setFilter}
                        onPageChange={setPage}
                        onPageSizeChange={setLimit}
                        enableRowSelection={(row) => (row?.original?.status === 'PENDING' || row?.original?.status === 'DRAFT')}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
                        getRowId={(row: any) => {
                            return row.code.toString();
                        }}
                    />
                )}
            </Box>
            <Aside
                isOpen={openAside}
                onClose={() => setOpenAside(false)}
                title="Detalles de la solicitud"
                subtitle={
                    <Flex align="center">
                        <Text variant="label" weight="medium" >{currentRequest?.reference} | {currentRequest?.code} </Text>
                        {currentRequest && <Badge variant={colorStatus(currentRequest?.status)}>{currentRequest?.status}</Badge>}
                    </Flex>
                }
                width="500px"
                footer={
                    (currentRequest?.status === 'PENDING' || currentRequest?.status === 'DRAFT') ? <Flex fullWidth justify="space-between">
                        <Button variant="success" fullWidth leftIcon={<FaCheck />} onClick={() => handleApproveRequest(currentRequest)}>
                            Approve
                        </Button>
                        <Button variant="outline" fullWidth leftIcon={<FaBan />} onClick={() => handleRejectRequest(currentRequest)}>
                            Reject
                        </Button>
                    </Flex> : null}
            >
                {currentRequest ? <DetailsRequest data={currentRequest} /> : <p>No hay detalles disponibles</p>}
                {/* <pre>{JSON.stringify(currentRequest, null, 2)}</pre> */}
            </Aside>
        </>
    );
};
export default RequestMaterial;