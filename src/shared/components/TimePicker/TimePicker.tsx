import React, { useState } from 'react';
import { Container, Label, TimeInputWrapper, TimeInput, RangeConnector, ErrorText } from './TimePicker.styles';

export interface TimePickerProps {
  label?: string;
  value?: string;
  startTime?: string;
  endTime?: string;
  onChange?: (time: string) => void;
  onRangeChange?: (start: string, end: string) => void;
  mode?: 'single' | 'range';
  error?: string;
  disabled?: boolean;
  format?: '12h' | '24h';
  step?: number;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  startTime,
  endTime,
  onChange,
  onRangeChange,
  mode = 'single',
  error,
  disabled,
  format = '24h',
  step = 15,
}) => {
  const [internalStartTime, setInternalStartTime] = useState(startTime || '');
  const [internalEndTime, setInternalEndTime] = useState(endTime || '');

  const handleStartTimeChange = (time: string) => {
    setInternalStartTime(time);
    if (onRangeChange) {
      onRangeChange(time, internalEndTime);
    }
  };

  const handleEndTimeChange = (time: string) => {
    setInternalEndTime(time);
    if (onRangeChange) {
      onRangeChange(internalStartTime, time);
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += step) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayValue = format === '12h' 
          ? formatTo12Hour(timeValue)
          : timeValue;
        options.push({ value: timeValue, display: displayValue });
      }
    }
    return options;
  };

  const formatTo12Hour = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const timeOptions = generateTimeOptions();

  if (mode === 'range') {
    return (
      <Container>
        {label && <Label>{label}</Label>}
        <TimeInputWrapper>
          <TimeInput
            as="select"
            value={internalStartTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            disabled={disabled}
            hasError={!!error}
          >
            <option value="">Hora inicio</option>
            {timeOptions.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </TimeInput>
          <RangeConnector>-</RangeConnector>
          <TimeInput
            as="select"
            value={internalEndTime}
            onChange={(e) => handleEndTimeChange(e.target.value)}
            disabled={disabled}
            hasError={!!error}
          >
            <option value="">Hora fin</option>
            {timeOptions.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </TimeInput>
        </TimeInputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
      </Container>
    );
  }

  return (
    <Container>
      {label && <Label>{label}</Label>}
      <TimeInputWrapper>
        <TimeInput
          as="select"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          hasError={!!error}
        >
          <option value="">Seleccionar hora</option>
          {timeOptions.map(({ value, display }) => (
            <option key={value} value={value}>
              {display}
            </option>
          ))}
        </TimeInput>
      </TimeInputWrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};