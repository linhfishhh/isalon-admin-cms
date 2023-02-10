/**
 *
 * ReplyProductFAQ Dialog
 *
 */
import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import validation from 'utils/validation';
import Button from 'components/Button';

const useStyles = makeStyles(theme => ({}));

function AddNotificationDialog(props) {
  const { open, onCancel, onPush } = props;
  const [pushParams, setPushParams] = useState({});
  const [validate, setValidate] = useState({});

  const validateParams = params => {
    const option = [
      {
        type: 'empty',
        model: params,
        keys: ['title', 'body'],
        messages: ['Vui lòng nhập tiêu đề', 'Vui lòng nhập nội dung thông báo'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  useEffect(() => {
    if (open) {
      setPushParams({});
    }
  }, [open]);

  const handleCancelEdit = () => {
    onCancel();
  };

  const handlePushAction = () => {
    if (validateParams(pushParams)) {
      onPush(pushParams);
    }
  };

  const onCheckboxChange = (event, c) => {
    const p = { ...pushParams };
    set(p, 'isSaved', c);
    setPushParams(p);
  };

  const onInputChange = name => event => {
    const v = get(event, 'target.value');
    const p = { ...pushParams };
    set(p, name, v);
    setPushParams(p);
  };

  return (
    <Dialog open={open} scroll="paper" fullWidth maxWidth="sm">
      <DialogTitle>Gửi thông báo</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Tiêu đề"
              variant="outlined"
              margin="dense"
              fullWidth
              error={validate.title && validate.title.error}
              helperText={validate.title && validate.title.helperMessageText}
              onChange={onInputChange('title')}
              value={get(pushParams, 'title')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nội dung"
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={5}
              error={validate.body && validate.body.error}
              helperText={validate.body && validate.body.helperMessageText}
              onChange={onInputChange('body')}
              value={get(pushParams, 'body')}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={onCheckboxChange}
                  checked={get(pushParams, 'isSaved', true)}
                />
              }
              label="Lưu thông báo"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          icon="cancel"
          options={{ showIcon: false }}
          onClick={handleCancelEdit}
          color="default"
        />
        <Button
          icon="agree"
          options={{ showIcon: false }}
          onClick={handlePushAction}
        />
      </DialogActions>
    </Dialog>
  );
}

AddNotificationDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onPush: PropTypes.func,
};

export default memo(AddNotificationDialog);
