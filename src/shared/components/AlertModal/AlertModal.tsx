import React from "react";
import styled, { css, keyframes } from "styled-components";
import { createPortal } from "react-dom";
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle } from "react-icons/fa";
import { Column } from "../Layouts";
import { Heading, Text } from "../Typography";
import { Button } from "../Buttons";

export interface AlertButton {
    label: string;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info" | "outline";
    icon?: React.ReactNode;
    onClick: () => void;
}

export interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttons: AlertButton[];
    type?: "success" | "warning" | "error" | "info" | "default";
    animation?: "fade" | "scale" | "slideDown";
    duration?: number;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.8);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div<{ duration: number }>`
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
  animation: ${fadeIn} ${(props) => props.duration}ms ease-out;
`;

const getAnimationStyles = (animation: string, duration: number) => {
    switch (animation) {
        case "scale":
            return css`animation: ${scaleIn} ${duration}ms ease-out;`;
        case "slideDown":
            return css`animation: ${slideDown} ${duration}ms ease-out;`;
        default:
            return css`animation: ${fadeIn} ${duration}ms ease-out;`;
    }
};

const AlertContainer = styled.div<{ animation: string; duration: number }>`
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  padding: 32px 24px 24px;
  text-align: center;
  
  ${(props) => getAnimationStyles(props.animation, props.duration)}
  
  @media (max-width: 640px) {
    max-width: 100%;
    margin: 0 16px;
  }
`;

const IconContainer = styled.div<{ type: string }>`
  font-size: 48px;
  margin-bottom: 16px;
  color: ${(props) => {
      switch (props.type) {
          case "success":
              return "#10b981";
          case "warning":
              return "#f59e0b";
          case "error":
              return "#ef4444";
          case "info":
              return "#3b82f6";
          default:
              return "#6b7280";
      }
  }};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
  
  @media (max-width: 640px) {
    flex-direction: column;
    
    button {
      width: 100%;
    }
  }
`;

const getIcon = (type: string) => {
    switch (type) {
        case "success":
            return <FaCheckCircle />;
        case "warning":
            return <FaExclamationTriangle />;
        case "error":
            return <FaTimesCircle />;
        case "info":
            return <FaInfoCircle />;
        default:
            return <FaInfoCircle />;
    }
};

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    buttons,
    type = "default",
    animation = "scale",
    duration = 300,
}) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <Overlay duration={duration} onClick={handleOverlayClick}>
            <AlertContainer animation={animation} duration={duration}>
                <IconContainer type={type}>{getIcon(type)}</IconContainer>

                <Column gap="sm" align="center">
                    <Heading level="h3" color="gray800">
                        {title}
                    </Heading>
                    <Text color="gray600" align="center">
                        {message}
                    </Text>
                </Column>

                <ButtonContainer>
                    {buttons.map((button, index) => (
                        <Button 
                            key={index} 
                            variant={button.variant || "primary"} 
                            leftIcon={button.icon}
                            onClick={button.onClick}
                        >
                            {button.label}
                        </Button>
                    ))}
                </ButtonContainer>
            </AlertContainer>
        </Overlay>,
        document.body
    );
};
