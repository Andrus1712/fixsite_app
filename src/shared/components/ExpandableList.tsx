import { useState } from "react";
import styled from "styled-components";

interface ExpandableListProps {
    items: any[];
    displayField: string | string[];
    emptyText?: string;
}

const Container = styled.div`
    position: relative;
`;

const Item = styled.div`
    font-size: 12px;
    color: #374151;
    padding: 2px 0;
    line-height: 1.3;
`;

const ToggleButton = styled.button`
    background: none;
    border: none;
    color: #3b82f6;
    font-size: 11px;
    cursor: pointer;
    padding: 2px 4px;
    text-decoration: underline;
    
    &:hover {
        color: #2563eb;
    }
`;

const ExpandedList = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 200px;
    max-width: 300px;
    padding: 8px;
`;

export default function ExpandableList({ items, displayField, emptyText = "No items" }: ExpandableListProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const getDisplayText = (item: any) => {
        if (Array.isArray(displayField)) {
            return displayField.map(field => item[field]).filter(Boolean).join(' - ');
        }
        return item[displayField];
    };

    if (!items || items.length === 0) {
        return <Item>{emptyText}</Item>;
    }

    if (items.length === 1) {
        return <Item>{getDisplayText(items[0])}</Item>;
    }

    return (
        <Container>
            <Item>{getDisplayText(items[0])}</Item>
            <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Ver menos' : `+${items.length - 1} más`}
            </ToggleButton>
            {isExpanded && (
                <ExpandedList>
                    {items.map((item, index) => (
                        <Item key={index}>{getDisplayText(item)}</Item>
                    ))}
                </ExpandedList>
            )}
        </Container>
    );
}