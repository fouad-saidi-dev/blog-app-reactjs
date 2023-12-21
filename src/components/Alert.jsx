import { Snackbar } from '@mui/material';
import React from 'react';

const Alert = (props) => {


    return (
        <Snackbar
          open={props.openAlert}
          autoHideDuration={6000}
          onClose={props.onClose}
          message={`${props.message}`}
        />
    )
}

export default Alert;