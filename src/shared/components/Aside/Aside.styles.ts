import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => props.theme.zIndex.modal};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  animation: ${(props) => (props.$isOpen ? fadeIn : 'none')} 0.3s ease;
`;

export const AsideContainer = styled.aside<{ $isOpen: boolean; $width?: string }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: ${(props) => props.$width || '400px'};
  max-width: 90vw;
  background: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.xl};
  z-index: ${(props) => props.theme.zIndex.modal + 1};
  display: flex;
  flex-direction: column;
  transform: ${(props) => (props.$isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${(props) => (props.$isOpen ? slideIn : 'none')} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const AsideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.lg};
  border-bottom: 1px solid ${(props) => props.theme.colors.borderLight};
  background: ${(props) => props.theme.colors.gray50};
`;

export const AsideTitle = styled.h3`
  margin: 0;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: ${(props) => props.theme.fontWeight.semibold};
  color: ${(props) => props.theme.colors.text};
`;

export const AsideBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${(props) => props.theme.spacing.lg};
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.colors.gray300};
    border-radius: ${(props) => props.theme.borderRadius.full};
    
    &:hover {
      background: ${(props) => props.theme.colors.gray400};
    }
  }
`;

export const AsideFooter = styled.div`
  padding: ${(props) => props.theme.spacing.lg};
  border-top: 1px solid ${(props) => props.theme.colors.borderLight};
  background: ${(props) => props.theme.colors.gray50};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.gray600};
  border-radius: ${(props) => props.theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${(props) => props.theme.colors.gray200};
    color: ${(props) => props.theme.colors.gray800};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }
`;
