/**
 *
 * FlashSaleUpdate
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';
import { Helmet } from 'react-helmet';
import { push } from 'connected-react-router';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Grid,
  TextField,
  IconButton,
  InputAdornment,
} from '@material-ui/core';
import { CalendarTodayOutlined as CalendarIcon } from '@material-ui/icons';
import viLocale from 'date-fns/locale/vi';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import AlertDialog from 'components/AlertDialog';
import Header from 'components/Header';
import Button from 'components/Button';
import ImagesUpload from 'components/ImagesUpload';
import FlashSaleProductList from 'containers/FlashSaleProductList';

import { datetimeFormat } from 'utils/datetime';
import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';

import { makeSelectFlashSale, makeSelectShouldUpdate } from './selectors';
import {
  addRequest,
  getRequest,
  editRequest,
  updateDataField,
  cleanDataAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { CONTEXT, LOADING_ACTION_TYPES, TOAST_ACTION_TYPES } from './constants';

export function FlashSaleUpdate(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    match,
    dispatch,
    intl,
    flashSale,
    setDataField,
    addFlashSale,
    editFlashSale,
    getFlashSale,
    shouldUpdate,
    cleanData,
  } = props;

  const [validate, setValidate] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);

  const flashSaleId = get(match, 'params.flashSaleId');

  useEffect(() => {
    if (flashSaleId) {
      getFlashSale({ id: flashSaleId });
    }
    return () => {
      cleanData();
    };
  }, []);

  useEffect(() => {
    if (shouldUpdate) {
      setEditMode(true);
    }
  }, [shouldUpdate]);

  const validateField = () => {
    const option = [
      {
        type: 'empty',
        model: flashSale,
        keys: ['name'],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  const handleOnChangeDataField = name => event => {
    let dataField;
    switch (name) {
      case 'images': {
        dataField = { [name]: event };
        break;
      }
      case 'startAt':
      case 'expiredAt':
        dataField = {
          [name]: datetimeFormat(event, 'YYYY-MM-DD HH:mm:ss'),
        };
        break;
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField(dataField);
  };

  const onSaveFlashSale = () => {
    const noValidate = validateField();
    if (noValidate) {
      if (editMode) {
        editFlashSale();
      } else {
        addFlashSale();
      }
      setValidate({});
    }
  };

  const goToListFlashSale = () => {
    dispatch(push('/admin/flash-sale'));
  };

  const onConfirmCancel = () => {
    setOpenCancelConfirm(false);
  };

  const onConfirm = () => {
    setOpenCancelConfirm(false);
    goToListFlashSale();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <Helmet>
        <title>
          {editMode || flashSaleId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)}
        </title>
        <meta name="description" content="Description of FlashSaleUpdate" />
      </Helmet>
      <Header
        title={
          editMode || flashSaleId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)
        }
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Thông tin flash sale</Typography>}
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        variant="outlined"
                        fullWidth
                        id="name"
                        label={intl.formatMessage(messages.name)}
                        value={flashSale.name}
                        onChange={handleOnChangeDataField('name')}
                        inputProps={{
                          maxLength: '64',
                        }}
                        error={validate.name && validate.name.error}
                        helperText={
                          validate.name &&
                          intl.formatMessage(messages[validate.name.helperText])
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DateTimePicker
                        inputVariant="outlined"
                        fullWidth
                        ampm={false}
                        label={intl.formatMessage(messages.startAt)}
                        value={flashSale.startAt}
                        onChange={handleOnChangeDataField('startAt')}
                        showTodayButton
                        format="dd/MM/yyyy HH:mm"
                        InputProps={{
                          style: { paddingRight: 0 },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <CalendarIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        okLabel="Đồng ý"
                        cancelLabel="Huỷ"
                        todayLabel="Hôm nay"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <DateTimePicker
                        inputVariant="outlined"
                        fullWidth
                        ampm={false}
                        label={intl.formatMessage(messages.expiredAt)}
                        minDate={flashSale.startAt}
                        value={flashSale.expiredAt}
                        onChange={handleOnChangeDataField('expiredAt')}
                        showTodayButton
                        format="dd/MM/yyyy HH:mm"
                        minDateMessage={intl.formatMessage(messages.minDate)}
                        InputProps={{
                          style: { paddingRight: 0 },
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton>
                                <CalendarIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        okLabel="Đồng ý"
                        cancelLabel="Huỷ"
                        todayLabel="Hôm nay"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <ImagesUpload
                    images={flashSale.images}
                    onChangeImage={handleOnChangeDataField('images')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        {editMode && (
          <Grid item xs={12}>
            <FlashSaleProductList flashSaleId={flashSale.flashSaleId} />
          </Grid>
        )}
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Button
              name={editMode ? '' : 'Lưu và tiếp tục'}
              icon="save"
              onClick={onSaveFlashSale}
            />
            <Button
              icon="cancel"
              color="default"
              onClick={() => setOpenCancelConfirm(true)}
            />
          </Grid>
        </Grid>
      </Grid>
      <AlertDialog
        open={openCancelConfirm}
        description="Hủy lưu thông tin flashSale?"
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
    </MuiPickersUtilsProvider>
  );
}

FlashSaleUpdate.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.any,
  flashSale: PropTypes.object,
  setDataField: PropTypes.func,
  addFlashSale: PropTypes.func,
  getFlashSale: PropTypes.func,
  editFlashSale: PropTypes.func,
  shouldUpdate: PropTypes.bool,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  flashSale: makeSelectFlashSale(),
  shouldUpdate: makeSelectShouldUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFlashSale: payload => dispatch(getRequest(payload)),
    addFlashSale: () => dispatch(addRequest()),
    editFlashSale: () => dispatch(editRequest()),
    setDataField: payload => dispatch(updateDataField(payload)),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(injectIntl(FlashSaleUpdate));
