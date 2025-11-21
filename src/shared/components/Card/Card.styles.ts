import styled, { css } from 'styled-components';

interface StyledCardProps {
  variant: 'default' | 'outlined' | 'elevated' | 'filled' | 'selected' | 'disabled';
  size: 'xs' | 'sm' | 'md' | 'lg';
  padding: 'none' | 'small' | 'medium' | 'large';
  clickable: boolean;
}

interface CardSectionProps {
  size: 'xs' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

const paddingMap = {
  none: '0',
  small: '8px',
  medium: '16px',
  large: '24px',
};

const getSizeStyles = (size: 'xs' | 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'xs':
      return css`
        min-height: 100px;
        max-width: 200px;
      `;
    case 'sm':
      return css`
        min-height: 120px;
        max-width: 300px;
      `;
    case 'lg':
      return css`
        min-height: 200px;
        max-width: 600px;
      `;
    default:
      return css`
        min-height: 160px;
        max-width: 400px;
      `;
  }
};

export const StyledCard = styled.div<StyledCardProps>`
  background: white;
  border-radius: 6px;
  transition: all 0.2s;
  padding: ${({ padding }) => paddingMap[padding]};
  display: flex;
  flex-direction: column;
  width: 100%;
  
  ${({ size }) => getSizeStyles(size)}

  ${({ variant }) => {
    switch (variant) {
      case 'outlined':
        return css`
          border: 1px solid #d1d5db;
          &:hover {
            border-color: #9ca3af;
          }
        `;
      case 'selected':
        return css`
          border: 1px solid ${props => props.theme.colors.borderFocus};
          background: ${props => props.theme.colors.gray50};
          &:hover {
            border-color: ${props => props.theme.colors.primaryDark};
          }
        `;
      case 'elevated':
        return css`
          border: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
          &:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
          }
        `;
      case 'filled':
        return css`
          background: #3b82f6;
          border: 1px solid #3b82f6;
          color: white;
          
          h1, h2, h3, h4, h5, h6 {
            color: white;
          }
          
          &:hover {
            background: #2563eb;
            border-color: #2563eb;
          }
        `;
      case 'disabled':
        return css`
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          color: #9ca3af;

          h1, h2, h3, h4, h5, h6 {
            color: #9ca3af;
          }

          &:hover {
            background: #f3f4f6;
            border-color: #e5e7eb;
          }
        `;
      default:
        return css`
          border: 1px solid #e5e7eb;
        `;
    }
  }}

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-1px);
      }
      &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    `}
`;

export const CardHeader = styled.div<CardSectionProps>`
  margin-bottom: ${({ size }) => size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'lg' ? '20px' : '16px'};
  padding-bottom: ${({ size }) => size === 'xs' ? '6px' : size === 'sm' ? '8px' : '12px'};
  border-bottom: 1px solid #e5e7eb;
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: 600;
    color: #111827;
    font-size: ${({ size }) => size === 'xs' ? '12px' : size === 'sm' ? '14px' : size === 'lg' ? '18px' : '16px'};
  }
`;

export const CardBody = styled.div<CardSectionProps>`
  flex: 1;
  color: #374151;
  font-size: ${({ size }) => size === 'xs' ? '11px' : size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px'};
  padding: ${({ padding }) => paddingMap[padding]};
  line-height: 1.5;
`;

export const CardFooter = styled.div<CardSectionProps>`
  margin-top: ${({ size }) => size === 'xs' ? '6px' : size === 'sm' ? '8px' : size === 'lg' ? '20px' : '16px'};
  padding-top: ${({ size }) => size === 'xs' ? '6px' : size === 'sm' ? '8px' : '12px'};
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: ${({ size }) => size === 'xs' ? '4px' : size === 'sm' ? '6px' : '8px'};
  align-items: center;
  font-size: ${({ size }) => size === 'xs' ? '11px' : size === 'sm' ? '12px' : size === 'lg' ? '16px' : '14px'};
`;