import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Toast = ({ open, text, type, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={type || 'info'} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
