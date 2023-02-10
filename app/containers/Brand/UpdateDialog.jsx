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
} from '@material-ui/core';
import validation from 'utils/validation';

import ImagesUpload from 'components/ImagesUpload';
import Button from 'components/Button';
import messages from './messages';

function UpdateDialog(props) {
  const {
    intl,
    open,
    editMode,
    brand,
    onChangeDataField,
    onCancel,
    onAgree,
  } = props;
  const [validate, setValidate] = useState({});

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: brand,
        keys: ['name'],
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
                  <Grid item sm={8} xs={12}>
                    <TextField
                      required
                      id="brand-name"
                      label={intl.formatMessage(messages.name)}
                      variant="outlined"
                      value={brand.name && brand.name}
                      fullWidth
                      onChange={onChangeDataField('name')}
                      error={validate.name && validate.name.error}
                      helperText={
                        validate.name &&
                        intl.formatMessage(messages[validate.name.helperText])
                      }
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                    <ImagesUpload
                      images={brand.images}
                      onChangeImage={onChangeDataField('images')}
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
  brand: PropTypes.object,
  onChangeDataField: PropTypes.func,
  onCancel: PropTypes.func,
  onAgree: PropTypes.func,
};

export default memo(injectIntl(UpdateDialog));
