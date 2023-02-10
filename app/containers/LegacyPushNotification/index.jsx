/**
 *
 * LegacyPushNotification
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Button as MuiButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import validation from 'utils/validation';
import Button from 'components/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLegacyPushNotification from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, TOAST_ACTION_TYPES } from './constants';
import { pushNotificationRequest } from './actions';
import { useInjectToast } from 'utils/injectToast';

export function LegacyPushNotification(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectToast(TOAST_ACTION_TYPES);

  const { onPush, className, salonId } = props;

  const [pushParams, setPushParams] = useState({ salonId });
  const [validate, setValidate] = useState({});

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setPushParams(prev => ({
      ...prev,
      salonId,
    }));
  }, [salonId]);

  const validateParams = params => {
    const option = [
      {
        type: 'empty',
        model: params,
        keys: ['title', 'content'],
        messages: ['Vui lòng nhập tiêu đề', 'Vui lòng nhập nội dung thông báo'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleCancelPush = () => {
    setOpen(false);
  };

  const handlePushAction = () => {
    if (validateParams(pushParams)) {
      onPush(pushParams);
      setOpen(false);
    }
  };

  const onInputChange = name => event => {
    const v = get(event, 'target.value');
    setPushParams(prev => ({
      ...prev,
      [name]: v,
    }));
  };

  const handleButtonClick = () => {
    setPushParams({ salonId });
    setOpen(true);
  };

  return (
    <>
      <MuiButton
        onClick={handleButtonClick}
        color="primary"
        variant="contained"
        className={className}
      >
        Gửi thông báo
      </MuiButton>
      <Dialog open={open} scroll="paper" fullWidth maxWidth="sm">
        <DialogTitle>Gửi thông báo</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Tiêu đề *"
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
                label="Nội dung *"
                variant="outlined"
                margin="dense"
                fullWidth
                multiline
                rows={5}
                error={validate.content && validate.content.error}
                helperText={
                  validate.content && validate.content.helperMessageText
                }
                onChange={onInputChange('content')}
                value={get(pushParams, 'content')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            icon="cancel"
            options={{ showIcon: false }}
            onClick={handleCancelPush}
            color="default"
          />
          <Button
            icon="agree"
            options={{ showIcon: false }}
            onClick={handlePushAction}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

LegacyPushNotification.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onPush: PropTypes.func,
  className: PropTypes.string,
  salonId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  legacyPushNotification: makeSelectLegacyPushNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onPush: payload => dispatch(pushNotificationRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LegacyPushNotification);
