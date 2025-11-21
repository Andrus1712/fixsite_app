import React from 'react';
import { StyledCard, CardHeader, CardBody, CardFooter } from './Card.styles';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'filled' | 'selected' | 'disabled';
  size?: 'xs'| 'sm' | 'md' | 'lg';
  padding?: 'none' | 'small' | 'medium' | 'large';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  size = 'md',
  padding = 'medium',
  header,
  footer,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      size={size}
      padding={padding}
      clickable={!!props.onClick}
      {...props}
    >
      {header && <CardHeader size={size}>{header}</CardHeader>}
      <CardBody size={size}>{children}</CardBody>
      {footer && <CardFooter size={size}>{footer}</CardFooter>}
    </StyledCard>
  );
};