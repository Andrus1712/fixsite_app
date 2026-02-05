import { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
} from "@tanstack/react-table";
import SearchInput from "../SearchInput";
import {
    TableWrapper,
    TableContainer,
    StyledTable,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
    TableFooter,
    ControlsRow,
    LeftControls,
    RightControls,
    PerPageSelect,
    ExportButton,
    PaginationNumbers,
    FooterCell,
    FooterContent,
    InfoText,
    PaginationButton,
    EmptyMessage,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
} from "./TablesStyles";
import IconButton from "../Buttons/IconButton";
import { FaFileExcel } from "react-icons/fa";
import { LuFileJson } from "react-icons/lu";
import {
    MdOutlineKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from "react-icons/md";
import { Tooltip } from "../Tooltip";

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    pageSizeOptions?: number[];
    initialPageSize?: number;
    onExportCSV?: (data: T[]) => void;
    onExportJSON?: (data: T[]) => void;
    onPageSizeChange?: (size: number) => void;
    // server-side pagination / filtering
    serverSide?: boolean;
    page?: number; // 1-based
    total?: number;
    totalPages?: number;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onPageChange?: (page: number) => void; // 1-based
    maxHeight?: string | number;
}

export default function DataTable<T>({
    data,
    columns,
    pageSizeOptions = [10, 25, 50, 100],
    initialPageSize = 25,
    onExportCSV,
    onExportJSON,
    serverSide = false,
    page,
    total,
    totalPages,
    searchValue: externalSearchValue,
    onSearchChange: externalOnSearchChange,
    onPageChange,
    onPageSizeChange,
    maxHeight,
}: DataTableProps<T>) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<any[]>([]);

    const [pageSize, setPageSize] = useState(initialPageSize);

    const filteredData = useMemo(() => {
        // if serverSide, data is already filtered/paginated by server
        if (serverSide) return data || [];
        if (!globalFilter) return data || [];
        const q = globalFilter.toLowerCase();
        return (data || []).filter((row) => JSON.stringify(row).toLowerCase().includes(q));
    }, [data, globalFilter, serverSide]);

    const table = useReactTable({
        data: filteredData,
        columns: columns as ColumnDef<T>[],
        state: {
            sorting,
            pagination: serverSide ? { pageIndex: page ? page - 1 : 0, pageSize: initialPageSize } : undefined,
        },
        onSortingChange: setSorting,
        manualPagination: serverSide,
        pageCount: serverSide ? (totalPages ?? Math.ceil((total ?? 0) / initialPageSize)) : undefined,
        initialState: { pagination: { pageSize: initialPageSize } },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: serverSide
            ? (updater) => {
                  // updater can be a function or object
                  const next = typeof updater === "function" ? updater(table.getState().pagination) : updater;
                  const nextIndex = next?.pageIndex ?? 0;
                  if (onPageChange) onPageChange(nextIndex + 1);
              }
            : undefined,
    });

    // Simple CSV exporter
    const exportCSV = () => {
        const rows = table
            .getRowModel()
            .rows.map((r) => r.getVisibleCells().map((c) => `${String(c.getValue() ?? "")}`));
        const header = table.getHeaderGroups()[0].headers.map((h) => `${String(h.column.columnDef.header as any)}`);
        const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
        if (onExportCSV) return onExportCSV(data);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "export.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    const exportJSON = () => {
        if (onExportJSON) return onExportJSON(data);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "export.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const hasData = data && data.length > 0;

    const pageIndex = serverSide ? (page ? page - 1 : 0) : (table.getState().pagination?.pageIndex ?? 0);
    const pageSizeState = serverSide ? initialPageSize : (table.getState().pagination?.pageSize ?? initialPageSize);
    const totalCount = serverSide ? (total ?? filteredData.length) : filteredData.length;
    const start = totalCount === 0 ? 0 : pageIndex * pageSizeState + 1;
    const end = Math.min((pageIndex + 1) * pageSizeState, totalCount);
    const pageCount = serverSide
        ? (totalPages ?? Math.max(1, Math.ceil(totalCount / pageSizeState)))
        : Math.max(1, table.getPageCount());

    return (
        <TableWrapper>
            <ControlsRow>
                <LeftControls>
                    <PerPageSelect
                        value={pageSize}
                        onChange={(e) => {
                            const v = Number(e.target.value);
                            setPageSize(v);
                            table.setPageSize(v);
                            if (serverSide && onPageSizeChange) onPageSizeChange(v);
                            // when serverSide, reset to page 1
                            if (serverSide && onPageChange) onPageChange(1);
                        }}
                    >
                        {pageSizeOptions.map((o) => (
                            <option key={o} value={o}>
                                {o} entries
                            </option>
                        ))}
                    </PerPageSelect>
                    <Tooltip content={"Export CSV"} position="right" fullWidth>
                        <IconButton
                            aria-label="Export CSV"
                            color="success"
                            icon={<FaFileExcel />}
                            size="sm"
                            onClick={exportCSV}
                        />
                    </Tooltip>
                    <Tooltip content={"Export JSON"} position="right" fullWidth>
                        <IconButton
                            aria-label="Export JSON"
                            color="neutral"
                            icon={<LuFileJson />}
                            size="sm"
                            onClick={exportJSON}
                        />
                    </Tooltip>
                </LeftControls>
                <RightControls>
                    <SearchInput
                        value={serverSide ? (externalSearchValue ?? "") : globalFilter}
                        onChange={(v) => {
                            if (serverSide) {
                                if (externalOnSearchChange) externalOnSearchChange(v);
                            } else {
                                setGlobalFilter(v);
                            }
                        }}
                        placeholder="Search..."
                    />
                </RightControls>
            </ControlsRow>

            {!hasData ? (
                <EmptyMessage>
                    <div>
                        <EmptyIcon>📋</EmptyIcon>
                        <EmptyTitle>Sin registros</EmptyTitle>
                        <EmptyDescription>No hay registros para mostrar en este momento</EmptyDescription>
                    </div>
                </EmptyMessage>
            ) : (
                <TableContainer maxHeight={maxHeight}>
                    <StyledTable>
                        <TableHead>
                            {table.getHeaderGroups().map((hg) => (
                                <tr key={hg.id}>
                                    {hg.headers.map((header) => (
                                        <TableHeader
                                            key={header.id}
                                            onClick={
                                                header.column.getToggleSortingHandler
                                                    ? header.column.getToggleSortingHandler()
                                                    : undefined
                                            }
                                            style={{
                                                cursor:
                                                    header.column.getCanSort && header.column.getCanSort()
                                                        ? "pointer"
                                                        : "default",
                                            }}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {/* sort indicator */}
                                            {header.column.getIsSorted && header.column.getIsSorted() ? (
                                                <span style={{ marginLeft: 8 }}>
                                                    {header.column.getIsSorted() === "asc" ? "↑" : "↓"}
                                                </span>
                                            ) : null}
                                        </TableHeader>
                                    ))}
                                </tr>
                            ))}
                        </TableHead>
                        <tbody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </tbody>
                        <TableFooter>
                            <tr>
                                <FooterCell colSpan={columns.length}>
                                    <FooterContent>
                                        <InfoText>
                                            Showing {start} to {end} of {totalCount} entries
                                        </InfoText>
                                        <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                            <PaginationNumbers>
                                                <PaginationButton
                                                    type="button"
                                                    aria-label="first-page"
                                                    disabled={pageIndex === 0}
                                                    onClick={() => {
                                                        if (serverSide) {
                                                            onPageChange?.(1);
                                                        } else {
                                                            table.setPageIndex(0);
                                                        }
                                                    }}
                                                >
                                                    <MdOutlineKeyboardDoubleArrowLeft size={18} />
                                                </PaginationButton>

                                                <PaginationButton
                                                    type="button"
                                                    aria-label="prev-page"
                                                    disabled={pageIndex === 0}
                                                    onClick={() => {
                                                        if (serverSide) {
                                                            const prev = Math.max(1, pageIndex);
                                                            onPageChange?.(prev);
                                                        } else {
                                                            table.setPageIndex(Math.max(0, pageIndex - 1));
                                                        }
                                                    }}
                                                >
                                                    <MdKeyboardArrowLeft size={18} />
                                                </PaginationButton>

                                                <PaginationButton
                                                    type="button"
                                                    aria-label="next-page"
                                                    disabled={pageIndex >= pageCount - 1}
                                                    onClick={() => {
                                                        if (serverSide) {
                                                            const next = Math.min(pageCount, pageIndex + 2);
                                                            onPageChange?.(next);
                                                        } else {
                                                            table.setPageIndex(Math.min(pageCount - 1, pageIndex + 1));
                                                        }
                                                    }}
                                                >
                                                    <MdKeyboardArrowRight size={18} />
                                                </PaginationButton>

                                                <PaginationButton
                                                    type="button"
                                                    aria-label="last-page"
                                                    disabled={pageIndex >= pageCount - 1}
                                                    onClick={() => {
                                                        if (serverSide) {
                                                            onPageChange?.(pageCount);
                                                        } else {
                                                            table.setPageIndex(pageCount - 1);
                                                        }
                                                    }}
                                                >
                                                    <MdKeyboardDoubleArrowRight size={18} />
                                                </PaginationButton>
                                            </PaginationNumbers>
                                        </div>
                                    </FooterContent>
                                </FooterCell>
                            </tr>
                        </TableFooter>
                    </StyledTable>
                </TableContainer>
            )}
        </TableWrapper>
    );
}
