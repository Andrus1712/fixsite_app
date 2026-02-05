import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import {
    ButtonGroup,
    TableContainer,
    FooterCell,
    FooterContent,
    InfoText,
    PaginationButton,
    StyledTable,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableWrapper,
    EmptyMessage,
    EmptyIcon,
    EmptyTitle,
    EmptyDescription,
} from "./TablesStyles";
import SearchInput from "../SearchInput";
import { Row } from "../Layouts";

interface DataTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    page?: number;
    total?: number;
    totalPages?: number;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    onPageChange?: (page: number) => void;
}

export default function SimpleTable<T>({
    data,
    columns,
    isLoading,
    page,
    total,
    totalPages,
    searchValue = "",
    onSearchChange,
    searchPlaceholder,
    onPageChange,
}: DataTableProps<T>) {
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <div>Loading...</div>;

    const hasData = data && data.length > 0;

    return (
        <TableWrapper>
            {onSearchChange && (
                <Row $align="center" $justify="flex-end">
                    <SearchInput value={searchValue} onChange={onSearchChange} placeholder={searchPlaceholder} />
                </Row>
            )}
            {!hasData ? (
                <EmptyMessage>
                    <div>
                        <EmptyIcon>📋</EmptyIcon>
                        <EmptyTitle>Sin registros</EmptyTitle>
                        <EmptyDescription>No hay registros para mostrar en este momento</EmptyDescription>
                    </div>
                </EmptyMessage>
            ) : (
                <TableContainer>
                    <StyledTable>
                    <TableHead>
                        {table.getHeaderGroups().map((hg) => (
                            <tr key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHeader key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                    <tfoot>
                        {page && total && totalPages && (
                            <tr>
                                <FooterCell colSpan={columns.length}>
                                    <FooterContent>
                                        <InfoText>
                                            Mostrando página {page} de {totalPages} • Total: {total} registros
                                        </InfoText>
                                        <ButtonGroup>
                                            <PaginationButton
                                                type="button"
                                                disabled={page === 1}
                                                onClick={() => onPageChange && onPageChange(page - 1)}
                                            >
                                                ← Anterior
                                            </PaginationButton>
                                            <PaginationButton
                                                type="button"
                                                disabled={page === totalPages}
                                                onClick={() => onPageChange && onPageChange(page + 1)}
                                            >
                                                Siguiente →
                                            </PaginationButton>
                                        </ButtonGroup>
                                    </FooterContent>
                                </FooterCell>
                            </tr>
                        )}
                    </tfoot>
                </StyledTable>
                </TableContainer>
            )}
        </TableWrapper>
    );
}
