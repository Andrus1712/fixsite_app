import styled, { keyframes } from "styled-components";

// Definimos la animación de rotación
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Contenedor que ocupa toda la pantalla (opcional, para bloqueo de carga)
export const SpinnerOverlay = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
`;

// El círculo del Spinner
export const SpinnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3; /* Color del fondo del círculo */
  border-top: 5px solid #3498db; /* Color de la parte que gira */
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export const TextoCarga = styled.p`
  margin-top: 15px;
  font-family: Arial, sans-serif;
  color: #333;
  font-weight: 500;
`;