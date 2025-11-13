import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from "@tanstack/react-table";
import {
    ButtonGroup,
    Container,
    FooterCell,
    FooterContent,
    InfoText,
    PaginationButton,
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./TablesStyles";
import SearchInput from "../SearchInput";
import styled from "styled-components";

const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

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
}

export default function DataTable<T>({
    data,
    columns,
    isLoading,
    page,
    total,
    totalPages,
    searchValue = "",
    onSearchChange,
    searchPlaceholder,
}: DataTableProps<T>) {
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <div>Loading...</div>;

    return (
        <TableWrapper>
            {onSearchChange && (
                <SearchInput
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                />
            )}
            <Container>
                <Table>
                <TableHead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => (
                                <TableHeader key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
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
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
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
                                        Mostrando página {page} de {totalPages}{" "}
                                        • Total: {total} registros
                                    </InfoText>
                                    <ButtonGroup>
                                        <PaginationButton
                                            type="button"
                                            disabled={page === 1}
                                        >
                                            ← Anterior
                                        </PaginationButton>
                                        <PaginationButton
                                            type="button"
                                            disabled={page === totalPages}
                                        >
                                            Siguiente →
                                        </PaginationButton>
                                    </ButtonGroup>
                                </FooterContent>
                            </FooterCell>
                        </tr>
                    )}
                </tfoot>
            </Table>
        </Container>
        </TableWrapper>
    );
}
