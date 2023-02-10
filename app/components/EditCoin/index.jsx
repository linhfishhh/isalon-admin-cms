/**
 *
 * EditCoinDialog
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import get from 'lodash/get';
import { numberFormat } from 'utils/stringFormat';

import NumberFormat from 'react-number-format';

const NumberFormatInput = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      allowNegative
    />
  );
};

NumberFormatInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function EditCoin(props) {
  const { data, onUpdateCoin, className } = props;

  const [open, setOpen] = React.useState(false);
  const [allowSubmit, setAllowSubmit] = React.useState(false);
  const [updateParams, setUpdateParams] = React.useState({});

  React.useEffect(() => {
    const { amountCoin, reason, amountMoney } = updateParams;
    const allow = !isEmpty(amountCoin) || !isEmpty(amountMoney);
    setAllowSubmit(allow && !isEmpty(reason));
  }, [updateParams]);

  const onEditCoin = React.useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setUpdateParams({});
    setOpen(false);
  }, []);

  const handleSubmit = () => {
    const { id } = data;
    if (onUpdateCoin) {
      onUpdateCoin({ id, ...updateParams });
    }
    handleClose();
  };

  const handleInputChange = name => event => {
    const params = { ...updateParams };
    const { value, checked } = event.target;
    set(params, name, value || checked);
    setUpdateParams(params);
  };

  return (
    <>
      <Button
        onClick={onEditCoin}
        color="primary"
        variant="contained"
        className={className}
      >
        Thêm giao dịch
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">{data.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Số xu hiện tại: ${numberFormat(
            get(data, 'currentCoin', 0),
          )}`}</DialogContentText>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                name="amountCoin"
                label="Số lượng xu * ( +/- )"
                fullWidth
                variant="outlined"
                onChange={handleInputChange('amountCoin')}
                value={get(updateParams, 'amountCoin')}
                InputProps={{
                  inputComponent: NumberFormatInput,
                  inputProps: {
                    maxLength: '12',
                  },
                }}
              />
            </Grid>
            {data.type === 'salon' && (
              <Grid item>
                <TextField
                  name="amountMoney"
                  label="Số lượng tiền * ( +/- )"
                  fullWidth
                  variant="outlined"
                  onChange={handleInputChange('amountMoney')}
                  value={get(updateParams, 'amountMoney')}
                  InputProps={{
                    inputComponent: NumberFormatInput,
                    inputProps: {
                      maxLength: '12',
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item>
              <TextField
                variant="outlined"
                name="reason"
                label="Lý do thay đổi *"
                multiline
                rows={5}
                fullWidth
                onChange={handleInputChange('reason')}
                placeholder="Nội dung sẽ được thông báo tới người dùng"
              />
            </Grid>
            {data.type === 'salon' && (
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={get(updateParams, 'isSettlement')}
                      onChange={handleInputChange('isSettlement')}
                      name="isSettlement"
                    />
                  }
                  label="Quyết toán với salon"
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!allowSubmit}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditCoin.defaultProps = {
  data: {
    type: 'salon',
    name: '',
    id: undefined,
    currentCoin: 0,
  },
  onUpdateCoin: () => {},
};

EditCoin.propTypes = {
  data: PropTypes.object,
  onUpdateCoin: PropTypes.func,
  className: PropTypes.string,
};

export default memo(EditCoin);
