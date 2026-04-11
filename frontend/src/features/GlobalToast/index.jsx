import React, { useEffect, useState, useCallback } from 'react';
import Toast from '../../components/Toast';
import { eventDispatcher } from '../../helper/eventDispatcher';

const GlobalToast = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastConfig, setToastConfig] = useState({ text: '', type: 'info' });

  useEffect(() => {
    const unsubscribe = eventDispatcher.on('toast', (data) => {
      setToastConfig({
        text: data.text || 'Notification',
        type: data.type || 'info',
      });
      setToastOpen(true);
    });

    return unsubscribe;
  }, []);

  const handleClose = useCallback(() => setToastOpen(false), []);

  return (
    <Toast
      open={toastOpen}
      text={toastConfig.text}
      type={toastConfig.type}
      onClose={handleClose}
    />
  );
};

export default GlobalToast;
