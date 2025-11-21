import React from 'react';
import { Card } from './Card';

// Ejemplo de uso del componente Card
export const CardExample: React.FC = () => {
  return (
    <div style={{ display: 'grid', gap: '1rem', padding: '1rem' }}>
      {/* Card pequeña */}
      <Card size="sm">
        <h3>Card Pequeña</h3>
        <p>Contenido compacto.</p>
      </Card>

      {/* Card mediana (default) */}
      <Card
        header={<h3>Card Mediana</h3>}
        footer={<button>Acción</button>}
      >
        <p>Esta es una card de tamaño mediano con header y footer.</p>
      </Card>

      {/* Card grande */}
      <Card
        size="lg"
        variant="elevated"
        onClick={() => alert('Card grande clickeada!')}
      >
        <h3>Card Grande</h3>
        <p>Esta card es grande, clickeable y tiene sombra elevada. Perfecta para contenido más extenso.</p>
      </Card>

      {/* Comparación de tamaños */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Card size="sm" variant="outlined">
          <h3>Pequeña</h3>
          <p>Compacta</p>
        </Card>
        <Card size="md" variant="outlined">
          <h3>Mediana</h3>
          <p>Estándar</p>
        </Card>
        <Card size="lg" variant="outlined">
          <h3>Grande</h3>
          <p>Espaciosa para más contenido</p>
        </Card>
      </div>
    </div>
  );
};