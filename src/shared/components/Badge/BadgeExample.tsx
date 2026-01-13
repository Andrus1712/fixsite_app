import React from 'react';
import styled from 'styled-components';
import Badge from './Badge';

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const VariantRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const Label = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  min-width: 120px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BadgeExample: React.FC = () => {
  const variants = ['success', 'info', 'warning', 'danger', 'default', 'secondary', 'outline'] as const;

  return (
    <ExampleContainer>
      <h2>Badge Component</h2>
      
      {variants.map((variant) => (
        <VariantRow key={variant}>
          <Label>{variant}</Label>
          <Badge variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Badge>
          <Badge variant={variant}>Completed</Badge>
          <Badge variant={variant}>In Progress</Badge>
        </VariantRow>
      ))}
    </ExampleContainer>
  );
};

export default BadgeExample;
