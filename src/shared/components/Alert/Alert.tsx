import { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";

type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
    id: string;
    type: AlertType;
    title?: string;
    message: string;
    duration?: number;
    onClose: (id: string) => void;
}

const slideIn = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const getAlertStyles = (type: AlertType) => {
    switch (type) {
        case "success":
            return css`
                background-color: #f0f9ff;
                border-color: #10b981;
                color: #065f46;
            `;
        case "error":
            return css`
                background-color: #fef2f2;
                border-color: #ef4444;
                color: #991b1b;
            `;
        case "warning":
            return css`
                background-color: #fffbeb;
                border-color: #f59e0b;
                color: #92400e;
            `;
        case "info":
            return css`
                background-color: #eff6ff;
                border-color: #3b82f6;
                color: #1e40af;
            `;
    }
};

const AlertContainer = styled.div<{ type: AlertType }>`
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    min-width: 320px;
    max-width: 480px;
    animation: ${slideIn} 0.3s ease-out;
    
    ${props => getAlertStyles(props.type)}
`;

const IconContainer = styled.div`
    flex-shrink: 0;
    font-size: 18px;
`;

const Content = styled.div`
    flex: 1;
`;

const Title = styled.h4`
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
`;

const Message = styled.p`
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    color: inherit;
    opacity: 0.7;
    transition: opacity 0.2s;
    
    &:hover {
        opacity: 1;
    }
`;

const getIcon = (type: AlertType) => {
    switch (type) {
        case "success":
            return <FaCheckCircle />;
        case "error":
            return <FaTimesCircle />;
        case "warning":
            return <FaExclamationTriangle />;
        case "info":
            return <FaInfoCircle />;
    }
};

export default function Alert({ 
    id, 
    type, 
    title, 
    message, 
    duration = 5000, 
    onClose 
}: AlertProps) {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose(id);
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    return (
        <AlertContainer type={type}>
            <IconContainer>
                {getIcon(type)}
            </IconContainer>
            <Content>
                {title && <Title>{title}</Title>}
                <Message>{message}</Message>
            </Content>
            <CloseButton onClick={() => onClose(id)}>
                <FaTimes size={14} />
            </CloseButton>
        </AlertContainer>
    );
}