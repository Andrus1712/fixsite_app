import { useMemo, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
    type ColumnDef,
    type RowSelectionState,
    type OnChangeFn,
    type Row,
    type SortingState,
} from "@tanstack/react-table";

import {
    TableWrapper,
    ControlsRow,
    LeftControls,
    RightControls,
    PerPageSelect,
    TableContainer,
    TableScroll,
    StyledTable,
    TableHead,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    InfoText,
    PaginationGroup,
    PaginationButton,
    EmptyMessage,
    EmptyTitle,
    EmptyDescription,
    SearchInput,
    ResizeHandle,
} from "./TablesStyles";

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];

    pageSizeOptions?: number[];
    initialPageSize?: number;

    serverSide?: boolean;
    page?: number; // 1-based
    total?: number;
    totalPages?: number;

    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    onSortingChange?: (sorting: SortingState) => void;

    enableRowSelection?: boolean | ((row: Row<T>) => boolean);
    rowSelection?: RowSelectionState;
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    getRowId?: (row: T, index: number) => string;
}

export default function DataTable<T>({
    data,
    columns,
    pageSizeOptions = [10, 25, 50, 100],
    initialPageSize = 25,
    serverSide = false,
    page,
    total,
    totalPages,
    searchValue,
    onSearchChange,
    onPageChange,
    onPageSizeChange,
    onSortingChange,
    enableRowSelection = false,
    rowSelection,
    onRowSelectionChange,
    getRowId,
}: DataTableProps<T>) {
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [internalRowSelection, setInternalRowSelection] =
        useState<RowSelectionState>({});
    const [pageSize, setPageSize] = useState(initialPageSize);

    const currentRowSelection = rowSelection ?? internalRowSelection;

    const filteredData = useMemo(() => {
        if (serverSide) return data ?? [];
        if (!globalFilter) return data ?? [];

        const q = globalFilter.toLowerCase();

        return (data ?? []).filter((row) =>
            Object.values(row as Record<string, unknown>)
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [data, globalFilter, serverSide]);

    const pageIndex = serverSide ? (page ? page - 1 : 0) : undefined;

    const table = useReactTable({
        data: filteredData,
        columns,
        state: {
            sorting,
            rowSelection: currentRowSelection,
            pagination: serverSide
                ? { pageIndex: pageIndex ?? 0, pageSize }
                : { pageIndex: 0, pageSize },
        },
        manualPagination: serverSide,
        manualSorting: serverSide,
        pageCount: serverSide
            ? totalPages ?? Math.ceil((total ?? 0) / pageSize)
            : undefined,
        enableRowSelection,
        onRowSelectionChange:
            onRowSelectionChange ?? setInternalRowSelection,
        getRowId,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),

        onSortingChange: (updater) => {
            const next =
                typeof updater === "function"
                    ? updater(sorting)
                    : updater;

            setSorting(next);

            if (serverSide && onSortingChange) {
                onSortingChange(next);
            }
        },

        onPaginationChange: (updater) => {
            if (!serverSide) return;

            const next =
                typeof updater === "function"
                    ? updater({ pageIndex: pageIndex ?? 0, pageSize })
                    : updater;

            onPageChange?.(next.pageIndex + 1);
        },
    });

    const totalCount = serverSide
        ? total ?? 0
        : filteredData.length;

    const start =
        totalCount === 0
            ? 0
            : (pageIndex ?? table.getState().pagination.pageIndex) *
            pageSize +
            1;

    const end = Math.min(
        (pageIndex ?? table.getState().pagination.pageIndex + 1) *
        pageSize,
        totalCount
    );

    const hasData = totalCount > 0;

    return (
        <TableWrapper>
            <ControlsRow>
                <LeftControls>
                    <PerPageSelect
                        value={pageSize}
                        onChange={(e) => {
                            const size = Number(e.target.value);
                            setPageSize(size);
                            table.setPageSize(size);
                            onPageSizeChange?.(size);
                            if (serverSide) onPageChange?.(1);
                        }}
                    >
                        {pageSizeOptions.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </PerPageSelect>
                </LeftControls>

                <RightControls>
                    <SearchInput
                        type="text"
                        value={serverSide ? searchValue ?? "" : globalFilter}
                        onChange={(e) =>
                            serverSide
                                ? onSearchChange?.(e.target.value)
                                : setGlobalFilter(e.target.value)
                        }
                        placeholder="Search..."
                    />
                </RightControls>
            </ControlsRow>

            {!hasData ? (
                <EmptyMessage>
                    <EmptyTitle>No records found</EmptyTitle>
                    <EmptyDescription>
                        There is no data available at the moment.
                    </EmptyDescription>
                </EmptyMessage>
            ) : (
                <TableContainer>
                    <TableScroll>
                        <StyledTable>
                            <TableHead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHeader
                                                key={header.id}
                                                width={header.getSize()}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}

                                                {header.column.getCanResize() && (
                                                    <ResizeHandle
                                                        isResizing={header.column.getIsResizing()}
                                                        onMouseDown={header.getResizeHandler()}
                                                        onTouchStart={header.getResizeHandler()}
                                                    />
                                                )}
                                            </TableHeader>
                                        ))}
                                    </tr>
                                ))}
                            </TableHead>

                            <TableBody>
                                {table.getRowModel().rows.map((row) => {
                                    const canSelect =
                                        typeof enableRowSelection === "function"
                                            ? enableRowSelection(row)
                                            : enableRowSelection;

                                    return (
                                        <TableRow
                                            key={row.id}
                                            onClick={() =>
                                                canSelect && row.toggleSelected()
                                            }
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    style={{ width: cell.column.getSize() }}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </StyledTable>
                    </TableScroll>

                    <TableFooter>
                        <InfoText>
                            Showing {start} to {end} of {totalCount} entries
                        </InfoText>

                        <PaginationGroup>
                            <PaginationButton
                                disabled={(pageIndex ?? 0) === 0}
                                onClick={() =>
                                    serverSide
                                        ? onPageChange?.(1)
                                        : table.setPageIndex(0)
                                }
                            >
                                {"<<"}
                            </PaginationButton>

                            <PaginationButton
                                disabled={(pageIndex ?? 0) === 0}
                                onClick={() =>
                                    serverSide
                                        ? onPageChange?.((pageIndex ?? 0))
                                        : table.previousPage()
                                }
                            >
                                {"<"}
                            </PaginationButton>

                            <PaginationButton
                                disabled={
                                    (pageIndex ?? 0) >=
                                    (table.getPageCount() - 1)
                                }
                                onClick={() =>
                                    serverSide
                                        ? onPageChange?.((pageIndex ?? 0) + 2)
                                        : table.nextPage()
                                }
                            >
                                {">"}
                            </PaginationButton>

                            <PaginationButton
                                disabled={
                                    (pageIndex ?? 0) >=
                                    (table.getPageCount() - 1)
                                }
                                onClick={() =>
                                    serverSide
                                        ? onPageChange?.(table.getPageCount())
                                        : table.setPageIndex(
                                            table.getPageCount() - 1
                                        )
                                }
                            >
                                {">>"}
                            </PaginationButton>
                        </PaginationGroup>
                    </TableFooter>
                </TableContainer>
            )}
        </TableWrapper>
    );
}