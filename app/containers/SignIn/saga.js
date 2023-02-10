import { call, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { authService, profileService } from 'services';
import { setToken, saveLoggedInUser } from 'utils/auth';
import { LOGIN_REQUEST, GET_PROFILE_REQUEST } from './constants';

import {
  loginSuccess,
  loginFail,
  getProfileSuccess,
  getProfileFail,
} from './actions';

export function* login({ payload }) {
  try {
    const response = yield call([authService, 'login'], payload);
    if (response) {
      const accessToken = get(response, 'data.access_token', '');
      setToken(accessToken);
      yield put(loginSuccess(response.result));
      yield call(getProfile);
    } else {
      yield put(loginFail({}));
    }
  } catch (err) {
    yield put(loginFail(err));
  }
}

export function* getProfile() {
  try {
    const response = yield call([profileService, 'getProfile']);
    saveLoggedInUser(response.data);
    yield put(getProfileSuccess(response.data));
  } catch (error) {
    yield put(getProfileFail(error));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
}
