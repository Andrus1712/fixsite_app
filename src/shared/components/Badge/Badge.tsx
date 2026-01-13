import React from 'react';
import { BadgeContainer } from './Badge.styles';

export type BadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'default' | 'secondary' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Variante de estilo del badge */
  variant?: BadgeVariant;
  /** Contenido del badge */
  children: React.ReactNode;
}

/**
 * Componente Badge para mostrar estados y etiquetas
 * 
 * @example
 * <Badge variant="success">Activo</Badge>
 * <Badge variant="warning">Pendiente</Badge>
 * <Badge variant="danger">Error</Badge>
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  ...props
}) => {
  return (
    <BadgeContainer variant={variant} {...props}>
      {children}
    </BadgeContainer>
  );
};

export default Badge;
