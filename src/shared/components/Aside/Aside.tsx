import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import {
  Overlay,
  AsideContainer,
  AsideHeader,
  AsideTitle,
  AsideBody,
  AsideFooter,
  CloseButton,
} from './Aside.styles';
import { Flex } from '../Layouts';

export interface AsideProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  closeOnOverlayClick?: boolean;
}

export const Aside: React.FC<AsideProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay $isOpen={isOpen} onClick={handleOverlayClick} />
      <AsideContainer $isOpen={isOpen} $width={width}>
        {title && (
          <AsideHeader>
            <Flex direction='column'>
              <AsideTitle>{title}</AsideTitle>
              {subtitle && <span>{subtitle}</span>}
            </Flex>
            <CloseButton onClick={onClose}>
              <IoClose size={20} />
            </CloseButton>
          </AsideHeader>
        )}
        <AsideBody>{children}</AsideBody>
        {footer && <AsideFooter>{footer}</AsideFooter>}
      </AsideContainer>
    </>,
    document.body
  );
};
