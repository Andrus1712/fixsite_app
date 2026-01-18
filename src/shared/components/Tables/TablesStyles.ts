import styled from "styled-components";

export const TableContainer = styled.div`
    overflow-x: auto;
`;

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
`;

export const TableHead = styled.thead`
    background-color: #f8fafc;
`;

export const TableHeader = styled.th`
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    font-size: 12px;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #e5e7eb;
`;

export const TableRow = styled.tr`
    border-bottom: 1px solid #f3f4f6;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #f9fafb;
    }
`;

export const TableCell = styled.td`
    padding: 12px 16px;
    font-size: 14px;
    color: #374151;
`;

export const FooterCell = styled.td`
    padding: 16px;
    background-color: #f8fafc;
    border-top: 1px solid #e5e7eb;
`;

export const FooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
`;

export const InfoText = styled.span`
    font-size: 14px;
    color: #6b7280;
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 8px;
`;

export const PaginationButton = styled.button<{ disabled: boolean; }>`
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background-color: ${props => props.disabled ? '#f3f4f6' : 'white'};
    color: ${props => props.disabled ? '#9ca3af' : '#374151'};
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    transition: all 0.2s;
    
    &:hover:not(:disabled) {
        background-color: #f9fafb;
        border-color: #9ca3af;
    }
`;