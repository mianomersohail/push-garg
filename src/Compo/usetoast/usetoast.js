// src/hooks/useCustomToast.js
import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function useCustomToast() {
  const [toast, setToast] = useState({
    open: false,
    type: 'success', // 'success', 'error', 'warning', 'info'
    message: '',
  });

  const showToast = (type, message) => {
    setToast({ open: true, type, message });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setToast({ ...toast, open: false });
  };

  const ToastComponent = () => (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={toast.type} sx={{ width: '100%' }}>
        {toast.message}
      </Alert>
    </Snackbar>
  );

  return { showToast, ToastComponent };
}

export default useCustomToast;
