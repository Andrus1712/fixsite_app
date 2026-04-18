import styled from "styled-components";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
`;

export const ControlsRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftControls = styled.div`
  display: flex;
  gap: 8px;
`;

export const RightControls = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PerPageSelect = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  min-height: 36px;
`;

export const SearchInput = styled.input`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  min-height: 36px;
  width: 100%;
`;

export const TableContainer = styled.div`
  border-radius: 12px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  background: ${(p) => p.theme.colors.white};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const TableScroll = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export const TableHead = styled.thead`
  background: ${(p) => p.theme.colors.gray50};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const TableHeader = styled.th<{ width: number; }>`
  position: relative;
  width: ${(p) => p.width}px;
  padding: 12px 14px;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
  border-bottom: 1px solid ${(p) => p.theme.colors.gray200};
`;

export const ResizeHandle = styled.div<{ isResizing: boolean; }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 100%;
  cursor: col-resize;
  user-select: none;
  touch-action: none;

  background: ${(p) =>
    p.isResizing ? p.theme.colors.primary : "transparent"};

  transition: background 0.15s ease;

  &:hover {
    background: ${(p) => p.theme.colors.primary};
  }
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  table-layout: auto;
  min-width: 600px;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${(p) => p.theme.colors.gray100};

  &:hover {
    background: ${(p) => p.theme.colors.gray50};
  }
`;

export const TableCell = styled.td`
  padding: 12px 14px;
  font-size: 13px;
`;

export const FooterCell = styled.td`
  padding: 10px 16px;
  background: ${(p) => p.theme.colors.gray50};
  border-top: 1px solid ${(p) => p.theme.colors.gray100};
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid ${(p) => p.theme.colors.gray200};
  background: ${(p) => p.theme.colors.gray50};
  flex-wrap: wrap;
  gap: 8px;
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
  color: ${(p) => p.theme.colors.gray600};
`;

export const PaginationGroup = styled.div`
  display: flex;
  gap: 6px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const PaginationButton = styled.button<{ disabled?: boolean; }>`
  min-width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme.colors.gray200};
  background: ${(p) =>
    p.disabled ? p.theme.colors.gray100 : p.theme.colors.white};
  cursor: ${(p) => (p.disabled ? "not-allowed" : "pointer")};

  &:hover:not(:disabled) {
    background: ${(p) => p.theme.colors.gray100};
  }
`;

export const EmptyMessage = styled.div`
  padding: 64px 24px;
  text-align: center;
  border: 1px dashed ${(p) => p.theme.colors.gray200};
  border-radius: 12px;
`;

export const EmptyIcon = styled.div`
  font-size: 40px;
  margin-bottom: 8px;
`;

export const EmptyTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const EmptyDescription = styled.p`
  font-size: 14px;
  color: ${(p) => p.theme.colors.gray500};
`;