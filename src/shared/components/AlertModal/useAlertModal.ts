import { useEffect, useState, useCallback, useContext } from 'react';
import type { AlertButton, AlertModalProps } from './AlertModal';

type AlertConfig = Omit<AlertModalProps, 'isOpen' | 'onClose'>;

export const useAlertModal = () => {
  const [queue, setQueue] = useState<AlertConfig[]>([]);
  const [alertConfig, setAlertConfig] = useState<AlertModalProps | null>(null);

  const closeAlert = useCallback(() => {
    setAlertConfig(null);
  }, []);

  useEffect(() => {
    if (!alertConfig && queue.length > 0) {
      const next = queue[0];
      setQueue(prev => prev.slice(1));
      setAlertConfig({
        ...next,
        isOpen: true,
        onClose: closeAlert,
      });
    }
  }, [queue, alertConfig, closeAlert]);

  const showAlert = (config: AlertConfig) => {
    setQueue(prev => [...prev, config]);
  };

  const showSuccess = (title: string, message: string, buttons: AlertButton[] | false) => {
    const resolvedButtons: AlertButton[] =
      buttons === false
        ? [
          {
            label: 'Cerrar',
            variant: 'outline',
            onClick: () => closeAlert(),
          },
        ]
        : buttons;
    showAlert({ title, message, buttons: resolvedButtons, type: 'success', animation: 'slideDown' });
  };

  const showWarning = (title: string, message: string, buttons: AlertButton[] | false) => {
    const resolvedButtons: AlertButton[] =
      buttons === false
        ? [
          {
            label: 'Cerrar',
            variant: 'outline',
            onClick: () => closeAlert(),
          },
        ]
        : buttons;
    showAlert({ title, message, buttons: resolvedButtons, type: 'warning', animation: 'slideDown' });
  };

  const showError = (title: string, message: string, buttons: AlertButton[] | false) => {
    const resolvedButtons: AlertButton[] =
      buttons === false
        ? [
          {
            label: 'Cerrar',
            variant: 'outline',
            onClick: () => closeAlert(),
          },
        ]
        : buttons;
    showAlert({ title, message, buttons: resolvedButtons, type: 'error', animation: 'slideDown' });
  };

  const showInfo = (title: string, message: string, buttons: AlertButton[] | false) => {
    const resolvedButtons: AlertButton[] =
      buttons === false
        ? [
          {
            label: 'Cerrar',
            variant: 'outline',
            onClick: () => closeAlert(),
          },
        ]
        : buttons;
    showAlert({ title, message, buttons: resolvedButtons, type: 'info', animation: 'slideDown' });
  };

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ) =>
    showAlert({
      title,
      message,
      type: 'warning',
      animation: 'slideDown',
      buttons: [
        {
          label: 'Cancelar',
          variant: 'outline',
          onClick: () => {
            onCancel?.();
            closeAlert();
          },
        },
        {
          label: 'Confirmar',
          variant: 'danger',
          onClick: () => {
            onConfirm();
            closeAlert();
          },
        },
      ],
    });

  return {
    showAlert,
    showSuccess,
    showWarning,
    showError,
    showInfo,
    showConfirm,
    closeAlert,
    alertProps: alertConfig,
  };
};
