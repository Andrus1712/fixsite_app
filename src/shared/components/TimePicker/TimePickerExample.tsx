import React, { useState } from 'react';
import { TimePicker } from './TimePicker';

export const TimePickerExample: React.FC = () => {
  const [singleTime, setSingleTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
      {/* TimePicker simple */}
      <TimePicker
        label="Hora de cita"
        value={singleTime}
        onChange={setSingleTime}
        format="12h"
      />

      {/* TimePicker de rango */}
      <TimePicker
        label="Horario de trabajo"
        mode="range"
        startTime={startTime}
        endTime={endTime}
        onRangeChange={(start, end) => {
          setStartTime(start);
          setEndTime(end);
        }}
        step={30}
      />

      {/* TimePicker con error */}
      <TimePicker
        label="Hora con error"
        value=""
        error="Debe seleccionar una hora"
      />

      {/* TimePicker deshabilitado */}
      <TimePicker
        label="Hora deshabilitada"
        value="14:30"
        disabled
      />

      {/* Valores seleccionados */}
      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
        <h4>Valores seleccionados:</h4>
        <p>Hora simple: {singleTime || 'No seleccionada'}</p>
        <p>Rango: {startTime && endTime ? `${startTime} - ${endTime}` : 'No seleccionado'}</p>
      </div>
    </div>
  );
};