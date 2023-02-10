import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService } from 'services';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { getProvinces } from 'utils/localStorage/provinces';

import {
  getAllUnitsSuccess,
  getAllUnitsFail,
  getDistrictListSuccess,
  getDistrictListFail,
  getWardListSuccess,
  getWardListFail,
  getProvinceListSuccess,
  getProvinceListFail,
} from './actions';
import {
  GET_ALL_UNITS_REQUEST,
  GET_PROVINCE_LIST_REQUEST,
  GET_DISTRICT_LIST_REQUEST,
  GET_WARD_LIST_REQUEST,
} from './constants';

export function* getAllUnits({ payload }) {
  try {
    const { province, district } = payload;

    let districts = [];
    if (!isEmpty(province)) {
      const districtsResponse = yield call(
        [profileService, 'getDistrictList'],
        province.provinceId,
      );
      districts = get(districtsResponse, 'data', []);
    }

    let wards = [];
    if (!isEmpty(district)) {
      const wardsResponse = yield call(
        [profileService, 'getWardList'],
        district.districtId,
      );
      wards = get(wardsResponse, 'data', []);
    }
    yield put(getAllUnitsSuccess({ districts, wards }));
  } catch (err) {
    yield put(getAllUnitsFail(err));
  }
}

export function* getProvinceList({ payload }) {
  try {
    const savedProvinces = getProvinces();
    if (savedProvinces && savedProvinces.length > 0) {
      yield put(getProvinceListSuccess(savedProvinces));
    } else {
      const response = yield call([profileService, 'getProvinceList'], payload);
      const provinces = get(response, 'data', []);
      yield put(getProvinceListSuccess(provinces));
    }
  } catch (err) {
    yield put(getProvinceListFail(err));
  }
}

export function* getDistrictList({ payload }) {
  try {
    const response = yield call([profileService, 'getDistrictList'], payload);
    const districts = get(response, 'data', []);
    yield put(getDistrictListSuccess(districts));
  } catch (err) {
    yield put(getDistrictListFail(err));
  }
}

export function* getWardList({ payload }) {
  try {
    const response = yield call([profileService, 'getWardList'], payload);
    const wards = get(response, 'data', []);
    yield put(getWardListSuccess(wards));
  } catch (err) {
    yield put(getWardListFail(err));
  }
}

export default function* userLocationSaga() {
  yield takeLatest(GET_ALL_UNITS_REQUEST, getAllUnits);
  yield takeLatest(GET_PROVINCE_LIST_REQUEST, getProvinceList);
  yield takeLatest(GET_DISTRICT_LIST_REQUEST, getDistrictList);
  yield takeLatest(GET_WARD_LIST_REQUEST, getWardList);
}
