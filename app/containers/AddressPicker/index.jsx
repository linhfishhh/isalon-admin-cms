/**
 *
 * EditProfile
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import { get, isEmpty, set, unset } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import validation from 'utils/validation';

import reducer from '../UserLocation/reducer';
import saga from '../UserLocation/saga';
import InputField from '../UpsertAddress/views/InputField';
import SelectField from './views/SelectField';

import { CONTEXT } from '../UserLocation/constants';
import {
  makeSelectProvinces,
  makeSelectDistricts,
  makeSelectWards,
} from '../UserLocation/selectors';
import {
  getAllUnitsRequest,
  getProvinceListRequest,
  getDistrictListRequest,
  getWardListRequest,
} from '../UserLocation/actions';

function AddressPicker(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    getAllUnits,
    getProvinces,
    provinces,
    getDistricts,
    districts,
    getWards,
    wards,
    currentValue,
    onChange,
  } = props;
  const [currentProvince, setCurrentProvince] = useState();
  const [currentDistrict, setCurrentDistrict] = useState();
  const [currentWard, setCurrentWard] = useState();
  const [pickedAddress, setPickedAddress] = useState();
  const [validate, setValidate] = useState({});

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (!isEmpty(currentValue)) {
      setPickedAddress(currentValue);
      const provinceId = get(currentValue, 'lv1', -1);
      const districtId = get(currentValue, 'lv2', -1);
      const province = { provinceId };
      const district = { districtId };
      getAllUnits({ province, district });
    }
  }, [currentValue]);

  useEffect(() => {
    if (!isEmpty(currentValue) && !isEmpty(provinces)) {
      const provinceId = get(currentValue, 'lv1', -1);
      const newProvince = provinces.find(el => el.provinceId === provinceId);
      setCurrentProvince(newProvince);
    }
  }, [provinces, currentValue]);

  useEffect(() => {
    if (!isEmpty(currentValue) && !isEmpty(districts)) {
      const districtId = get(currentValue, 'lv2', -1);
      const newDistrict = districts.find(el => el.districtId === districtId);
      setCurrentDistrict(newDistrict);
    }
  }, [districts]);

  useEffect(() => {
    if (!isEmpty(currentValue) && !isEmpty(wards)) {
      const communeId = get(currentValue, 'lv3', -1);
      const newWard = wards.find(el => el.communeId === communeId);
      setCurrentWard(newWard);
    }
  }, [wards]);

  const currentSelectedProvince = () => {
    if (!isEmpty(provinces) && !isEmpty(currentProvince)) {
      const provinceId = get(currentProvince, 'provinceId', -1);
      const p = provinces.find(el => el.provinceId === provinceId);
      return p;
    }

    return null;
  };

  const currentSelectedDistrict = () => {
    if (!isEmpty(districts) && !isEmpty(currentDistrict)) {
      const districtId = get(currentDistrict, 'districtId', -1);
      return districts.find(el => el.districtId === districtId);
    }

    return null;
  };

  const currentSelectedWard = () => {
    if (!isEmpty(wards) && !isEmpty(currentWard)) {
      const communeId = get(currentWard, 'communeId', -1);
      return wards.find(el => el.communeId === communeId);
    }

    return null;
  };

  const didSelectProvince = useCallback(
    (event, newProvince) => {
      if (newProvince) {
        getDistricts(newProvince.provinceId);
        const currentProvinceId = get(currentProvince, 'provinceId', -1);
        if (currentProvinceId !== newProvince.provinceId) {
          setCurrentProvince(newProvince);
          setCurrentDistrict();
          setCurrentWard();
        }
      } else {
        setCurrentProvince();
        setCurrentDistrict();
        setCurrentWard();
      }
      updatePickedAddressValue(newProvince);
    },
    [currentProvince],
  );

  const didSelectDistrict = useCallback(
    (event, newDistrict) => {
      if (newDistrict) {
        getWards(newDistrict.districtId);
        const currentDistrictId = get(currentDistrict, 'districtId', -1);
        if (currentDistrictId !== newDistrict.districtId) {
          setCurrentDistrict(newDistrict);
          setCurrentWard();
        }
      } else {
        setCurrentDistrict();
        setCurrentWard();
      }
      updatePickedAddressValue(currentProvince, newDistrict);
    },
    [currentProvince, currentDistrict],
  );

  const didSelectWard = useCallback(
    (event, newWard) => {
      if (newWard) {
        setCurrentWard(newWard);
      } else {
        setCurrentWard();
      }
      updatePickedAddressValue(currentProvince, currentDistrict, newWard);
    },
    [currentProvince, currentDistrict],
  );

  const handleInputChange = event => {
    const { target } = event;
    const { value, name } = target;
    const p = { ...pickedAddress };
    set(p, name, value);
    setPickedAddress(p);
    onChange({
      target: {
        name: 'addresses',
        value: [p],
      },
      forceUpdate: false,
    });
    validateParams(p);
  };

  const updatePickedAddressValue = (province, district, commune) => {
    const p = { ...pickedAddress };
    if (province) {
      set(p, 'lv1', province.provinceId);
    } else {
      unset(p, 'lv1');
    }
    if (district) {
      set(p, 'lv2', district.districtId);
    } else {
      unset(p, 'lv2');
    }
    if (commune) {
      set(p, 'lv3', commune.communeId);
    } else {
      unset(p, 'lv3');
    }
    setPickedAddress(p);
    onChange({
      target: {
        name: 'addresses',
        value: [p],
      },
      forceUpdate: true,
    });
    validateParams(p);
  };

  const validateParams = params => {
    const option = [
      {
        type: 'empty',
        model: params,
        keys: ['lv1', 'lv2', 'lv3', 'address'],
        messages: [
          'Vui lòng nhập tỉnh/thành phố',
          'Vui lòng nhập quận/huyện',
          'Vui lòng nhập phường/xã',
          'Vui lòng nhập địa chỉ',
        ],
      },
    ];
    const result = validation(option);
    setValidate(result);
    return isEmpty(result);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <SelectField
          title="Tỉnh thành*"
          options={provinces}
          columnKey="provinceId"
          onChange={didSelectProvince}
          currentValue={currentSelectedProvince()}
          error={validate.lv1 && validate.lv1.error}
          helperText={validate.lv1 && validate.lv1.helperMessageText}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectField
          title="Quận huyện*"
          options={districts}
          columnKey="districtId"
          onChange={didSelectDistrict}
          currentValue={currentSelectedDistrict()}
          error={validate.lv2 && validate.lv2.error}
          helperText={validate.lv2 && validate.lv2.helperMessageText}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectField
          title="Phường xã*"
          options={wards}
          columnKey="communeId"
          onChange={didSelectWard}
          currentValue={currentSelectedWard()}
          error={validate.lv3 && validate.lv3.error}
          helperText={validate.lv3 && validate.lv3.helperMessageText}
        />
      </Grid>
      <Grid item xs={12}>
        <InputField
          title="Địa chỉ cụ thể*"
          defaultValue={get(pickedAddress, 'address', '')}
          onChange={handleInputChange}
          name="address"
          error={validate.address && validate.address.error}
          helperText={validate.address && validate.address.helperMessageText}
        />
      </Grid>
    </Grid>
  );
}

AddressPicker.propTypes = {
  getAllUnits: PropTypes.func,
  getProvinces: PropTypes.func,
  provinces: PropTypes.array,
  districts: PropTypes.array,
  getDistricts: PropTypes.func,
  wards: PropTypes.array,
  getWards: PropTypes.func,
  currentValue: PropTypes.object,
  onChange: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  provinces: makeSelectProvinces(),
  districts: makeSelectDistricts(),
  wards: makeSelectWards(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getAllUnits: payload => dispatch(getAllUnitsRequest(payload)),
    getProvinces: () => dispatch(getProvinceListRequest()),
    getDistricts: id => dispatch(getDistrictListRequest(id)),
    getWards: id => dispatch(getWardListRequest(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddressPicker);
