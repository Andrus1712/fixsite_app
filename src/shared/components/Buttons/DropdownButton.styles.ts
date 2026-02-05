import styled from "styled-components";

export const DropdownButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const DropdownMenuWrapper = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  min-width: 200px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0)" : "translateY(-8px)"};
  transition: all 0.2s ease;
`;

export const DropdownMenuSection = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const DropdownMenuLabel = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.sm};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DropdownMenuItem = styled.button<{
  $isDanger?: boolean;
  $disabled?: boolean;
}>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  background-color: transparent;
  color: ${({ $isDanger, theme }) =>
    $isDanger ? theme.colors.error : theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.background};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary}20;
  }

  svg {
    font-size: 16px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const DropdownOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown - 1};
  opacity: 0;
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: visibility 0.2s ease;
`;
