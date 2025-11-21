import React, { useState } from 'react';
import { Modal } from './Modal';
import Button from '../Buttons/Button';

export const ModalExample: React.FC = () => {
  const [isSmallOpen, setIsSmallOpen] = useState(false);
  const [isMediumOpen, setIsMediumOpen] = useState(false);
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '2rem', flexWrap: 'wrap' }}>
      {/* Botones para abrir modales */}
      <Button onClick={() => setIsSmallOpen(true)} size="sm">
        Modal Pequeño
      </Button>
      <Button onClick={() => setIsMediumOpen(true)} variant="info">
        Modal Mediano
      </Button>
      <Button onClick={() => setIsLargeOpen(true)} variant="success" size="lg">
        Modal Grande
      </Button>
      <Button onClick={() => setIsFormOpen(true)} variant="purple">
        Modal con Formulario
      </Button>

      {/* Modal pequeño */}
      <Modal
        isOpen={isSmallOpen}
        onClose={() => setIsSmallOpen(false)}
        title="Confirmación"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsSmallOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={() => setIsSmallOpen(false)}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>¿Estás seguro de que deseas eliminar este elemento?</p>
      </Modal>

      {/* Modal mediano */}
      <Modal
        isOpen={isMediumOpen}
        onClose={() => setIsMediumOpen(false)}
        title="Información del Usuario"
        size="md"
      >
        <div>
          <h4>Detalles del Usuario</h4>
          <p><strong>Nombre:</strong> Juan Pérez</p>
          <p><strong>Email:</strong> juan@example.com</p>
          <p><strong>Teléfono:</strong> +1 234 567 8900</p>
          <p><strong>Dirección:</strong> Calle Principal 123, Ciudad</p>
        </div>
      </Modal>

      {/* Modal grande */}
      <Modal
        isOpen={isLargeOpen}
        onClose={() => setIsLargeOpen(false)}
        title="Dashboard de Estadísticas"
        size="lg"
        footer={
          <Button onClick={() => setIsLargeOpen(false)}>
            Cerrar
          </Button>
        }
      >
        <div>
          <h4>Métricas del Sistema</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
              <h5>Usuarios Activos</h5>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>1,234</p>
            </div>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
              <h5>Ventas del Mes</h5>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>$45,678</p>
            </div>
            <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
              <h5>Órdenes Pendientes</h5>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>89</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal con formulario */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Crear Nuevo Usuario"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsFormOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsFormOpen(false)}>
              Guardar
            </Button>
          </>
        }
      >
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Nombre completo
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              placeholder="Ingresa el nombre completo"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
              placeholder="usuario@ejemplo.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Rol
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px'
              }}
            >
              <option value="">Seleccionar rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="viewer">Visualizador</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};