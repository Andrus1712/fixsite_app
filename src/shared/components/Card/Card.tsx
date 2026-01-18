import React from 'react';
import { StyledCard, CardHeader, CardBody, CardFooter } from './Card.styles';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled' | 'selected' | 'disabled';
  size?: 'xs'| 'sm' | 'md' | 'lg' | 'full';
  padding?: 'none' | 'small' | 'medium' | 'large';
  title?: string;
  subtitle?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'medium',
  title,
  subtitle,
  header,
  footer,
  ...props
}) => {
  // Si se pasa title o subtitle, crear un header automático
  const defaultHeader = (title || subtitle) ? (
    <div>
      {title && <h3 style={{ margin: 0, marginBottom: subtitle ? '4px' : 0 }}>{title}</h3>}
      {subtitle && <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>{subtitle}</p>}
    </div>
  ) : null;

  const headerContent = header || defaultHeader;

  return (
    <StyledCard
      variant={variant}
      size={size}
      padding={padding}
      clickable={!!props.onClick}
      {...props}
    >
      {headerContent && <CardHeader size={size}>{headerContent}</CardHeader>}
      <CardBody size={size}>{children}</CardBody>
      {footer && <CardFooter size={size}>{footer}</CardFooter>}
    </StyledCard>
  );
};