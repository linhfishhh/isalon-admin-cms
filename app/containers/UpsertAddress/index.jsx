/**
 *
 * EditProfile
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Grid,
  Typography,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { profileService } from 'services';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import validation from 'utils/validation';

import AddressPicker from 'containers/AddressPicker';

import { CONTEXT } from './constants';
import reducer from './reducer';
import saga from './saga';
import InputField from './views/InputField';
import { addMyAddressRequest, updateMyAddressRequest } from './actions';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#f3f3f4',
    padding: props => props.isDialog || theme.spacing(8),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper_root: {
    width: '100%',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      width: props => (props.isDialog ? '100%' : '90%'),
      padding: theme.spacing(10),
    },
    [theme.breakpoints.up('lg')]: {
      width: props => (props.isDialog ? '100%' : '70%'),
    },
    minHeight: 400,
    backgroundColor: '#fff',
  },
  title_text: {
    color: '#222222',
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  normal_text: {
    color: '#222222',
    textAlign: 'left',
  },
  detail_text: {
    color: '#808285',
    textAlign: 'left',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
  },
  save_info_button: {
    color: '#fff',
    height: 50,
    width: 200,
    borderRadius: 25,
    margin: theme.spacing(8),
  },
  save_info_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function UpsertAddress(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles(props);
  // const history = useHistory();

  const {
    match,
    profileId,
    addMyAddress,
    updateMyAddress,
    isDialog,
    onClose,
  } = props;

  const addressId = get(match, 'params.addressId');

  let title = 'Thêm mới địa chỉ';
  if (addressId) {
    title = 'Chỉnh sửa địa chỉ';
  }

  const [currentAddress, setCurrentAddress] = useState();
  const [addressParams, setAddressParams] = useState({});
  const [hasError, setHasError] = useState(false);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [validate, setValidate] = useState({});
  const [addressDefault, setAddressDefault] = useState(false);

  useEffect(() => {
    async function fetchAddress() {
      if (addressId) {
        try {
          const ret = await profileService.getMyAddress({ addressId });
          const address = get(ret, 'data', {});
          const name = get(address, 'name');
          const phone = get(address, 'phone');
          const isDefault = get(address, 'isDefault', false);
          const add = {
            lv1: get(address, 'provinceId', 0),
            lv2: get(address, 'districtId', 0),
            lv3: get(address, 'communeId', 0),
            address: get(address, 'description', ''),
          };
          const addresses = [add];
          setCurrentAddress(add);
          setAddressDefault(isDefault);
          setAddressParams({
            name,
            phone,
            addresses,
            isDefault,
          });
        } catch (_) {
          // empty
        }
      }
    }
    fetchAddress();
  }, [addressId]);

  useEffect(() => {
    if (!isEmpty(addressParams)) {
      validateParams(addressParams);
    }
  }, [addressParams]);

  const validateParams = params => {
    const option = [
      {
        type: 'empty',
        model: params,
        keys: ['name'],
        messages: ['Vui lòng nhập tên của bạn'],
      },
    ];
    const result = validation(option);
    const phone = get(params, 'phone', '').trim();
    if (!isEmpty(phone)) {
      const vnfRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (vnfRegex.test(phone) === false) {
        set(result, 'phone', {
          error: true,
          helperMessageText: 'Số điện thoại không hợp lệ',
        });
      }
    } else {
      set(result, 'phone', {
        error: true,
        helperMessageText: 'Vui lòng nhập số điện thoại của bạn',
      });
    }
    setValidate(result);
    return isEmpty(result);
  };

  const validateAddress = () => {
    const name = get(addressParams, 'name', '').trim();
    const phone = get(addressParams, 'phone', '').trim();
    const address = extractAddress();
    const description = get(address, 'address', '').trim();
    if (isEmpty(name)) {
      return false;
    }
    if (!isEmpty(phone)) {
      const vnfRegex = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (vnfRegex.test(phone) === false) {
        return false;
      }
    } else {
      return false;
    }
    const lv3 = get(address, 'lv3', -1);
    if (lv3 === -1) {
      return false;
    }
    if (isEmpty(description)) {
      return false;
    }
    return true;
  };

  const handleInputChange = useCallback(event => {
    const { target } = event;
    const { value, name } = target;
    setAddressParams(prev => {
      set(prev, name, value);
      return { ...prev };
    });
    setHasError(false);
  }, []);

  const extractAddress = () => {
    const addresses = get(addressParams, 'addresses', []);
    const addr = addresses.length > 0 ? addresses[0] : undefined;
    return addr;
  };

  const upsertAddress = () => {
    const name = get(addressParams, 'name', '').trim();
    const phone = get(addressParams, 'phone', '').trim();
    const isDefault = get(addressParams, 'isDefault', false);
    const address = extractAddress();
    const description = get(address, 'address', '').trim();
    const communeId = get(address, 'lv3');
    const successCallback = newAddress => {
      if (isDialog) {
        onClose(newAddress);
      } else {
        // history.goBack();
      }
    };

    let payload = {
      profileId,
      name,
      phone,
      description,
      communeId,
      isDefault,
      success: successCallback,
      fail: () => {
        setHasError(true);
      },
    };

    if (addressId) {
      payload = {
        ...payload,
        addressId,
      };
      updateMyAddress(payload);
    } else {
      addMyAddress(payload);
    }
  };

  const onCheckboxChange = (event, c) => {
    const p = { ...addressParams };
    set(p, 'isDefault', c);
    setAddressParams(p);
    setHasError(false);
  };

  useEffect(() => {
    setAllowSubmit(validateAddress());
  }, [addressParams]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper_root} elevation={1}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title_text}>
              {title.toUpperCase()}
            </Typography>
            <Divider className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title_text}>
              Thông tin người nhận
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12}>
                <InputField
                  title="Họ tên*"
                  name="name"
                  onChange={handleInputChange}
                  defaultValue={get(addressParams, 'name', '')}
                  error={validate.name && validate.name.error}
                  helperText={validate.name && validate.name.helperMessageText}
                />
                <InputField
                  title="SĐT*"
                  name="phone"
                  onChange={handleInputChange}
                  defaultValue={get(addressParams, 'phone', '')}
                  error={validate.phone && validate.phone.error}
                  helperText={
                    validate.phone && validate.phone.helperMessageText
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.title_text}>Địa chỉ</Typography>
          </Grid>
          <Grid item xs={12}>
            <AddressPicker
              currentValue={currentAddress}
              onChange={handleInputChange}
            />
          </Grid>
          {!addressDefault && (
            <Grid item xs={12} container>
              <Grid item style={{ width: 120 }} />
              <Grid item xs>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isDefault"
                      color="primary"
                      onChange={onCheckboxChange}
                      checked={addressParams.isDefault || false}
                    />
                  }
                  label="Đặt làm địa chỉ mặc định"
                />
              </Grid>
            </Grid>
          )}
          {hasError && (
            <Grid item xs={12}>
              <Alert severity="error">
                Đã có lỗi xảy ra, vui lòng thử lại sau
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <div className={classes.save_info_container}>
              <Button
                className={classes.save_info_button}
                variant="contained"
                color="primary"
                disabled={!allowSubmit}
                onClick={upsertAddress}
              >
                LƯU THÔNG TIN
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

UpsertAddress.propTypes = {
  match: PropTypes.any,
  profileId: PropTypes.number,
  addMyAddress: PropTypes.func,
  updateMyAddress: PropTypes.func,
  onClose: PropTypes.func,
  isDialog: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addMyAddress: payload => dispatch(addMyAddressRequest(payload)),
    updateMyAddress: payload => dispatch(updateMyAddressRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UpsertAddress);
