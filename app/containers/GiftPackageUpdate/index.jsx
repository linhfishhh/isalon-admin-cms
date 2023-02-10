/**
 *
 * GiftPackageUpdate
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty, unset } from 'lodash';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
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
  Tooltip,
} from '@material-ui/core';
import {
  Info as InfoIcon,
  CalendarTodayOutlined as CalendarIcon,
} from '@material-ui/icons';
import viLocale from 'date-fns/locale/vi';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import Header from 'components/Header';
import Button from 'components/Button';
import NumberFormatInput from 'components/NumberFormatInput';
import AlertDialog from 'components/AlertDialog';
import ImagesUpload from 'components/ImagesUpload';
import GiftCodeList from 'containers/GiftCodeList';

import validation from 'utils/validation';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import { useInjectToast } from 'utils/injectToast';
import { datetimeUTCFormat, datetimeFormat } from 'utils/datetime';

import { makeSelectGiftPackage, makeSelectShouldUpdate } from './selectors';
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

export function GiftPackageUpdate(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTION_TYPES);
  useInjectToast(TOAST_ACTION_TYPES);

  const {
    match,
    dispatch,
    intl,
    giftPackage,
    setDataField,
    addGiftPackage,
    editGiftPackage,
    getGiftPackage,
    shouldUpdate,
    cleanData,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [openCancelConfirm, setOpenCancelConfirm] = useState(false);
  const [validate, setValidate] = useState({});

  const giftPackageId = get(match, 'params.giftPackageId');

  useEffect(() => {
    if (giftPackageId) {
      getGiftPackage({ id: giftPackageId });
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
        model: giftPackage,
        keys: ['percent', 'cash'],
      },
    ];
    const result = validation(option);
    if (result.percent && result.cash) {
      unset(result, 'cash');
    } else {
      unset(result, 'percent');
      unset(result, 'cash');
    }
    setValidate(result);
    return isEmpty(result);
  };

  const onSaveProduct = () => {
    const noValidate = validateField();
    if (noValidate) {
      if (editMode) {
        editGiftPackage();
      } else {
        addGiftPackage();
      }
    }
  };

  const handleOnChangeDataField = name => event => {
    let dataField;
    let removeField = [];
    switch (name) {
      case 'percent':
      case 'cash':
      case 'appliedCash':
      case 'maxCash': {
        const { value } = event.target;
        if (isEmpty(value)) {
          removeField = [name];
        } else {
          dataField = {
            [name]: Number(value),
          };
        }
        break;
      }
      case 'images': {
        dataField = { [name]: event };
        break;
      }
      case 'startAt':
      case 'expiredAt':
        dataField = {
          [name]: datetimeUTCFormat(event, 'YYYY-MM-DD HH:mm:ss'),
        };
        break;
      default:
        dataField = { [name]: event.target.value };
        break;
    }
    setDataField({ dataField, removeField });
  };

  const goToListGiftPackage = () => {
    dispatch(push('/admin/gift-package'));
  };

  const onConfirmCancel = () => {
    setOpenCancelConfirm(false);
  };

  const onConfirm = () => {
    setOpenCancelConfirm(false);
    goToListGiftPackage();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
      <Helmet>
        <title>
          {editMode || giftPackageId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)}
        </title>
        <meta name="description" content="Description of GiftPackageUpdate" />
      </Helmet>
      <Header
        title={
          editMode || giftPackageId
            ? intl.formatMessage(messages.editHeader)
            : intl.formatMessage(messages.addHeader)
        }
      />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h6">Thông tin gói quà tặng</Typography>
              }
            />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="percent"
                        label={intl.formatMessage(messages.percent)}
                        value={giftPackage.percent ? giftPackage.percent : ''}
                        onChange={handleOnChangeDataField('percent')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '3',
                            style: { textAlign: 'right' },
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="Phần trăm giảm giá trên tổng tiền hoá đơn"
                                placement="top"
                              >
                                <InfoIcon color="disabled" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        error={validate.percent && validate.percent.error}
                        helperText={
                          validate.percent &&
                          intl.formatMessage(
                            messages[validate.percent.helperText],
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="cash"
                        label={intl.formatMessage(messages.cash)}
                        value={giftPackage.cash ? giftPackage.cash : ''}
                        onChange={handleOnChangeDataField('cash')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="Số tiền được giảm giá trên hoá đơn"
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
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="appliedCash"
                        label={intl.formatMessage(messages.appliedCash)}
                        value={
                          giftPackage.appliedCash ? giftPackage.appliedCash : ''
                        }
                        onChange={handleOnChangeDataField('appliedCash')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="Tổng tiền trên hoá đơn tối thiểu để áp dụng gói quà tặng"
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
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="maxCash"
                        label={intl.formatMessage(messages.maxCash)}
                        value={giftPackage.maxCash ? giftPackage.maxCash : ''}
                        onChange={handleOnChangeDataField('maxCash')}
                        InputProps={{
                          inputComponent: NumberFormatInput,
                          inputProps: {
                            maxLength: '13',
                            style: { textAlign: 'right' },
                          },
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title="Số tiền tối đa được giảm giá trên hoá đơn"
                                placement="top"
                              >
                                <InfoIcon color="disabled" />
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <ImagesUpload
                    images={giftPackage.images}
                    onChangeImage={handleOnChangeDataField('images')}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    inputVariant="outlined"
                    fullWidth
                    ampm={false}
                    label={intl.formatMessage(messages.startAt)}
                    value={datetimeFormat(
                      giftPackage.startAt,
                      'YYYY-MM-DD HH:mm:ss',
                    )}
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
                <Grid item xs={6}>
                  <DateTimePicker
                    inputVariant="outlined"
                    fullWidth
                    ampm={false}
                    label={intl.formatMessage(messages.expiredAt)}
                    minDate={giftPackage.startAt}
                    value={datetimeFormat(
                      giftPackage.expiredAt,
                      'YYYY-MM-DD HH:mm:ss',
                    )}
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
            </CardContent>
          </Card>
        </Grid>
        {editMode && (
          <Grid item xs={12}>
            <GiftCodeList giftPackageId={giftPackage.giftPackageId} />
          </Grid>
        )}
        <Grid item container xs={12} justify="center">
          <Grid item>
            <Button
              name={editMode ? '' : 'Lưu và tiếp tục'}
              icon="save"
              onClick={onSaveProduct}
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
        description="Hủy lưu thông tin gói quà tặng?"
        onCancel={onConfirmCancel}
        onConfirm={onConfirm}
      />
    </MuiPickersUtilsProvider>
  );
}

GiftPackageUpdate.propTypes = {
  intl: intlShape,
  dispatch: PropTypes.func,
  match: PropTypes.any,
  giftPackage: PropTypes.object,
  setDataField: PropTypes.func,
  addGiftPackage: PropTypes.func,
  getGiftPackage: PropTypes.func,
  editGiftPackage: PropTypes.func,
  shouldUpdate: PropTypes.bool,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  giftPackage: makeSelectGiftPackage(),
  shouldUpdate: makeSelectShouldUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getGiftPackage: payload => dispatch(getRequest(payload)),
    addGiftPackage: () => dispatch(addRequest()),
    editGiftPackage: () => dispatch(editRequest()),
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
)(injectIntl(GiftPackageUpdate));
