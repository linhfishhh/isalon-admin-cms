import { takeLatest, call, put } from 'redux-saga/effects';
import { profileService } from 'services';
import get from 'lodash/get';
import {
  addMyAddressSuccess,
  addMyAddressFail,
  updateMyAddressSuccess,
  updateMyAddressFail,
} from './actions';
import { ADD_MY_ADDRESS_REQUEST, UPDATE_MY_ADDRESS_REQUEST } from './constants';

export function* addMyAddress({ payload }) {
  const { success, fail, ...rest } = payload;
  try {
    const response = yield call([profileService, 'addUserAddress'], rest);
    yield put(addMyAddressSuccess(response));
    const address = get(response, 'data');
    if (success) {
      success(address);
    }
  } catch (err) {
    yield put(addMyAddressFail(err));
    if (fail) {
      fail();
    }
  }
}

export function* updateMyAddress({ payload }) {
  const { success, fail, ...rest } = payload;
  try {
    const response = yield call([profileService, 'updateMyAddress'], rest);
    yield put(updateMyAddressSuccess(response));
    if (success) {
      success();
    }
  } catch (err) {
    yield put(updateMyAddressFail(err));
    if (fail) {
      fail();
    }
  }
}

export default function* profileSaga() {
  yield takeLatest(ADD_MY_ADDRESS_REQUEST, addMyAddress);
  yield takeLatest(UPDATE_MY_ADDRESS_REQUEST, updateMyAddress);
}
