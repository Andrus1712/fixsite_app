import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TimeInput = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${props => props.hasError ? '#ef4444' : '#d1d5db'};
  background-color: white;
  color: #374151;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#ef4444' : '#3b82f6'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)'};
  }
  
  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    border-color: ${props => props.hasError ? '#ef4444' : '#9ca3af'};
  }
`;

export const RangeConnector = styled.span`
  color: #6b7280;
  font-weight: 500;
  flex-shrink: 0;
`;

export const ErrorText = styled.span`
  font-size: 12px;
  color: #ef4444;
  margin-top: 4px;
`;