import React from 'react';
import { ReportedFailures, FailureReport } from './ReportedFailures';
import { Card } from '../../../../shared/components';

const sampleFailures: FailureReport[] = [
  {
    id: '1',
    code: 'HW-SP-003',
    title: 'Tarjeta lógica dañada',
    description: 'El cliente informa que el dispositivo se cayó y la pantalla se agrietó. El táctil funciona correctamente, pero el cristal está dañado. Se requiere reemplazo completo de la pantalla.',
    type: 'Hardware',
    priority: 'High',
    status: 'In Progress',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    ],
    reportedDate: '2024-01-15',
    assignedTechnician: 'Juan Pérez',
  },
  {
    id: '2',
    code: 'SW-APP-001',
    title: 'Aplicación se congela al iniciar',
    description: 'La aplicación principal se congela durante el proceso de carga inicial. El usuario debe forzar el cierre de la aplicación para poder continuar.',
    type: 'Software',
    priority: 'Medium',
    status: 'Open',
    images: [
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    ],
    reportedDate: '2024-01-14',
    assignedTechnician: 'María García',
  },
  {
    id: '3',
    code: 'NET-CONN-002',
    title: 'Pérdida intermitente de conexión',
    description: 'El dispositivo pierde conexión a internet de manera intermitente. El problema parece estar relacionado con la configuración de red WiFi.',
    type: 'Network',
    priority: 'Low',
    status: 'Resolved',
    reportedDate: '2024-01-13',
    assignedTechnician: 'Carlos Rodríguez',
  },
];

const ReportedFailuresExample: React.FC = () => {
  const handleEditFailure = (failure: FailureReport) => {
    console.log('Editar falla:', failure);
  };

  const handleConfigureFailure = (failure: FailureReport) => {
    console.log('Configurar falla:', failure);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>ReportedFailures Component Examples</h2>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Fallas Reportadas - Con Datos</h3>
        <ReportedFailures
          failures={sampleFailures}
          onEditFailure={handleEditFailure}
          onConfigureFailure={handleConfigureFailure}
        />
      </Card>

      <Card style={{ marginBottom: '24px' }}>
        <h3>Fallas Reportadas - Sin Datos</h3>
        <ReportedFailures
          failures={[]}
          onEditFailure={handleEditFailure}
          onConfigureFailure={handleConfigureFailure}
        />
      </Card>

      <Card>
        <h3>Fallas Reportadas - Una Sola Falla</h3>
        <ReportedFailures
          failures={[sampleFailures[0]]}
          onEditFailure={handleEditFailure}
          onConfigureFailure={handleConfigureFailure}
        />
      </Card>
    </div>
  );
};

export default ReportedFailuresExample;