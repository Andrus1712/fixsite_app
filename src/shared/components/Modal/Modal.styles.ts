import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease-out;
`;

const getSizeStyles = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm':
      return css`
        max-width: 400px;
        width: 100%;
      `;
    case 'lg':
      return css`
        max-width: 800px;
        width: 100%;
      `;
    case 'xl':
      return css`
        max-width: 1200px;
        width: 100%;
      `;
    default:
      return css`
        max-width: 600px;
        width: 100%;
      `;
  }
};

export const ModalContainer = styled.div<{ size: 'sm' | 'md' | 'lg' | 'xl' }>`
  background: white;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  animation: ${slideIn} 0.2s ease-out;
  
  ${({ size }) => getSizeStyles(size)}
  
  @media (max-width: 640px) {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
  }
`;

export const ModalBody = styled.div<{ hasHeader: boolean; hasFooter: boolean }>`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  color: #374151;
  font-size: 14px;
  line-height: 1.5;
  
  ${({ hasHeader }) => !hasHeader && 'padding-top: 24px;'}
  ${({ hasFooter }) => !hasFooter && 'padding-bottom: 24px;'}
`;

export const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  background: #f9fafb;
  
  @media (max-width: 640px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;