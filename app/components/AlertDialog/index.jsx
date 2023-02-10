/**
 *
 * AlertDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from 'components/Button';

function AlertDialog({ open, title, description, onCancel, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          icon="cancel"
          options={{ showIcon: false }}
          onClick={onCancel}
          color="default"
        />
        <Button
          icon="agree"
          options={{ showIcon: false }}
          onClick={onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.defaultProps = {
  open: false,
  title: 'iSalon',
};

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

export default AlertDialog;
