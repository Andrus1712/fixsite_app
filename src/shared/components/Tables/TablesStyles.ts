import styled from 'styled-components';

// Wrapper for entire table + controls
export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
`;

export const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PerPageSelect = styled.select`
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.gray600};
  font-size: 13px;
`;

export const ExportButton = styled.button`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  background: ${(p) => p.theme.colors.white};
  color: ${(p) => p.theme.colors.gray800};
  font-weight: 600;
  cursor: pointer;
`;

export const PaginationNumbers = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-left: auto;
`;

export const TableContainer = styled.div<{ maxHeight?: string | number }>`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(16,24,40,0.04);
  background: ${(p) => p.theme.colors.white};
  /* when maxHeight is provided, make the container scrollable so the header/footer can stay sticky */
  ${(p) => (p.maxHeight ? `max-height: ${typeof p.maxHeight === 'number' ? `${p.maxHeight}px` : p.maxHeight}; overflow: auto;` : '')}
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
`;

export const TableHead = styled.thead`
  background: ${(p) => p.theme.colors.gray50};
  position: sticky;
  top: 0;
  z-index: 5;
  color: ${(p) => p.theme.colors.gray800};
`;

export const TableHeader = styled.th`
  padding: 10px 14px;
  text-align: left;
  font-weight: 700;
  font-size: 13px;
  color: ${(p) => p.theme.colors.gray800};
  position: relative;
  white-space: nowrap;
`;

export const TableRow = styled.tr`
  background: ${(p) => p.theme.colors.white};
  transition: background 0.12s ease;
  &:not(:last-child) td {
    border-bottom: 1px solid ${(p) => p.theme.colors.gray100};
  }
  &:hover {
    background: ${(p) => p.theme.colors.gray50};
  }
`;

export const TableCell = styled.td`
  padding: 12px 14px;
  font-size: 13px;
  color: ${(p) => p.theme.colors.gray800};
  vertical-align: middle;
  word-break: break-word;
`;

export const FooterCell = styled.td`
  padding: 10px 16px;
  background: ${(p) => p.theme.colors.gray50};
  border-top: 1px solid ${(p) => p.theme.colors.gray100};
`;

export const TableFooter = styled.tfoot`
  background: ${(p) => p.theme.colors.gray50};
  position: sticky;
  bottom: 0;
  z-index: 4;
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
`;

export const InfoText = styled.span`
  font-size: 13px;
  color: ${(p) => p.theme.colors.gray500};
  /* font-weight: 600; */
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 6px 10px;
  font-size: 13px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  border-radius: 6px;
  background: ${(p) => (p.disabled ? p.theme.colors.gray100 : p.theme.colors.white)};
  color: ${(p) => (p.disabled ? p.theme.colors.gray500 : p.theme.colors.gray800)};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.12s;
  min-width: 36px;
  text-align: center;
  &:hover:not(:disabled) {
    background: ${(p) => p.theme.colors.gray50};
  }
`;

export const EmptyMessage = styled.div`
  padding: 48px 24px;
  text-align: center;
  background: ${(p) => p.theme.colors.white};
  border: 1px dashed ${(p) => p.theme.colors.gray200};
  border-radius: 8px;
`;

export const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 8px;
`;

export const EmptyTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${(p) => p.theme.colors.gray800};
  margin: 0 0 6px 0;
`;

export const EmptyDescription = styled.p`
  font-size: 14px;
  color: ${(p) => p.theme.colors.textSecondary};
  margin: 0;
`;
