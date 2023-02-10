/**
 *
 * Update Dialog
 *
 */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { injectIntl, intlShape } from 'react-intl';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Tooltip,
} from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import validation from 'utils/validation';

import NumberFormatInput from 'components/NumberFormatInput';
import Button from 'components/Button';
import messages from './messages';

function UpdateDialog(props) {
  const {
    intl,
    open,
    editMode,
    giftCode,
    onChangeDataField,
    generateGiftCode,
    onCancel,
    onAgree,
  } = props;
  const [validate, setValidate] = useState({});
  const [prefix, setPrefix] = useState('');

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: giftCode,
        keys: ['code'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleCancelEdit = () => {
    setValidate({});
    onCancel();
  };

  const handleAgreeAction = () => {
    const noValidate = validateField();
    if (noValidate) {
      setValidate({});
      onAgree();
    }
  };

  const generateCode = () => {
    generateGiftCode({ prefix });
  };

  return (
    <Dialog
      open={open}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="scroll-dialog-title">
        {editMode
          ? intl.formatMessage(messages.edit)
          : intl.formatMessage(messages.add)}
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={3} alignItems="center">
                  {!editMode && (
                    <Grid container item xs={12}>
                      <Grid item xs={8}>
                        <TextField
                          id="prefix"
                          label={intl.formatMessage(messages.prefix)}
                          variant="outlined"
                          value={prefix}
                          fullWidth
                          onChange={event => setPrefix(event.target.value)}
                          inputProps={{
                            maxLength: '10',
                          }}
                        />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={4}
                        alignItems="center"
                        justify="center"
                      >
                        <Button
                          name="Tạo mã"
                          icon="add"
                          onClick={generateCode}
                          options={{ showIcon: false }}
                        />
                      </Grid>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      disabled={editMode}
                      required
                      id="code"
                      label={intl.formatMessage(messages.code)}
                      variant="outlined"
                      value={giftCode.code}
                      fullWidth
                      onChange={onChangeDataField('code')}
                      error={validate.code && validate.code.error}
                      helperText={
                        validate.code &&
                        intl.formatMessage(messages[validate.code.helperText])
                      }
                      inputProps={{
                        maxLength: '16',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="quantity"
                      label={intl.formatMessage(messages.quantity)}
                      value={giftCode.quantity}
                      onChange={onChangeDataField('quantity')}
                      InputProps={{
                        inputComponent: NumberFormatInput,
                        inputProps: {
                          maxLength: '11',
                          style: { textAlign: 'right' },
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Số lượng" placement="top">
                              <InfoIcon color="disabled" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="maxUsedPerUser"
                      label={intl.formatMessage(messages.maxUsedPerUser)}
                      value={giftCode.maxUsedPerUser}
                      onChange={onChangeDataField('maxUsedPerUser')}
                      InputProps={{
                        inputComponent: NumberFormatInput,
                        inputProps: {
                          maxLength: '13',
                          style: { textAlign: 'right' },
                        },
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip
                              title="Số lần sử dụng tối đa cho mỗi người"
                              placement="top"
                            >
                              <InfoIcon color="disabled" />
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={giftCode.isPublic}
                          onChange={onChangeDataField('isPublic')}
                          color="primary"
                        />
                      }
                      label={intl.formatMessage(messages.isPublic)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
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
          onClick={handleAgreeAction}
        />
      </DialogActions>
    </Dialog>
  );
}

UpdateDialog.propTypes = {
  intl: intlShape,
  open: PropTypes.bool,
  editMode: PropTypes.bool,
  giftCode: PropTypes.object,
  generateGiftCode: PropTypes.func,
  onChangeDataField: PropTypes.func,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(injectIntl(UpdateDialog));
