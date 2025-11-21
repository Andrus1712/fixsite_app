import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { StyledCard, CardBody } from "./Card.styles";

const StyledCollapsibleCard = styled(StyledCard)`
  min-height: auto;
  height: auto;
  width: 100%;
  max-width: none;
  min-width: 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
`;

const CardHeader = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f9fafb;
  border-bottom: ${(props) => (props.$expanded ? "1px solid #e5e7eb" : "none")};
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f3f4f6;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FallaTitle = styled.span`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;

const Badge = styled.span<{ $variant: "critica" | "alta" | "media" | "baja" }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${(props) => {
      switch (props.$variant) {
          case "critica":
              return css`
          background-color: #fee2e2;
          color: #dc2626;
        `;
          case "alta":
              return css`
          background-color: #fef3c7;
          color: #d97706;
        `;
          case "media":
              return css`
          background-color: #dbeafe;
          color: #2563eb;
        `;
          case "baja":
              return css`
          background-color: #d1fae5;
          color: #059669;
        `;
          default:
              return css`
          background-color: #f3f4f6;
          color: #6b7280;
        `;
      }
  }}
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #6b7280;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const CollapsibleContent = styled.div<{ $expanded: boolean }>`
  overflow: hidden;
  transition: all 0.3s ease;
  
  ${(props) =>
      props.$expanded
          ? css`
    max-height: 1000px;
    opacity: 1;
  `
          : css`
    max-height: 0;
    opacity: 0;
  `}
`;

interface CollapsibleCardProps {
    children: React.ReactNode;
    title: string;
    badge?: {
        text: string;
        variant: "critica" | "alta" | "media" | "baja";
    };
    defaultExpanded?: boolean;
    onDelete?: () => void;
    className?: string;
    onToggle?: (expanded: boolean) => void;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
    children,
    title,
    badge,
    defaultExpanded = false,
    onDelete,
    className,
    onToggle,
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleToggle = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onToggle?.(newExpanded);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.();
    };

    return (
        <StyledCollapsibleCard variant="default" size="md" padding="none" clickable={false} className={className}>
            <CardHeader $expanded={isExpanded} onClick={handleToggle}>
                <HeaderLeft>
                    <FallaTitle>{title}</FallaTitle>
                    {badge && <Badge $variant={badge.variant}>{badge.text}</Badge>}
                </HeaderLeft>

                <HeaderRight>
                    {onDelete && (
                        <ActionButton onClick={handleDelete}>
                            <FiTrash2 size={16} />
                        </ActionButton>
                    )}
                    <ActionButton>{isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}</ActionButton>
                </HeaderRight>
            </CardHeader>

            <CollapsibleContent $expanded={isExpanded}>
                <CardBody padding="large" size="md">{children}</CardBody>
            </CollapsibleContent>
        </StyledCollapsibleCard>
    );
};

export default CollapsibleCard;
