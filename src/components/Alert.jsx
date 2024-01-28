import { Snackbar } from '@mui/material';
import React from 'react';

const Alert = ({openAlert,onClose,message}) => {


    return (
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={onClose}
          message={message}
        />
    )
}

export default Alert;