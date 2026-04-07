import styled from "styled-components";

export const ItemsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e5e7eb;
    }

    th {
        background-color: #f9fafb;
        font-weight: 600;
        font-size: 14px;
        color: #374151;
    }

    td {
        font-size: 14px;
        color: #1f2937;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody tr:hover {
        background-color: #f9fafb;
    }
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    margin-bottom: 16px;
    background: white;

    svg {
        color: #6b7280;
        flex-shrink: 0;
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 14px;
        
        &::placeholder {
            color: #9ca3af;
        }
    }
`;

export const ModalArticlesList = styled.div`
    max-height: 400px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    z-index: ${(props) => props.theme.zIndex.modal};
`;

export const ArticleItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s;
    gap: ${(props) => props.theme.spacing.md};

    &:hover {
        background-color: #f9fafb;
        border-color: #d1d5db;
    }
`;
