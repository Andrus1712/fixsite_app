import styled from "styled-components";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StockError {
    article_id: number;
    required: number;
    available: number;
}

interface StockErrorTableProps {
    errors: StockError[];
    articleNames: Map<number, string>;
}

// ─── Styled Components ────────────────────────────────────────────────────────

const Container = styled.div`
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.error};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background-color: ${(props) => props.theme.colors.errorLight};
  overflow: hidden;
`;

const Title = styled.p`
  margin: 0;
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  color: ${(props) => props.theme.colors.errorDark};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${(props) => props.theme.fontSize.sm};
`;

const TableHead = styled.thead`
  background-color: ${(props) => props.theme.colors.errorDark};
  color: ${(props) => props.theme.colors.textInverse};

  th {
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.md};
    text-align: left;
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    font-size: ${(props) => props.theme.fontSize.xs};
    text-transform: uppercase;
    letter-spacing: 0.3px;

    &:nth-child(2),
    &:nth-child(3) {
      text-align: center;
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid ${(props) => props.theme.colors.error}33;

    &:last-child {
      border-bottom: none;
    }
  }

  td {
    padding: ${(props) => props.theme.spacing.xs} ${(props) => props.theme.spacing.md};
    color: ${(props) => props.theme.colors.errorDark};

    &:nth-child(2),
    &:nth-child(3) {
      text-align: center;
      font-weight: ${(props) => props.theme.fontWeight.medium};
    }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

export function StockErrorTable({ errors, articleNames }: StockErrorTableProps) {
    if (errors.length === 0) {
        return null;
    }

    return (
        <Container role="alert" aria-label="Stock insuficiente">
            <Title>Stock insuficiente para completar la solicitud</Title>
            <Table>
                <TableHead>
                    <tr>
                        <th>Artículo</th>
                        <th>Cantidad requerida</th>
                        <th>Cantidad disponible</th>
                    </tr>
                </TableHead>
                <TableBody>
                    {errors.map((error) => (
                        <tr key={error.article_id}>
                            <td>{articleNames.get(error.article_id) ?? `Artículo #${error.article_id}`}</td>
                            <td>{error.required}</td>
                            <td>{error.available}</td>
                        </tr>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}

export default StockErrorTable;
