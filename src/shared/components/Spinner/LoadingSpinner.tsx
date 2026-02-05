import { SpinnerCircle, SpinnerOverlay, TextoCarga } from "./SpinnerStyles";

const LoadingSpinner = ({ mensaje }: { mensaje?: string }) => {
  return (
    <SpinnerOverlay>
      <SpinnerCircle />
      {mensaje && <TextoCarga>{mensaje}</TextoCarga>}
    </SpinnerOverlay>
  );
};

export default LoadingSpinner;
