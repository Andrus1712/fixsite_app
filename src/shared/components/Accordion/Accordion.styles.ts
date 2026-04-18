import styled, { css } from 'styled-components';

export const AccordionWrapper = styled.div<{ $depth: number }>`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme, $depth }) => $depth > 0 ? theme.borderRadius.md : theme.borderRadius.lg};
  overflow: hidden;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  ${({ $depth }) => $depth > 0 && css`
    border-color: ${({ theme }) => theme.colors.gray200};
  `}
`;

export const AccordionHeader = styled.div<{ $expanded: boolean; $depth: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme, $depth }) =>
    $depth > 0
      ? `${theme.spacing.xs} ${theme.spacing.md}`
      : `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: ${({ theme, $depth }) => $depth > 0 ? theme.colors.gray50 : theme.colors.surface};
  border-bottom: ${({ $expanded, theme }) => $expanded ? `1px solid ${theme.colors.border}` : 'none'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
  min-width: 0;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-shrink: 0;
`;

export const AccordionTitle = styled.span<{ $depth: number }>`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme, $depth }) => $depth > 0 ? theme.fontSize.sm : theme.fontSize.base};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChevronIcon = styled.span<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 0.2s ease;
  transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const AccordionBody = styled.div<{ $expanded: boolean }>`
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  ${({ $expanded }) =>
    $expanded
      ? css`max-height: 9999px; opacity: 1;`
      : css`max-height: 0; opacity: 0;`}
`;

export const AccordionContent = styled.div<{ $depth: number }>`
  padding: ${({ theme, $depth }) => $depth > 0 ? theme.spacing.sm : theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;
