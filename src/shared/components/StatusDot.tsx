import styled, { css } from 'styled-components';

// 1. Definimos los tipos de variantes permitidas
type StatusVariant = 'active' | 'inactive' | 'away' | 'busy';

// 2. Definimos la interfaz de las props
interface DotProps {
    variant?: StatusVariant; // El '?' es por si no envías ninguna, que no explote
}

const statusColors: Record<StatusVariant, string> = {
    active: '#2ecc71',
    inactive: '#e74c3c',
    away: '#f1c40f',
    busy: '#34495e'
};

// 3. Pasamos la interfaz al componente de styled
const StatusDot = styled.span<DotProps>`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  display: inline-block;
  
  /* Ahora TS sabe que props.variant es una de las llaves de statusColors */
  background-color: ${props => statusColors[props.variant || 'inactive']};

  ${props => props.variant === 'active' && css`
    box-shadow: 0 0 0 rgba(46, 204, 113, 0.4);
    animation: pulse 4s infinite;
  `}

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(46, 204, 113, 0); }
    100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0); }
  }
`;

export default StatusDot;